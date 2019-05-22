import Game from './simulator/Game/Game.js';
import Tsu from './simulator/Game/Tsu.js';
import { BLOCK_WIDTH, TOOLBAR_HEIGHT } from './simulator/Constant.js'

/**
 * Converts every element with class name 'puyo-simulator' to an iframe that
 * displays a simulator. The innerHTML of the elements must be the ASCII art
 * of the desired field. The data-* attributes of the elements are rule
 * specifications(e.g. data-marginTime="128"), with data-mode being the game
 * mode ID as registered by the modes themselves to the Game.Mode array.
 */

export function asciiToElement(simulatorElms) {
  Array.from(simulatorElms).forEach($elm => {
    const game = Game.Deserializer.fromAsciiArt({
      art: $elm.innerHTML,
      parameters: Object.entries($elm.dataset)
        .reduce((params, [k, v]) => (params[k] = JSON.parse(v), params), {})
    });
    const code = Game.Serializer.encode(game);
    let $iframe = document.createElement('iframe');

    $iframe.width = (game.field.dimension.columns + 2) * BLOCK_WIDTH;
    $iframe.height = (game.field.dimension.rows + 1) * BLOCK_WIDTH + TOOLBAR_HEIGHT;
    $iframe.style.border = 'none';
    $iframe.src = 'https://simulator.puyo.tw/player.html?' + code;

    $elm.parentNode.replaceChild($iframe, $elm);
  });
}

asciiToElement(document.getElementsByClassName('puyo-simulator'));
