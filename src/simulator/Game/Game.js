import Field from '../Field/Field.js';

// color puyo
Field.Object.RED = new Field.Object.Properties({ symbol: 'R', cleared: () => Field.Object.EMPTY });
Field.Object.YELLOW = new Field.Object.Properties({ symbol: 'Y', cleared: () => Field.Object.EMPTY });
Field.Object.BLUE = new Field.Object.Properties({ symbol: 'B', cleared: () => Field.Object.EMPTY });
Field.Object.GREEN = new Field.Object.Properties({ symbol: 'G', cleared: () => Field.Object.EMPTY });
Field.Object.PURPLE = new Field.Object.Properties({ symbol: 'P', cleared: () => Field.Object.EMPTY });

// non-clearable puyo
Field.Object.BLOCK = new Field.Object.Properties({ symbol: '=', gravityImmune: true });
Field.Object.IRON = new Field.Object.Properties({ symbol: '-' });

// nuisance puyo
Field.Object.NUISANCE = new Field.Object.Properties({ symbol: 'o', adjacentCleared: () => Field.Object.EMPTY });
Field.Object.HARD_NUISANCE = new Field.Object.Properties({ symbol: 'O', adjacentCleared: () => Field.Object.NUISANCE });

export default class Game {
  constructor({ rule, dimension }) {
    this.rule = rule;
    this.field = new Field(dimension);
  }
}
