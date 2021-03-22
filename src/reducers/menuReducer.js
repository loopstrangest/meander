import {
  numTypes,
  TilerTheCreator,
} from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";

var allPolygons = [];
var allNumParameters = [];

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
  allNumParameters.push(prototile.getCurrentTiling().getParameters().length);
}

const initialState = {
  tab: "params",
  allPolygons: allPolygons,
  allNumParameters: allNumParameters,
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TAB":
      return {
        ...state,
        tab: action.payload.tab,
      };

    default:
      return { ...state };
  }
};

export default menuReducer;
