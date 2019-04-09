import Game from './simulator/Game/Game.js';
import Tsu from './simulator/Game/Tsu.js';

/**
 * Converts every element with class name 'puyo-simulator' to an iframe that
 * displays a simulator. The innerHTML of the elements must be the ASCII art
 * of the desired field. The data-* attributes of the elements are rule
 * specifications(e.g. data-marginTime="128"), with data-mode being the game
 * mode ID as registered by the modes themselves to the Game.Mode array.
 */

export function asciiToElement(simulatorElms) {
  Array.from(simulatorElms).forEach($elm => {
    const code = Game.Serializer.encode(Game.Deserializer.fromAsciiArt({
      art: $elm.innerHTML,
      parameters: Object.entries($elm.dataset)
                        .reduce((params, [k, v]) => (params[k] = JSON.parse(v), params), {})
    }));

    let $iframe = document.createElement('iframe');
    // TODO: calculate the dimensions somehow
    $iframe.width = 500;
    $iframe.height = 500;
    $iframe.src = 'https://simulator.puyo.tw/player.html?' + code;

    $elm.parentNode.replaceChild($iframe, $elm);
  });
}

asciiToElement(document.getElementsByClassName('puyo-simulator'));
