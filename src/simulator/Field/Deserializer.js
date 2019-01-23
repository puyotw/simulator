import PrefixTree from '../Tools/PrefixTree.js';

export default function(Field) {
  let Deserializer = {};

  /** @return a mapping from Field Object symbol to values in Field.Object. */
  const getSymbolToObjectMapping = function() {
    return Object.values(Field.Object)
                 .reduce((mapping, obj) => (mapping[obj.symbol] = obj, mapping), {});
  };

  Deserializer.fromAsciiArt = function(stream) {
    let sym2obj = getSymbolToObjectMapping();
    let rows = stream.split('\n');
    let field = new Field({
      // last row is just decoration, not considering in deserialization;
      // however, it is useful for determining the number of columns;
      // slice -> remove 3-char walls on both sides,
      // length / 2 -> every symbol is followed by a space, i.e. every symbol takes 2 characters
      columns: Math.ceil(rows.pop().slice(3, -3).length / 2),
      // count the number of rows where first character is a space
      hiddenRows: (function(count) { for (let row of rows) if (row[0] == ' ') ++count; else break; return count; })(0),
      visibleRows: rows.length - this.hiddenRows
    });
  
    let pos = new field.Positional().top;
  
    for (let row of rows) {
      // remove 3 character wall on both sides
      let rowNoWalls = row.slice(3, -3);
      // extract symbol char from row string
      for (let [symbol, _, ...rest] = rowNoWalls;
           rest.length > 0;
           [symbol, _, ...rest] = rest
      ) {
        pos.object = sym2obj[symbol];
        pos = pos.right;
      }
      pos = pos.farLeft.below;
    }
  
    return field;
  };

  Deserializer.fromBitStream = function(istream) {
    // header:
    //   varlen5 - dimension.columns
    //   varlen5 - dimension.visibleRows
    //   varlen2 - dimension.hiddenRows
    //   custom  - encoding tree structure

    let field = new Field({
      columns:     istream.readVariableLength(5),
      visibleRows: istream.readVariableLength(5),
      hiddenRows:  istream.readVariableLength(2), 
    });

    let encodingTree = PrefixTree.from(istream);

    // field data:
    //   encode(object.symbol)... - encoded symbols. 
    //                              Order is c[0]r[0], c[0]r[1], ..., c[max]r[max]
   
    let sym2obj = getSymbolToObjectMapping();
    for (let pos of field) pos.object = sym2obj[encodingTree.symbolFromStream(istream)];

    return field;
  };

  return Deserializer;
}
