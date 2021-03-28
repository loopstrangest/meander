//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateParameters } from "../actions/tileAction";
import Sketch from "react-p5";

import { TilerTheCreator } from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt, faArrowsAltH } from "@fortawesome/free-solid-svg-icons";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const ParamControls = () => {
  const dispatch = useDispatch();
  const {
    width,
    height,
    scaleFactor,
    defaultParameters,
    type,
    tiling,
  } = useSelector((state) => state.tile);
  const { allPolygonShifts } = useSelector((state) => state.menu);
  const reset = <FontAwesomeIcon icon={faUndoAlt} />;
  const leftRight = <FontAwesomeIcon class="leftRight" icon={faArrowsAltH} />;

  const resetParam = (e) => {
    var paramButtons = document.querySelectorAll(".paramReset");
    var buttonIndex = Array.from(paramButtons).indexOf(e.currentTarget);
    console.log(buttonIndex);
    var paramSliders = document.querySelectorAll(".paramSlider");
    var paramResetValue = defaultParameters[buttonIndex];
    Array.from(paramSliders)[buttonIndex].value = paramResetValue;
    handleChange();
  };

  const handleChange = (e) => {
    var parameters = [];
    var paramSliders = document.querySelectorAll(".paramSlider");
    paramSliders.forEach((slider) => {
      parameters.push(slider.value);
    });
    dispatch(updateParameters(width, height, scaleFactor, type, parameters));
  };

  let controls = [];
  tiling.getParameters().forEach((param, index) => {
    let setup = (p5, parentClass) => {
      let canvas = p5.createCanvas(50, 50).parent(parentClass);
    };

    let drawLeft = (p5) => {
      p5.strokeWeight(1);

      allPolygonShifts[type][index * 2][0].forEach((polygon, pIndex) => {
        p5.beginShape();
        polygon.forEach((vertex, vIndex) => {
          p5.vertex(vertex[0], vertex[1]);
        });
        p5.vertex(polygon[0][0], polygon[0][1]);
        p5.endShape();
      });
      p5.noLoop();
    };

    let drawRight = (p5) => {
      p5.strokeWeight(1);

      allPolygonShifts[type][index * 2 + 1][0].forEach((polygon, pIndex) => {
        p5.beginShape();
        polygon.forEach((vertex, vIndex) => {
          p5.vertex(vertex[0], vertex[1]);
        });
        p5.vertex(polygon[0][0], polygon[0][1]);
        p5.endShape();
      });
      p5.noLoop();
    };

    controls.push(
      <div class="paramContainer" key={"paramContainder" + index}>
        <div className="visualContainer">
          <div
            key={"visualContainerLeft" + index}
            className={"canvasContainer" + index}
            style={{ width: 50, height: 50 }}
          >
            <Sketch
              setup={setup}
              draw={drawLeft}
              className={"sliderVisual" + index}
              key={"sliderVisualLeft" + index}
            />
          </div>
          {leftRight}
          <div
            key={"visualContainerRight" + index}
            className={"canvasContainer" + index}
            style={{ width: 50, height: 50 }}
          >
            <Sketch
              setup={setup}
              draw={drawRight}
              className={"sliderVisual" + index}
              key={"sliderVisualLeft" + index}
            />
          </div>
        </div>
        <div className="sliderContainer">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue={param}
            onChange={handleChange}
            class="paramSlider"
            id={"paramSlider" + index}
          ></input>
          <button
            class="paramReset"
            onClick={resetParam}
            id={"paramReset" + index}
            type="button"
            key={"paramReset" + index}
          >
            {reset}
          </button>
        </div>
      </div>
    );
  });
  return <StyledParamControls>{controls}</StyledParamControls>;
};

const StyledParamControls = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0px 6px;

  .paramContainer {
    display: flex;
    width: 195px;
    flex-direction: column;
    justify-content: space-between;
    margin: 5px 12px;
  }

  .visualContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin: 0px 6px;
    padding-right: 30px;
  }

  div[class^="canvasContainer"] {
    margin: 3px;
    border-radius: 10px;
  }

  .leftRight {
    margin: auto 6px;
    height: 25px;
  }

  .sliderContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin: 0px 6px;
  }

  .paramSlider {
    cursor: pointer;
    background: none;
  }

  .paramReset {
    border: none;
    color: black;
    background: none;
    padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    display: flex;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
  }

  .paramReset:hover {
    filter: invert(1);
  }
`;

export default ParamControls;
