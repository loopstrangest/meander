import {
  numTypes,
  TilerTheCreator,
} from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";

var initialSize = 1500;
var initialScaleFactor = 50;
//var initialType = Math.floor(Math.random() * numTypes);
var selectedTypes = [3, 6, 19, 22, 25, 26, 28, 43, 49, 69, 75];
var randomSelectedTypesIndex = Math.floor(Math.random() * selectedTypes.length);
var initialSelectedType = selectedTypes[randomSelectedTypesIndex];

//Set random initial tiling
var initialPrototile = new TilerTheCreator({
  width: initialSize,
  height: initialSize,
  scale_factor: initialScaleFactor,
  type: 69,
});

console.log(initialPrototile.getCurrentTiling());

initialPrototile.readyToTile();
var initialPolygons = initialPrototile.getPolygonsFromRegion();

const initialState = {
  width: initialSize,
  height: initialSize,
  scaleFactor: initialScaleFactor,
  type: 69,
  selectedTypes: selectedTypes,
  defaultParameters: initialPrototile.getCurrentTiling().getParameters(),
  tiling: initialPrototile.getCurrentTiling(),
  polygons: initialPolygons,
  borderWidth: 0,
  fillStyle: "solid",
  colors: ["#ff0000", "#0000ff"],
};

const tileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TILE_PARAMETERS":
      return {
        ...state,
        tiling: action.payload.tiling,
        polygons: action.payload.polygons,
      };
    case "SET_TILING":
      return {
        ...state,
        type: action.payload.type,
        defaultParameters: action.payload.defaultParameters,
        tiling: action.payload.tiling,
        polygons: action.payload.polygons,
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
        colors: [
          ...state.colors.slice(0, action.payload.index),
          action.payload.color,
          ...state.colors.slice(action.payload.index + 1),
        ],
      };
    case "REMOVE_COLOR":
      return {
        ...state,
        colors: state.colors.slice(0, -1),
      };
    default:
      return { ...state };
  }
};

export default tileReducer;
