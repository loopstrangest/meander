export function getRandomLinearGradient(typeOptions) {
  var randomGradient =
    typeOptions[Math.floor(Math.random() * typeOptions.length)];
  if (Math.floor(Math.random() * 2) === 1) {
    randomGradient.reverse();
  }
  return randomGradient;
}
