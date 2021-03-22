import {
  numTypes,
  TilerTheCreator,
} from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";

var initialSize = 3000;
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
  type: initialSelectedType,
});

initialPrototile.readyToTile();
var initialPolygons = initialPrototile.getPolygonsFromRegion();

const initialState = {
  width: initialSize,
  height: initialSize,
  scaleFactor: initialScaleFactor,
  type: initialSelectedType,
  selectedTypes: selectedTypes,
  defaultParameters: initialPrototile.getCurrentTiling().getParameters(),
  tiling: initialPrototile.getCurrentTiling(),
  polygons: initialPolygons,
};

const tileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TILE_PARAMETERS":
      return {
        ...state,
        tiling: action.payload.tiling,
        polygons: action.payload.polygons,
      };
    case "SET_NEW_TILING":
      return {
        ...state,
        type: action.payload.type,
        defaultParameters: action.payload.defaultParameters,
        tiling: action.payload.tiling,
        polygons: action.payload.polygons,
      };

    default:
      return { ...state };
  }
};

export default tileReducer;
