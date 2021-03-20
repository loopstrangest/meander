//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import ParamControls from "../components/ParamControls";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Menu = () => {
  return (
    <StyledMenu id="menu">
      <ParamControls />
    </StyledMenu>
  );
};

const StyledMenu = styled(motion.div)`
  width: 90vw;
  height: min-content;
  position: absolute;
  left: 5vw;
  bottom: 5vh;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

export default Menu;
