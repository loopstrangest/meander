//redux and routes
import { useDispatch, useSelector } from "react-redux";
import quiltImage from "../quilt.jpg";
import { updateRandomSolidFill } from "../actions/tileAction";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

//tile and canvas
import Sketch from "react-p5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

const Canvas = () => {
  //fetch random tile
  const {
    width,
    height,
    polygons,
    borderWidth,
    type,
    scaleFactor,
    fillStyle,
    tiling,
    colors,
    image,
    linearGradientOptions,
    linearGradient,
    randomSolidFill,
  } = useSelector((state) => state.tile);
  const { tab } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  let getStyledCanvasWidth = () => {
    return Math.min(100, document.body.clientWidth / 10);
  };

  let getPolygonData = (arr) => {
    var minX, maxX, minY, maxY;
    for (var i = 0; i < arr.length; i++) {
      minX = arr[i][0] < minX || minX == null ? arr[i][0] : minX;
      maxX = arr[i][0] > maxX || maxX == null ? arr[i][0] : maxX;
      minY = arr[i][1] < minY || minY == null ? arr[i][1] : minY;
      maxY = arr[i][1] > maxY || maxY == null ? arr[i][1] : maxY;
    }
    var length = maxX - minX;
    var height = maxY - minY;
    var smallestSide = Math.min(length, height);
    var centerX = parseFloat(((minX + maxX) / 2).toFixed(3));
    var centerY = parseFloat(((minY + maxY) / 2).toFixed(3));
    //Center coordinates, minimum of (lenght, height)
    return [centerX, centerY, smallestSide];
  };

  let quilt;
  let testImage = new Image(50, 50);
  testImage.src = quiltImage;

  //PRELOAD
  let preload = (p5) => {
    quilt = p5.loadImage(quiltImage);
  };

  //SETUP
  let setup = (setup, parentClass) => {
    let canvas = setup.createCanvas(width, height).parent(parentClass);
    var randomFillArray = [];
    polygons.forEach((polygon, pIndex) => {});
  };

  //DRAW
  let draw = (p5) => {
    p5.strokeWeight(borderWidth);
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
    //p5.noLoop();
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
            preload={preload}
            setup={setup}
            draw={draw}
            className="tileCanvas"
            style={{ position: "inherit" }}
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
  border: 1px solid black;

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
    background-color: (0, 0, 0, 0);
  }
`;

export default Canvas;
