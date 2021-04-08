export function getRandomSolidFill(polygons, colors) {
  var randomSolidFill = [];
  polygons.forEach((polygon) => {
    randomSolidFill.push(colors[Math.floor(Math.random() * colors.length)]);
  });
  return randomSolidFill;
}
