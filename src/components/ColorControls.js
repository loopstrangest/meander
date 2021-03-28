//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFillStyle,
  updateBlur,
  updateColor,
} from "../actions/tileAction";

import { TilerTheCreator } from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faWaveSquare,
  faGlasses,
  faPlus,
  faMinus,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const ColorControls = () => {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.tile);

  const solid = <FontAwesomeIcon icon={faTint} />;
  const gradient = <FontAwesomeIcon icon={faWaveSquare} />;
  const glasses = <FontAwesomeIcon icon={faGlasses} />;
  const plusColor = <FontAwesomeIcon icon={faPlus} />;
  const minusColor = <FontAwesomeIcon icon={faMinus} />;
  const randomSolid = <FontAwesomeIcon icon={faRandom} />;

  const addColor = () => {
    var colorInputs = document.querySelectorAll(".colorInput");
    var numColorInputs = colorInputs.length;
    if (numColorInputs < 6) {
      dispatch(updateColor("#ffffff", numColorInputs));
    }
  };

  const removeColor = () => {
    var colorInputs = document.querySelectorAll(".colorInput");
    var numColorInputs = colorInputs.length;
    if (numColorInputs > 1) {
      dispatch({ type: "REMOVE_COLOR" });
    }
  };

  const handleColor = (e) => {
    var colorInputs = document.querySelectorAll(".colorInput");
    var colorInputIndex = Array.from(colorInputs).indexOf(e.currentTarget);
    var colorValue = e.currentTarget.value;
    var s = new Option().style;
    s.color = colorValue;
    if (s.color !== "") {
      console.log("match!");
      dispatch(updateColor(colorValue, colorInputIndex));
    }
  };

  const handleBlur = (e) => {
    var blurValue = document.querySelector(".blurSlider").value;
    var canvas = document.querySelector(".canvas");
    canvas.style.filter = `blur(${blurValue}px)`;
  };

  const handleChange = (e) => {
    var fillStyle = e.currentTarget.id;
    dispatch(updateFillStyle(fillStyle));
  };

  return (
    <StyledColorControls>
      <div className="styleOptions">
        <div className="fillStyleOption" id="solid" onClick={handleChange}>
          {solid}
        </div>
        <div
          className="fillStyleOption"
          id="randomSolid"
          onClick={handleChange}
        >
          {randomSolid}
        </div>
        <div className="fillStyleOption" id="gradient" onClick={handleChange}>
          {gradient}
        </div>
      </div>
      <div class="colorsContainer">
        {colors.map((eachColor, index) => (
          <div className="colorBox" key={"colorBox" + index}>
            <div
              className="colorDisplay"
              style={{ backgroundColor: eachColor }}
            ></div>
            <input
              className="colorInput"
              type="text"
              defaultValue={eachColor}
              onChange={handleColor}
            ></input>
          </div>
        ))}
        <div className="colorChangeBox">
          {colors.length < 6 ? (
            <div className="colorChange" id="addColor" onClick={addColor}>
              {plusColor}
            </div>
          ) : (
            ""
          )}
          {colors.length > 1 ? (
            <div className="colorChange" id="removeColor" onClick={removeColor}>
              {minusColor}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div class="blurContainer">
        <input
          type="range"
          min="0"
          max="10"
          step="0.2"
          defaultValue="0"
          onChange={handleBlur}
          class="blurSlider"
        ></input>
        {glasses}
      </div>
    </StyledColorControls>
  );
};

const StyledColorControls = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 12px 6px;

  .styleOptions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
  }

  .fillStyleOption {
    height: 5vh;
    width: 100px;
    cursor: pointer;
  }

  .fillStyleOption:hover {
    filter: invert(1);
  }

  .fillStyleOption > .svg-inline--fa {
    width: 100%;
    height: 100%;
    margin: auto;
  }

  .blurContainer {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    font-size: 20px;
  }

  .blurSlider {
    cursor: pointer;
    background: none;
    padding-right: 10px;
  }
  .blurContainer {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    font-size: 20px;
  }

  .colorsContainer {
    display: flex;
    width: 100%;
    min-height: 5vh;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 20px;
  }

  .colorBox {
    width: 150px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 12px 0px;
  }

  .colorDisplay {
    width: 25px;
    margin-right: 6px;
  }

  .colorInput {
    width: 100px;
    padding-left: 0.5em;
    letter-spacing: 0.02em;
  }

  .colorChangeBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100px;
    margin: 12px 0px;
  }

  .colorChange {
    cursor: pointer;
    width: 50px;
    display: flex;
    justify-content: center;
    margin: auto;
  }

  .colorChange:hover {
    filter: invert(1);
  }

  .colorChange > .svg-inline--fa {
    height: 100%;
  }
`;

export default ColorControls;
