import { TilerTheCreator } from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";
import { getRandomSolidFill } from "../scripts/getRandomSolidFill.js";
import { getRandomLinearGradient } from "../scripts/getRandomLinearGradient.js";

export function getRandomPattern(
  userColors,
  userBorderWidth,
  userBorderColor,
  userFillStyle,
  userBlur,
  userGrain
) {
  var size = 3000;
  var scaleFactor = 50;
  var selectedTypes = [3, 6, 19, 22, 25, 26, 28, 43, 49, 69, 75];
  var linearGradients = {
    3: [
      [0, 5],
      [1, 6],
      [2, 7],
      [3, 8],
      [4, 9],
    ],
    6: [
      [0, 3],
      [1, 4],
      [2, 5],
    ],
    19: [
      [0, 2],
      [0, 3],
      [1, 3],
      [1, 4],
      [2, 4],
    ],
    22: [
      [0, 3],
      [0, 4],
      [1, 4],
      [1, 5],
      [2, 5],
      [2, 6],
      [3, 5],
      [4, 6],
    ],

    25: [
      [0, 3],
      [1, 3],
      [1, 4],
      [2, 4],
      [2, 5],
      [3, 5],
    ],

    26: [
      [0, 3],
      [1, 3],
      [1, 4],
      [2, 4],
      [2, 5],
      [3, 5],
    ],

    28: [
      [0, 2],
      [1, 3],
    ],
    43: [
      [3, 7],
      [0, 2],
      [1, 5],
      [4, 6],
    ],

    49: [
      [0, 3],
      [1, 4],
      [2, 5],
    ],

    69: [
      [0, 2],
      [1, 3],
    ],

    75: [
      [0, 3],
      [1, 4],
    ],
  };

  var colors = ["#003049", "#d62828", "#f77f00", "#fcbf49", "#eae2b7"];
  var borderWidth = 0;
  var borderColor = "#000000";
  var fillStyle = "gradient";
  var blur = 2;
  var grain = 0.25;
  var randomSolidFill = [];

  //handle user preferences
  colors = userColors ? userColors : colors;
  borderWidth = userBorderWidth ? userBorderWidth : borderWidth;
  borderColor = userBorderColor ? userBorderColor : borderColor;
  fillStyle = userFillStyle ? userFillStyle : fillStyle;
  blur = userBlur ? userBlur : blur;
  grain = userGrain ? userGrain : grain;

  var randomSelectedTypesIndex = Math.floor(
    Math.random() * selectedTypes.length
  );
  var randomType = selectedTypes[randomSelectedTypesIndex];

  //Set random tiling
  var randomPrototile = new TilerTheCreator({
    width: size,
    height: size,
    scale_factor: scaleFactor,
    type: randomType,
  });

  randomPrototile.readyToTile();
  var defaultParameters = randomPrototile.getCurrentTiling().getParameters();
  var randomParameters = [];
  var paramRange = 0.15;
  //Get random parameters from default parameters
  defaultParameters.forEach((param) => {
    var lowerBound = Math.max(0, param - paramRange);
    var upperBound = Math.min(1, param + paramRange);
    randomParameters.push(
      (Math.random() * (upperBound - lowerBound) + lowerBound).toFixed(2)
    );
  });

  //Update prototile to use random parameters
  randomPrototile.getCurrentTiling().setParameters(randomParameters);
  randomPrototile.readyToTile();
  var randomPolygons = randomPrototile.getPolygonsFromRegion();

  var gradientOptions = linearGradients[randomType];

  var randomSolidFill = getRandomSolidFill(randomPolygons, colors);
  var randomGradient = getRandomLinearGradient(gradientOptions);

  const randomPattern = {
    width: size,
    height: size,
    scaleFactor: scaleFactor,
    type: randomType,
    selectedTypes: selectedTypes,
    defaultParameters: defaultParameters,
    tiling: randomPrototile.getCurrentTiling(),
    polygons: randomPolygons,
    borderWidth: borderWidth,
    borderColor: borderColor,
    fillStyle: fillStyle,
    colors: colors,
    randomSolidFill: randomSolidFill,
    linearGradientOptions: linearGradients,
    linearGradient: randomGradient,
    blur: blur,
    grain: grain,
    gettingRandomPattern: false,
  };

  return randomPattern;
}
