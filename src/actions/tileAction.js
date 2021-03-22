import { TilerTheCreator } from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";

export const updateParameters = (
  width,
  height,
  scaleFactor,
  type,
  parameters
) => async (dispatch) => {
  var prototile = new TilerTheCreator({
    width: width,
    height: height,
    scale_factor: scaleFactor,
    type: type,
  });

  prototile.getCurrentTiling().setParameters(parameters);
  var tiling = prototile.getCurrentTiling();
  prototile.readyToTile();
  var polygons = prototile.getPolygonsFromRegion();

  dispatch({
    type: "SET_TILE_PARAMETERS",
    payload: {
      tiling: tiling,
      polygons: polygons,
    },
  });
};

export const setNewTiling = (width, height, scaleFactor, type) => async (
  dispatch
) => {
  var prototile = new TilerTheCreator({
    width: width,
    height: height,
    scale_factor: scaleFactor,
    type: type,
  });
  var tiling = prototile.getCurrentTiling();
  var defaultParameters = tiling.getParameters();
  prototile.readyToTile();
  var polygons = prototile.getPolygonsFromRegion();

  dispatch({
    type: "SET_NEW_TILING",
    payload: {
      type: type,
      defaultParameters: defaultParameters,
      tiling: tiling,
      polygons: polygons,
    },
  });
};
