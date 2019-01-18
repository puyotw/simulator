// script for creating skin.json atlas file
var fs = require('fs');

let data = { 
    meta: {
        image: 'skin.png',
    },
    frames:{}
};
let puyoname = ['red', 'green', 'blue', 'yellow', 'purple'];
let puyowidth = 32;


for (let i = 0; i < puyoname.length; i++){
    for (let j = 0; j < 16; j++){
        data.frames[puyoname[i] + j] = {
            frame: {
                x: j * puyowidth,
                y: i * puyowidth,
                w: puyowidth,
                h: puyowidth,
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: puyowidth,
                h: puyowidth,
            },
            sourceSize: {
                w: puyowidth,
                h: puyowidth,
            },
            pivot: {
                x:0.5,
                y:0.5,
            }
        };
    }
}

fs.writeFile('skin.json', JSON.stringify(data, null, 2), (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;
});

