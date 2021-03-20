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
