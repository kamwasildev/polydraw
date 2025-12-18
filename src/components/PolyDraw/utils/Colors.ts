export const COLORS = [
  '#FF9999',
  '#99FF99',
  '#99CCFF',
  '#FFB399',
  '#B399FF',
  '#FFD9B3',
  '#99FFFF',
  '#FF99CC',
  '#B3FFD9',
  '#FFFF99',
  '#FFB3B3',
  '#99FFCC',
  '#B3B3FF',
  '#FF99FF',
  '#BFFF99',
  '#FF4040',
];

let currentColorIndex = 0;

export const getNextColor = () => {
  const color = COLORS[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % COLORS.length;
  return color;
};
