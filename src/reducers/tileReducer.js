import { TilerTheCreator } from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";

var initialSize = 1500;
var initialScaleFactor = 50;
//var initialType = Math.floor(Math.random() * numTypes);
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
var randomSelectedTypesIndex = Math.floor(Math.random() * selectedTypes.length);
var initialRandomType = selectedTypes[randomSelectedTypesIndex];
var initialChosenType = 3;

//Set random initial tiling
var initialPrototile = new TilerTheCreator({
  width: initialSize,
  height: initialSize,
  scale_factor: initialScaleFactor,
  type: initialChosenType,
});

console.log(initialPrototile.getCurrentTiling());

initialPrototile.readyToTile();
var initialPolygons = initialPrototile.getPolygonsFromRegion();

const initialState = {
  width: initialSize,
  height: initialSize,
  scaleFactor: initialScaleFactor,
  type: initialChosenType,
  selectedTypes: selectedTypes,
  defaultParameters: initialPrototile.getCurrentTiling().getParameters(),
  tiling: initialPrototile.getCurrentTiling(),
  polygons: initialPolygons,
  borderWidth: 0,
  fillStyle: "solid",
  colors: ["#ff0000", "#0000ff"],
  randomSolidFill: [],
  setRandomSolid: true,
  linearGradientOptions: linearGradients,
  linearGradient: [],
  blur: 0,
  grain: 0,
};

const tileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TILE_PARAMETERS":
      return {
        ...state,
        tiling: action.payload.tiling,
        polygons: action.payload.polygons,
        randomSolidFill: action.payload.randomSolidFill,
      };
    case "SET_TILING":
      return {
        ...state,
        type: action.payload.type,
        defaultParameters: action.payload.defaultParameters,
        tiling: action.payload.tiling,
        polygons: action.payload.polygons,
        linearGradient: action.payload.linearGradient,
        randomSolidFill: action.payload.randomSolidFill,
      };
    case "SET_BORDER_WIDTH":
      return {
        ...state,
        borderWidth: action.payload.borderWidth,
      };
    case "SET_FILL_STYLE":
      return {
        ...state,
        fillStyle: action.payload.fillStyle,
      };
    case "SET_COLOR":
      return {
        ...state,
        colors: action.payload.colors,
        randomSolidFill: action.payload.randomSolidFill,
      };
    case "REMOVE_COLOR":
      return {
        ...state,
        colors: state.colors.slice(0, -1),
      };
    case "SET_LINEAR_GRADIENT":
      return {
        ...state,
        linearGradient: action.payload.linearGradient,
      };
    case "SET_RANDOM_SOLID_FILL":
      return {
        ...state,
        randomSolidFill: action.payload.randomSolidFill,
      };
    case "SET_BLUR":
      return {
        ...state,
        blur: action.payload.blur,
      };
    case "SET_GRAIN":
      return {
        ...state,
        grain: action.payload.grain,
      };
    default:
      return { ...state };
  }
};

export default tileReducer;
