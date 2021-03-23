//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFillStyle } from "../actions/tileAction";

import { TilerTheCreator } from "../canvas_modules/TilerTheCreator/TilerTheCreator.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTint, faWaveSquare } from "@fortawesome/free-solid-svg-icons";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const ColorControls = () => {
  const dispatch = useDispatch();
  const { fillStyle } = useSelector((state) => state.tile);

  const solid = <FontAwesomeIcon icon={faTint} />;
  const gradient = <FontAwesomeIcon icon={faWaveSquare} />;

  const handleChange = (e) => {
    var fillStyle = e.currentTarget.id;
    dispatch(updateFillStyle(fillStyle));
  };

  return (
    <StyledColorControls>
      <div className="fillStyleOption" id="solid" onClick={handleChange}>
        {solid}
      </div>
      <div className="fillStyleOption" id="gradient" onClick={handleChange}>
        {gradient}
      </div>
    </StyledColorControls>
  );
};

const StyledColorControls = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  margin: 12px 6px;

  .fillStyleOption {
    height: 5vh;
    cursor: pointer;
  }

  .fillStyleOption:hover {
    filter: invert(1);
  }

  .fillStyleOption > .svg-inline--fa {
    width: 90%;
    height: 90%;
    margin: auto;
  }
`;

export default ColorControls;
