import BitStreamWriter from '../Tools/BitStreamWriter.js';
import PrefixTree from '../Tools/PrefixTree.js';

export default function(Field) {

  let Serializer = {};
  Serializer.toAsciiArt = function(field) {
    // initially contains the bottom row without objects
    let rows = [ '++' + '='.repeat(field.dimension.columns * 2 + 1) + '++' ];
    
    for (let pos = new field.Positional; pos.valid; pos = pos.farLeft.above) {
      let row = ' ';
      let wall = pos.hidden ? '  ' : '||';

      for (; pos.valid; pos = pos.right) {
        row += pos.object.symbol + ' ';
      }

      rows.unshift(wall + row + wall);
    }

    return rows.join('\n');
  };

  Serializer.toBitStream = function(field, ostream = new BitStreamWriter()) {
    // count occurrence of objects on field
    let frequencies = {};
    for (let pos = new field.Positional; pos.valid; pos = pos.bottom.right) {
      for (; pos.valid; pos = pos.above) {
        const symbol = pos.object.symbol;
        frequencies[symbol] = frequencies[symbol] ? frequencies[symbol] + 1 : 1;
      }
    }

    let encodingTree = new PrefixTree(frequencies);

    // header:
    //   varlen5 (max 8) - dimension.columns
    //   varlen5 (max 8) - dimension.visibleRows
    //   varlen2 (max 8) - dimension.hiddenRows
    //   custom  - encoding tree structure
    
    ostream.writeVariableLength({ value: field.dimension.columns    , writeBitCount: 8, partitionBitCount: 5 });
    ostream.writeVariableLength({ value: field.dimension.visibleRows, writeBitCount: 8, partitionBitCount: 5 });
    ostream.writeVariableLength({ value: field.dimension.hiddenRows , writeBitCount: 8, partitionBitCount: 2 });
    encodingTree.to(ostream);

    // field data:
    //   encode(object.symbol)... - encoded symbols. 
    //                              Order is c[0]r[0], c[0]r[1], ..., c[max]r[max]

    let encoding = encodingTree.encoding();
    for (let pos of field) encoding[pos.object.symbol](ostream);

    return ostream;
  };

  return Serializer;
}
