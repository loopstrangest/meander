//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateParameters } from "../actions/tileAction";

import { TilerTheCreator } from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";

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

  const resetParam = (e) => {
    var paramButtons = document.querySelectorAll(".paramReset");
    var buttonIndex = Array.from(paramButtons).indexOf(e.target);
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
    controls.push(
      <div class="paramContainer" key={"paramContainder" + index}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
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
          reset
        </button>
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

  .paramContainer {
    display: flex;
    width: 225px;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px 10px;
  }

  .paramSlider {
    cursor: pointer;
    background: none;
  }

  .paramSlider::-webkit-slider-thumb {
    //background: black;
  }
  .paramSlider::-moz-range-thumb {
    //background: black;
  }

  .paramReset {
    border: none;
    color: white;
    background-color: black;
    padding: 2px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
  }

  .paramReset:hover {
    color: black;
    background-color: white;
  }
`;

export default ParamControls;
