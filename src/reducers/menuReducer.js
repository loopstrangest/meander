import { TilerTheCreator } from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";

var allPolygons = [];
var allNumParameters = [];
var allPolygonShifts = {
  3: [],
  6: [],
  19: [],
  22: [],
  25: [],
  26: [],
  28: [],
  43: [],
  49: [],
  69: [],
  75: [],
};

var selectedTypes = [3, 6, 19, 22, 25, 26, 28, 43, 49, 69, 75];

//Get selected menu tilings
for (var index = 0; index < selectedTypes.length; index++) {
  var prototile = new TilerTheCreator({
    width: 500,
    height: 500,
    scale_factor: 10,
    type: selectedTypes[index],
  });
  prototile.readyToTile();
  var polygons = prototile.getPolygonsFromRegion();
  allPolygons.push(polygons);

  //Get all num parameters
  allNumParameters.push(prototile.getCurrentTiling().getParameters().length);

  //Get all tiling shifts: 2 per parameter
  var tiling = prototile.getCurrentTiling();
  var parameters = tiling.getParameters();
  parameters.forEach((p, pIndex) => {
    var newLeftPrototile = { ...prototile };
    var newRightPrototile = { ...newLeftPrototile };
    var parameterLeftShift = [...parameters];
    var parameterRightShift = [...parameterLeftShift];
    var leftParameter = parameters[pIndex] / 2;
    var rightParameter = (1 + parameters[pIndex]) / 2;
    parameterLeftShift.splice(pIndex, 1, leftParameter);
    parameterRightShift.splice(pIndex, 1, rightParameter);

    newLeftPrototile.getCurrentTiling().setParameters(parameterLeftShift);
    newLeftPrototile.readyToTile();
    allPolygonShifts[selectedTypes[index]].push([
      newLeftPrototile.getPolygonsFromRegion(),
    ]);

    newRightPrototile.getCurrentTiling().setParameters(parameterRightShift);
    newRightPrototile.readyToTile();
    allPolygonShifts[selectedTypes[index]].push([
      newRightPrototile.getPolygonsFromRegion(),
    ]);
  });
}

const initialState = {
  tab: "tiling",
  showExplainer: false,
  allPolygons: allPolygons,
  allPolygonShifts: allPolygonShifts,
  allNumParameters: allNumParameters,
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TAB":
      return {
        ...state,
        tab: action.payload.tab,
      };
    case "TOGGLE_EXPLAINER":
      return {
        ...state,
        showExplainer: !state.showExplainer,
      };

    default:
      return { ...state };
  }
};

export default menuReducer;
