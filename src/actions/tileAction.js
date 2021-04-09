import { TilerTheCreator } from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";
import { getRandomPattern } from "../scripts/getRandomPattern.js";
import { getRandomSolidFill } from "../scripts/getRandomSolidFill.js";
import { getRandomLinearGradient } from "../scripts/getRandomLinearGradient.js";

export const updateParameters = (
  width,
  height,
  scaleFactor,
  type,
  parameters,
  colors
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
      randomSolidFill: getRandomSolidFill(polygons, colors),
    },
  });
};

export const updateTiling = (
  width,
  height,
  scaleFactor,
  type,
  typeOptions,
  colors
) => async (dispatch) => {
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
  console.log(polygons[0]);

  var randomGradient =
    typeOptions[Math.floor(Math.random() * typeOptions.length)];
  if (Math.floor(Math.random() * 2) === 1) {
    randomGradient.reverse();
  }

  dispatch({
    type: "SET_TILING",
    payload: {
      type: type,
      defaultParameters: defaultParameters,
      tiling: tiling,
      polygons: polygons,
      linearGradient: getRandomLinearGradient(typeOptions),
      randomSolidFill: getRandomSolidFill(polygons, colors),
    },
  });
};

export const updateBorder = (borderWidth) => async (dispatch) => {
  dispatch({
    type: "SET_BORDER_WIDTH",
    payload: {
      borderWidth: borderWidth,
    },
  });
};

export const updateBorderColor = (borderColor) => async (dispatch) => {
  dispatch({
    type: "SET_BORDER_COLOR",
    payload: {
      borderColor: borderColor,
    },
  });
};

export const updateFillStyle = (fillStyle) => async (dispatch) => {
  dispatch({
    type: "SET_FILL_STYLE",
    payload: {
      fillStyle: fillStyle,
    },
  });
};

export const updateColor = (polygons, colors, newColor, index) => async (
  dispatch
) => {
  var newColors = colors
    .slice(0, index)
    .concat([newColor], colors.slice(index + 1));

  dispatch({
    type: "SET_COLOR",
    payload: {
      colors: newColors,
      randomSolidFill: getRandomSolidFill(polygons, newColors),
    },
  });
};

export const updateColorsFromURL = (polygons, colors) => async (dispatch) => {
  dispatch({
    type: "SET_COLOR",
    payload: {
      colors: colors,
      randomSolidFill: getRandomSolidFill(polygons, colors),
    },
  });
};

export const updateLinearGradient = (typeOptions) => async (dispatch) => {
  dispatch({
    type: "SET_LINEAR_GRADIENT",
    payload: {
      linearGradient: getRandomLinearGradient(typeOptions),
    },
  });
};

export const updateRandomSolidFill = (polygons, colors) => async (dispatch) => {
  dispatch({
    type: "SET_RANDOM_SOLID_FILL",
    payload: {
      randomSolidFill: getRandomSolidFill(polygons, colors),
    },
  });
};

export const updateBlurValue = (blur) => async (dispatch) => {
  dispatch({
    type: "SET_BLUR",
    payload: {
      blur: blur,
    },
  });
};

export const updateGrainValue = (grain) => async (dispatch) => {
  dispatch({
    type: "SET_GRAIN",
    payload: {
      grain: grain,
    },
  });
};

export const updateRandomPattern = (
  colors,
  borderWidth,
  borderColor,
  fillStyle,
  blur,
  grain
) => async (dispatch) => {
  dispatch({
    type: "SET_RANDOM_PATTERN",
    payload: {
      randomPattern: getRandomPattern(
        colors,
        borderWidth,
        borderColor,
        fillStyle,
        blur,
        grain
      ),
    },
  });
};
