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
  const { width, height, polygons } = useSelector((state) => state.tile);

  let setup = (p5, parentClass) => {
    let canvas = p5.createCanvas(width, height).parent(parentClass);
  };
  let draw = (p5) => {
    p5.strokeWeight(4);

    polygons.forEach((polygon, pIndex) => {
      switch (pIndex % 6) {
        case 0:
          p5.fill("red");
          break;
        case 1:
          p5.fill("orange");
          break;
        case 2:
          p5.fill("yellow");
          break;
        case 3:
          p5.fill("green");
          break;
        case 4:
          p5.fill("blue");
          break;
        case 5:
          p5.fill("purple");
          break;
        default:
          p5.fill("lightblue");
      }

      p5.beginShape();
      polygon.forEach((vertex, vIndex) => {
        p5.vertex(vertex[0], vertex[1]);
      });
      p5.vertex(polygon[0][0], polygon[0][1]);
      p5.endShape();
    });
    //p5Canvas.noLoop();
  };
  return <Sketch setup={setup} draw={draw} className="canvas" />;
};

export default Canvas;
