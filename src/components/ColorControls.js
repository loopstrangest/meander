//redux and routes
import { useDispatch, useSelector } from "react-redux";
import {
  updateFillStyle,
  updateColor,
  updateColorsFromURL,
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
  faCheck,
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
  const randomSolid = <FontAwesomeIcon icon={faRandom} />;
  const gradient = <FontAwesomeIcon icon={faWaveSquare} />;
  const plusColor = <FontAwesomeIcon icon={faPlus} />;
  const minusColor = <FontAwesomeIcon icon={faMinus} />;
  const check = <FontAwesomeIcon icon={faCheck} />;
  const glasses = <FontAwesomeIcon icon={faGlasses} />;
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

  const handleFillStyleChange = (e) => {
    var fillStyle = e.currentTarget.id;
    if (fillStyle == "randomSolid") {
      dispatch(updateRandomSolidFill(polygons, colors));
    } else if (fillStyle == "gradient") {
      dispatch(updateLinearGradient(linearGradientOptions[type]));
    }
    dispatch(updateFillStyle(fillStyle));
  };

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

  const handleCoolors = (e) => {
    var inputURL = document.querySelector(".coolorsInput").value;
    var urlSplit = inputURL.split("/");
    var urlColors = urlSplit[urlSplit.length - 1];
    var colorsArray = urlColors.split("-");
    var checkedColors = [];
    colorsArray.forEach((color) => {
      var s = new Option().style;
      var colorString = "#" + color;
      s.color = colorString;
      if (s.color !== "") {
        checkedColors.push(colorString);
      }
      if (checkedColors.length >= 1) {
        dispatch(updateColorsFromURL(polygons, checkedColors));
      }
    });
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

  return (
    <StyledColorControls>
      <div class="styleOptionsContainer container">
        <div
          className="fillStyleOption"
          id="solid"
          onClick={handleFillStyleChange}
        >
          {solid}
        </div>
        <div
          className="fillStyleOption"
          id="randomSolid"
          onClick={handleFillStyleChange}
        >
          {randomSolid}
        </div>
        <div
          className="fillStyleOption"
          id="gradient"
          onClick={handleFillStyleChange}
        >
          {gradient}
        </div>
      </div>
      <div class="colorsContainer container">
        {colors.map((eachColor, index) => (
          <div className="colorBox" key={"colorBox" + index}>
            <div
              className="colorDisplay"
              style={{ backgroundColor: eachColor }}
            ></div>
            <input
              key={eachColor}
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
      <div class="coolorsContainer container">
        <input class="coolorsInput" placeholder="Paste coolors.co URL" />
        <button class="coolorsButton" onClick={handleCoolors} type="button">
          {check}
        </button>
      </div>

      <div class="blurGrainContainer container">
        <div className="blurContainer">
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
        </div>
        <div className="grainContainer">
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
      </div>
    </StyledColorControls>
  );
};

const StyledColorControls = styled(motion.div)`
  .container {
    margin: 6px;
    width: 100%;
  }

  .styleOptionsContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .fillStyleOption {
    width: auto;
    cursor: pointer;
    margin: 3px;
    height: 8vh;
  }

  .fillStyleOption:hover {
    filter: invert(1);
  }

  .fillStyleOption > .svg-inline--fa {
    width: 100%;
    height: 100%;
    margin: auto;
  }

  .colorsContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 20px;
    //margin: -6px;
  }

  .colorBox {
    width: 150px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 6px;
  }

  .colorChangeBox {
    margin: 6px;
  }

  .colorDisplay {
    width: 25px;
    margin-right: 6px;
  }

  .colorInput {
    width: 100px;
    padding-left: 0.5em;
    letter-spacing: 0.02em;
    border-style: solid;
    border-width: 1px;
  }

  .colorChangeBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100px;
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

  .coolorsContainer {
    display: flex;
    justify-content: center;
  }

  .coolorsInput {
    width: 75%;
    text-align: center;
  }

  .coolorsButton {
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

  .coolorsButton:hover {
    filter: invert(1);
  }

  .blurGrainContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    font-size: 20px;
    width: 100%;
  }

  .blurGrainContainer * {
    margin: 3px 0;
  }

  .blurSlider,
  .grainSlider {
    cursor: pointer;
    background: none;
    padding-right: 10px;
  }
`;

export default ColorControls;
