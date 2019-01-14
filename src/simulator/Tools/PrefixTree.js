import TinyQueue from 'tinyqueue';

class PrefixTreeNode {
  /**
   * Comparator to compare two PrefixTreeNodes.
   *
   * TinyQueue is a min-queue, so smaller elements have higher priority and
   * appear first. We want nodes with lower frequency to appear first. When
   * two nodes have the same frequency, use the symbol to break ties, but
   * the eventual order doesn't really matter when two nodes have the same
   * frequency.
   */
  static comparator(node1, node2) {
    return node1.frequency < node2.frequency ? -1 :
           node1.frequency > node2.frequency ?  1 :
              node1.symbol < node2.symbol    ? -1 :
              node1.symbol > node2.symbol    ?  1 :
                                                0 ;
  }
  
  /**
   * Constructs a non-modifiable PrefixTreeNode.
   *
   * @param {[1-char String, Number]} entry - 
   *        Symbol and frequency this node represents. Symbol must be ASCII. 
   *        This node will be a leaf node.
   *
   * @param {[PrefixTreeNode, PrefixTreeNode]} branches - 
   *        Supersedes entry if provided. This node will be a branch node with 
   *        left and right assigned to the given nodes.
   */
  constructor({entry:[symbol, frequency] = [], branches:[left, right] = []}) {
    if (!left || !right) {
      this.symbol = symbol;
      this.frequency = frequency;
      this.left = null;
      this.right = null;
    } else {
      this.symbol = left.symbol + right.symbol;
      this.frequency = left.frequency + right.frequency;
      this.left = left;
      this.right = right;
    }

    Object.freeze(this);
  }

  /** @return true if this node is a leaf node. */
  isLeaf() { return this.left === null && this.right === null; }

  static BRANCH = 0;
  static LEAF = 1;

  /**
   * Generates a PrefixCode subtree given a BitStreamReader.
   */
  static from(istream) {
    if (istream.read(1) === this.BRANCH) {
      return new this({branches:[this.from(istream), this.from(istream)]});
    } else {
      // when reconstructing the tree from istream, frequency doesn't matter anymore
      return new this({entry:[String.fromCharCode(istream.read(8)), 0]});
    }
  }

  /**
   * Outputs this node, and its descendants, to the given BitStreamWriter.
   */
  to(ostream) {
    if (this.isLeaf()) {
      ostream.write({value: PrefixTreeNode.LEAF, writeBitCount: 1});
      ostream.write({value: this.symbol.charCodeAt(0), writeBitCount: 8});
    } else {
      ostream.write({value: PrefixTreeNode.BRANCH, writeBitCount: 1});
      this.left.to(ostream);
      this.right.to(ostream);
    }
  }
}

/**
 * Generates a prefix code encoding using Huffman encoding algorithm.
 */
export default class PrefixTree {
  #root;

  /**
   * Constructs a PrefixTree given a BitStreamReader.
   *
   * The BitStreamReader should start with whatever is outputted from this.prototype.to.
   */
  static from(istream) {
    let result = new this({});
    result.#root = PrefixTreeNode.from(istream);
    return result;
  }

  /** Outputs the structure of this tree to the given BitStreamWriter. */
  to(ostream) { this.#root.to(ostream); }

  /**
   * Constructs a PrefixTree given frequencies.
   *
   * @param { {`${symbol}` : Number} } frequencies
   *        An object mapping from the symbol character to its frequencies.
   */ 
  constructor(frequencies) {
    let queue = new TinyQueue(Object.entries(frequencies).map(entry => new PrefixTreeNode({entry:entry})), 
                              PrefixTreeNode.comparator);
    while (queue.length > 1) {
      queue.push(new PrefixTreeNode({branches:[queue.pop(), queue.pop()]}));
    }

    this.#root = queue.pop();
  }
 
  static LEFT = 0;
  static RIGHT = 1;

  /** @return the next symbol from the given BitStreamReader. */
  symbolFromStream(istream) {
    for (var node = this.#root; 
         !node.isLeaf(); 
         node = istream.read(1) === PrefixTree.LEFT ? node.left : node.right);
    return node.symbol;
  }

  /**
   * Returns a mapping from symbol to the writePrefix function.
   *
   * The writePrefix function accepts a BitStreamWriter and writes the 
   * necessary bits into the stream for the symbol.
   *
   * Outside clients should not pass any arguments to this method.
   * 
   * @return { {`${symbol}` : function(ostream) {...} }
   */
  encoding(map = {}, node = this.#root, writePrefix = () => undefined) {
    if (node.isLeaf()) {
      map[node.symbol] = writePrefix;
    } else {
      // helper function to create a function that writes the given bit
      // to ostream after writing the previous encoding, i.e. prefix.
      const appendBit = bit => function(ostream) {
        writePrefix(ostream);
        ostream.write({value: bit, writeBitCount: 1});
      };
      this.encoding(map, node.left, appendBit(PrefixTree.LEFT));
      this.encoding(map, node.right, appendBit(PrefixTree.RIGHT));
    }

    return map;
  }
}
