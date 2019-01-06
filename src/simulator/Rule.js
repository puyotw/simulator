export const GameModes = Object.freeze({
  TSU   : {},
  FEVER : {},
});

export function Rule({
  mode        = GameModes.TSU,
  colors      = 4,
  targetPoint = 70,
} = {}) {
  this.mode = Object.values(GameModes).includes(mode) ? mode : GameModes.TSU;
  this.colors = 1 <= colors && colors <= 5 ? colors : 4;
  this.targetPoint = Math.max(10, targetPoint);
};
