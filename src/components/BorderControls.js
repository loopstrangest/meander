//redux and routes
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBorder } from "../actions/tileAction";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const BorderControls = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    var borderOptions = document.querySelectorAll(".borderOption");
    var borderIndex = Array.from(borderOptions).indexOf(e.currentTarget);
    dispatch(updateBorder(borderIndex));
  };

  return (
    <StyledBorderControls>
      <div className="borderOption zero" onClick={handleChange}>
        <div className="line" style={{ height: "0px" }}></div>
      </div>
      <div className="borderOption one" onClick={handleChange}>
        <div className="line" style={{ height: "1px" }}></div>
      </div>
      <div className="borderOption two" onClick={handleChange}>
        <div className="line" style={{ height: "2px" }}></div>
      </div>
      <div className="borderOption three" onClick={handleChange}>
        <div className="line" style={{ height: "3px" }}></div>
      </div>
      <div className="borderOption four" onClick={handleChange}>
        <div className="line" style={{ height: "4px" }}></div>
      </div>
      <div className="borderOption five" onClick={handleChange}>
        <div className="line" style={{ height: "5px" }}></div>
      </div>
      <div className="borderOption six" onClick={handleChange}>
        <div className="line" style={{ height: "6px" }}></div>
      </div>
      <div className="borderOption seven" onClick={handleChange}>
        <div className="line" style={{ height: "7px" }}></div>
      </div>
      <div className="borderOption eight" onClick={handleChange}>
        <div className="line" style={{ height: "8px" }}></div>
      </div>
      <div className="borderOption nine" onClick={handleChange}>
        <div className="line" style={{ height: "9px" }}></div>
      </div>
      <div className="borderOption ten" onClick={handleChange}>
        <div className="line" style={{ height: "10px" }}></div>
      </div>
    </StyledBorderControls>
  );
};

const StyledBorderControls = styled(motion.div)`
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
    filter: invert(1);
  }

  .line {
    width: 90%;
    background-color: black;
  }
`;

export default BorderControls;
