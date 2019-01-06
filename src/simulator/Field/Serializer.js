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

  Serializer.toBlob = function(field) {
    // count occurrence of objects on field
    let frequencies = {};
    for (let pos = new field.Positional; pos.valid; pos = pos.bottom.right) {
      for (; pos.valid; pos = pos.above) {
        const symbol = pos.object.symbol;
        frequencies[symbol] = frequencies[symbol] ? frequencies[symbol] + 1 : 1;
      }
    }

    let encodingTree = new PrefixTree(frequencies);
    let ostream = new BitStreamWriter();

    // header:
    //   uint8   - dimension.columns
    //   uint8   - dimension.visibleRows
    //   uint8   - dimension.hiddenRows
    //   custom  - encoding tree structure
    
    ostream.write({value: field.dimension.columns, writeBitCount: 8});
    ostream.write({value: field.dimension.visibleRows, writeBitCount: 8});
    ostream.write({value: field.dimension.hiddenRows, writeBitCount: 8});
    encodingTree.to(ostream);

    // field data:
    //   encode(object.symbol)... - encoded symbols. 
    //                              Order is c[0]r[0], c[0]r[1], ..., c[max]r[max]

    let encoding = encodingTree.encoding();
    for (let pos = new field.Positional; pos.valid; pos = pos.bottom.right) {
      for (; pos.valid; pos = pos.above) {
        encoding[pos.object.symbol](ostream);
      }
    }
    return ostream.toBlob()
  };

  Serializer.toBase64 = async function(field) {
    let blob = Serializer.toBlob(field);
    return new Promise(resolve => {
      // using FileReader to convert to base64,
      // because btoa doesn't work with binary strings;
      // it is unfortunate that FileReader is asynchronous, while it doesn't have to
      // since our blob is not really a File.
      let freader = new FileReader();
      freader.onload = function (evt) {
        // url format: data:application/octet-stream;base64,<actual base64 here>
        let url = evt.target.result;
        let metadataEnd = url.indexOf(',');
        resolve(metadataEnd === -1 ? '' : url.slice(metadataEnd + 1));
      };
      
      freader.readAsDataURL(blob);
    });

  };

  return Serializer;
}
