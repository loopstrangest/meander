//redux and routes
import { useDispatch, useSelector } from "react-redux";
import { updateRandomPattern } from "../actions/tileAction";
import { createGrain } from "../canvas_modules/grained/grained.js";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

//tile and canvas
import Sketch from "react-p5";

const Canvas = () => {
  //fetch random tile
  const {
    width,
    height,
    polygons,
    borderWidth,
    borderColor,
    fillStyle,
    colors,
    linearGradient,
    randomSolidFill,
    blur,
    grain,
    gettingRandomPattern,
  } = useSelector((state) => state.tile);
  const { tab } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

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

  let setBlurGrain = () => {
    //set blur
    var canvas = document.querySelector(".tileCanvas");
    canvas.style.filter = `blur(${blur}px)`;

    //set grain
    grainOptions.grainOpacity = grain;
    canvasGrain.grained("grainOverlay", grainOptions);
  };

  //SETUP
  let setup = (setup, parentClass) => {
    let canvas = setup.createCanvas(width, height).parent(parentClass);
    setBlurGrain();
  };

  //DRAW
  let draw = (p5) => {
    p5.strokeWeight(borderWidth);
    p5.stroke(borderColor);
    p5.smooth();

    polygons.forEach((polygon, pIndex) => {
      if (fillStyle === "gradient") {
        let p5LinearGradient = p5.drawingContext.createLinearGradient(
          polygon[linearGradient[0]][0],
          polygon[linearGradient[0]][1],
          polygon[linearGradient[1]][0],
          polygon[linearGradient[1]][1]
        );

        colors.forEach((color, colorIndex) => {
          p5LinearGradient.addColorStop(
            colorIndex / Math.max(1, colors.length - 1),
            color
          );
        });

        //Setting fillstyle
        p5.drawingContext.fillStyle = p5LinearGradient;
      } else if (fillStyle === "solid") {
        switch (pIndex % colors.length) {
          case 0:
            p5.fill(colors[0]);
            break;
          case 1:
            p5.fill(colors[1]);
            break;
          case 2:
            p5.fill(colors[2]);
            break;
          case 3:
            p5.fill(colors[3]);
            break;
          case 4:
            p5.fill(colors[4]);
            break;
          case 5:
            p5.fill(colors[5]);
            break;
          default:
            p5.fill("lightblue");
        }
      } else if (fillStyle === "randomSolid") {
        p5.fill(randomSolidFill[pIndex]);
      }

      p5.beginShape();
      polygon.forEach((vertex, vIndex) => {
        p5.vertex(vertex[0], vertex[1]);
      });
      p5.vertex(polygon[0][0], polygon[0][1]);
      p5.endShape();
    });
  };

  let keyTyped = (p5) => {
    if (p5.key === " ") {
      dispatch({ type: "TOGGLE_GETTING_RANDOM_PATTERN" });
      console.log("fillStyle going to dispatch is", fillStyle);
      dispatch(
        updateRandomPattern(
          colors,
          borderWidth,
          borderColor,
          fillStyle,
          blur,
          grain
        )
      );
    }
  };
  return (
    <StyledCanvasContainer>
      <div className="styledCanvas">
        <div
          className="grainOverlay"
          style={{
            width: width,
            height: height,

            content: "",
            left: 0,
            top: 0,
            zIndex: 1,
            position: "inherit",
          }}
        ></div>
        {
          <Sketch
            setup={setup}
            draw={draw}
            className="tileCanvas"
            style={{ position: "inherit" }}
            keyTyped={keyTyped}
          />
        }
      </div>
    </StyledCanvasContainer>
  );
};

const StyledCanvasContainer = styled(motion.div)`
  position: absolute;
  width: 96%;
  height: 96%;
  left: 2%;
  top: 2%;
  border: 1px solid white;

  * {
    overflow: hidden;
  }

  .styledCanvas {
    left: 4px;
    right: 4px;
    top: 4px;
    bottom: 4px;
    position: absolute;
  }

  .tileCanvas {
    background-color: rgba(0, 0, 0, 0);
  }
`;

export default Canvas;
