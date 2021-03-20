import {
  numTypes,
  TilerTheCreator,
} from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";

var initialSize = 3000;
var initialScaleFactor = 50;
var initialType = Math.floor(Math.random() * numTypes);

var initialPrototile = new TilerTheCreator({
  width: initialSize,
  height: initialSize,
  scale_factor: initialScaleFactor,
  type: initialType,
});

initialPrototile.readyToTile();
var initialPolygons = initialPrototile.getPolygonsFromRegion();

const initialState = {
  width: initialSize,
  height: initialSize,
  scaleFactor: initialScaleFactor,
  type: initialType,
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

    default:
      return { ...state };
  }
};

export default tileReducer;
