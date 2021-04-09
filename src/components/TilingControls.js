//redux and routes
import { useDispatch, useSelector } from "react-redux";
import { updateTiling } from "../actions/tileAction";

import Sketch from "react-p5";

//components

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const TilingControls = () => {
  const dispatch = useDispatch();
  const {
    width,
    height,
    scaleFactor,
    selectedTypes,
    linearGradientOptions,
    colors,
  } = useSelector((state) => state.tile);
  const { allPolygons } = useSelector((state) => state.menu);

  const handleNewTiling = (e) => {
    var tilingIndex = e.currentTarget.className.replace("canvasContainer", "");

    dispatch(
      updateTiling(
        width,
        height,
        scaleFactor,
        selectedTypes[tilingIndex],
        linearGradientOptions[selectedTypes[tilingIndex]],
        colors
      )
    );
  };
  var canvasSize = 100;

  return (
    <StyledTilingControls id="tilingOptions">
      {allPolygons.map((polygons, index) => {
        let setup = (p5, parentClass) => {
          p5.createCanvas(canvasSize, canvasSize).parent(parentClass);
        };
        let draw = (p5) => {
          p5.strokeWeight(1);

          polygons.forEach((polygon, pIndex) => {
            p5.beginShape();
            polygon.forEach((vertex, vIndex) => {
              p5.vertex(vertex[0], vertex[1]);
            });
            p5.vertex(polygon[0][0], polygon[0][1]);
            p5.endShape();
          });
          p5.noLoop();
        };
        return (
          <div
            key={index}
            className={"canvasContainer" + index}
            onClick={handleNewTiling}
            style={{ width: canvasSize, height: canvasSize }}
          >
            <Sketch
              setup={setup}
              draw={draw}
              className={"canvas" + index}
              key={"canvas" + index}
            />
          </div>
        );
      })}
    </StyledTilingControls>
  );
};

const StyledTilingControls = styled(motion.div)`
  canvas {
    cursor: pointer;
    border-radius: 10px;
  }

  div[class^="canvasContainer"] {
    margin: 6px;
  }
  div[class^="canvasContainer"] > * {
    width: inherit;
    height: inherit;
  }

  div[class^="canvasContainer"]:hover {
    filter: invert(1);
  }
`;

export default TilingControls;
