//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewTiling } from "../actions/tileAction";

import {
  numTypes,
  TilerTheCreator,
} from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";
import Sketch from "react-p5";

//components
import ParamControls from "../components/ParamControls";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const TilingControls = () => {
  const dispatch = useDispatch();
  const { width, height, scaleFactor, selectedTypes } = useSelector((state) => state.tile);
  const { allPolygons, allNumParameters } = useSelector((state) => state.menu);

  const handleNewTiling = (e) => {
    var tilingIndex = e.currentTarget.className.replace("canvasContainer", "");
    dispatch(setNewTiling(width, height, scaleFactor, selectedTypes[tilingIndex]));
  };
  var canvasSize = 100;

  return (
    <StyledTilingControls id="tilingOptions">
      {allPolygons.map((polygons, index) => {
        let setup = (p5, parentClass) => {
          let canvas = p5
            .createCanvas(canvasSize, canvasSize)
            .parent(parentClass);
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
            style={{width: 100, height: 100}}
          >
            <Sketch
              setup={setup}
              draw={draw}
              className={"canvas" + index}
              key={"canvas" + index}
            />
            {/* <p>{allNumParameters[index]}</p> */}
          </div>
        );
      })}
    </StyledTilingControls>
  );
};

const StyledTilingControls = styled(motion.div)`
  margin-top: 3px;
  margin-bottom: 3px;
  height: min-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;

  canvas{
      cursor: pointer;
  }

  div[class^='canvasContainer'] {
    margin: 3px;
    border-radius: 10px;
  }
  div[class^='canvasContainer']:hover {
    filter: invert(1);
  }
`;

export default TilingControls;
