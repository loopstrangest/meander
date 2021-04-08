//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBorder, updateBorderColor } from "../actions/tileAction";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const BorderControls = () => {
  const dispatch = useDispatch();

  const { borderColor } = useSelector((state) => state.tile);

  const handleBorderColor = (e) => {
    var borderColorValue = document.querySelector(".borderColorInput").value;
    var s = new Option().style;
    s.color = borderColorValue;
    if (s.color !== "") {
      dispatch(updateBorderColor(borderColorValue));
    }
  };

  const handleChange = (e) => {
    var borderOptions = document.querySelectorAll(".borderOption");
    var borderIndex = Array.from(borderOptions).indexOf(e.currentTarget);
    dispatch(updateBorder(borderIndex));
  };

  return (
    <StyledBorderControls>
      <div className="borderOptions">
        <div className="borderOption zero" onClick={handleChange}>
          <div
            className="line"
            style={{ height: "0px", backgroundColor: borderColor }}
          ></div>
        </div>
        <div className="borderOption one" onClick={handleChange}>
          <div
            className="line"
            style={{ height: "1px", backgroundColor: borderColor }}
          ></div>
        </div>
        <div className="borderOption two" onClick={handleChange}>
          <div
            className="line"
            style={{ height: "2px", backgroundColor: borderColor }}
          ></div>
        </div>
        <div className="borderOption three" onClick={handleChange}>
          <div
            className="line"
            style={{ height: "3px", backgroundColor: borderColor }}
          ></div>
        </div>
        <div className="borderOption four" onClick={handleChange}>
          <div
            className="line"
            style={{ height: "4px", backgroundColor: borderColor }}
          ></div>
        </div>
        <div className="borderOption five" onClick={handleChange}>
          <div
            className="line"
            style={{ height: "5px", backgroundColor: borderColor }}
          ></div>
        </div>
        <div className="borderOption six" onClick={handleChange}>
          <div
            className="line"
            style={{ height: "6px", backgroundColor: borderColor }}
          ></div>
        </div>
        <div className="borderOption seven" onClick={handleChange}>
          <div
            className="line"
            style={{ height: "7px", backgroundColor: borderColor }}
          ></div>
        </div>
        <div className="borderOption eight" onClick={handleChange}>
          <div
            className="line"
            style={{ height: "8px", backgroundColor: borderColor }}
          ></div>
        </div>
        <div className="borderOption nine" onClick={handleChange}>
          <div
            className="line"
            style={{ height: "9px", backgroundColor: borderColor }}
          ></div>
        </div>
        <div className="borderOption ten" onClick={handleChange}>
          <div
            className="line"
            style={{ height: "10px", backgroundColor: borderColor }}
          ></div>
        </div>
      </div>
      <div className="borderColorBox">
        <div
          className="borderColorDisplay"
          style={{ backgroundColor: borderColor }}
        ></div>
        <input
          className="borderColorInput"
          type="text"
          defaultValue={borderColor}
          onChange={handleBorderColor}
        ></input>
      </div>
    </StyledBorderControls>
  );
};

const StyledBorderControls = styled(motion.div)`
  .borderOptions,
  .borderColorBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 6px;
  }

  .borderOption {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px;
    border: 1px solid black;
    border-radius: 10px;
    height: 50px;
    width: 100px;
  }

  .borderOption:hover {
    border: 1px solid white;
  }

  .borderColorBox {
    width: 150px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 6px;
  }

  .borderColorDisplay {
    width: 25px;
    margin-right: 6px;
    border-radius: 6px;
  }

  .borderColorInput {
    width: 100px;
    padding-left: 0.5em;
    letter-spacing: 0.02em;
    border: 1px solid black;
    border-radius: 6px;
  }

  .line {
    width: 90%;
    background-color: black;
  }
`;

export default BorderControls;
