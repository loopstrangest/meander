//redux and routes
import { useDispatch, useSelector } from "react-redux";
import {
  updateFillStyle,
  updateColor,
  updateRandomSolidFill,
  updateLinearGradient,
  updateBlurValue,
  updateGrainValue,
} from "../actions/tileAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faWaveSquare,
  faGlasses,
  faPlus,
  faMinus,
  faRandom,
  faBreadSlice,
} from "@fortawesome/free-solid-svg-icons";
import { createGrain } from "../canvas_modules/grained/grained.js";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const ColorControls = () => {
  const dispatch = useDispatch();
  const {
    polygons,
    colors,
    linearGradientOptions,
    type,
    blur,
    grain,
  } = useSelector((state) => state.tile);

  const solid = <FontAwesomeIcon icon={faTint} />;
  const gradient = <FontAwesomeIcon icon={faWaveSquare} />;
  const glasses = <FontAwesomeIcon icon={faGlasses} />;
  const plusColor = <FontAwesomeIcon icon={faPlus} />;
  const minusColor = <FontAwesomeIcon icon={faMinus} />;
  const randomSolid = <FontAwesomeIcon icon={faRandom} />;
  const bread = <FontAwesomeIcon icon={faBreadSlice} />;

  var grainOptions = {
    animate: false,
    patternWidth: 100,
    patternHeight: 100,
    grainOpacity: 0,
    grainDensity: 1,
    grainWidth: 1,
    grainHeight: 1,
    grainChaos: 0.5,
    grainSpeed: 0,
  };
  var canvasGrain = new createGrain();

  const addColor = () => {
    var colorInputs = document.querySelectorAll(".colorInput");
    var numColorInputs = colorInputs.length;
    if (numColorInputs < 6) {
      dispatch(updateColor(polygons, colors, "#ffffff", numColorInputs));
    }
  };

  const removeColor = () => {
    var colorInputs = document.querySelectorAll(".colorInput");
    var numColorInputs = colorInputs.length;
    if (numColorInputs > 1) {
      console.log(colors.slice(0, -1));
      dispatch(updateRandomSolidFill(polygons, colors.slice(0, -1)));
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
      dispatch(updateColor(polygons, colors, colorValue, colorInputIndex));
    }
  };

  const handleGrain = (e) => {
    var grainSliderValue = document.querySelector(".grainSlider").value;
    grainOptions.grainOpacity = Number(grainSliderValue);
    canvasGrain.grained("grainOverlay", grainOptions);
    dispatch(updateGrainValue(Number(grainSliderValue)));
  };

  const handleBlur = (e) => {
    var blurValue = document.querySelector(".blurSlider").value;
    var canvas = document.querySelector(".tileCanvas");
    canvas.style.filter = `blur(${blurValue}px)`;
    dispatch(updateBlurValue(Number(blurValue)));
  };

  const handleChange = (e) => {
    var fillStyle = e.currentTarget.id;
    dispatch(updateFillStyle(fillStyle));
  };

  const handleRandomSolidChange = (e) => {
    var fillStyle = e.currentTarget.id;
    dispatch(updateRandomSolidFill(polygons, colors));
    dispatch(updateFillStyle(fillStyle));
  };

  const handleGradientChange = (e) => {
    var fillStyle = e.currentTarget.id;
    dispatch(updateLinearGradient(linearGradientOptions[type]));
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
          onClick={handleRandomSolidChange}
        >
          {randomSolid}
        </div>
        <div
          className="fillStyleOption"
          id="gradient"
          onClick={handleGradientChange}
        >
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
      <div class="blurGrainContainer">
        <input
          type="range"
          min="0"
          max="10"
          step="0.2"
          defaultValue={blur}
          onChange={handleBlur}
          class="blurSlider"
        ></input>
        {glasses}
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.025"
          defaultValue={grain}
          onChange={handleGrain}
          class="grainSlider"
        ></input>
        {bread}
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

  .blurGrainContainer {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    font-size: 20px;
  }

  .blurSlider,
  .grainSlider {
    cursor: pointer;
    background: none;
    padding-right: 10px;
    padding-left: 10px;
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
