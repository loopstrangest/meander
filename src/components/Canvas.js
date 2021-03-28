//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTileParameters } from "../actions/tileAction";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

//tile and canvas
import { TilerTheCreator } from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";
import Sketch from "react-p5";

const Canvas = () => {
  //fetch random tile
  const {
    width,
    height,
    polygons,
    borderWidth,
    fillStyle,
    colors,
  } = useSelector((state) => state.tile);

  var randomColorArray = [];

  let fillRandomColorArray = () => {
    polygons.forEach((e) => {
      randomColorArray.push(colors[Math.floor(Math.random() * colors.length)]);
    });
    console.log(randomColorArray);
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

  let setup = (p5, parentClass) => {
    let canvas = p5.createCanvas(width, height).parent(parentClass);
  };
  let draw = (p5) => {
    p5.strokeWeight(borderWidth);
    p5.smooth();

    polygons.forEach((polygon, pIndex) => {
      if (fillStyle == "gradient") {
        randomColorArray = [];
        let polygonData = getPolygonData(polygon);
        let gradient = p5.drawingContext.createRadialGradient(
          polygonData[0],
          polygonData[1],
          polygonData[2] * p5.noise(polygonData[0], polygonData[1]),
          polygonData[0],
          polygonData[1],
          polygonData[2] / 4
        );

        /*
        let gradient = p5.drawingContext.createLinearGradient(
          polygon[0][0],
          polygon[0][1],
          polygon[2][0],
          polygon[2][1]
        );*/
        let c1 = p5.color(255, 0, 0);
        let c2 = p5.color(0, 0, 255);
        let c3 = p5.color(0, 255, 0);
        gradient.addColorStop(0, c1.toString());
        gradient.addColorStop(0.5, c2.toString());
        gradient.addColorStop(1, c3.toString());
        p5.drawingContext.fillStyle = gradient;
      } else if (fillStyle === "solid") {
        randomColorArray = [];
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
        if (randomColorArray.length < 1) {
          fillRandomColorArray();
        }
        p5.fill(randomColorArray[pIndex]);
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
    <StyledCanvas>
      {<Sketch setup={setup} draw={draw} className="canvas" />}
    </StyledCanvas>
  );
};

const StyledCanvas = styled(motion.div)`
  .canvas {
    background-color: (0, 0, 0, 0);
  }
`;

export default Canvas;
