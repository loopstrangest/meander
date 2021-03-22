//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTab } from "../actions/menuAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSlidersH,
  faBorderAll,
} from "@fortawesome/free-solid-svg-icons";

//components
import ParamControls from "../components/ParamControls";
import TilingControls from "../components/TilingControls";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Menu = () => {
  const dispatch = useDispatch();
  const { tab } = useSelector((state) => state.menu);

  const updateMenuTab = (e) => {
    console.log('tab click');
    console.log(e.currentTarget.className);
    dispatch(updateTab(e.currentTarget.className));
  };

  const sliders = <FontAwesomeIcon icon={faSlidersH} />;
  const pattern = <FontAwesomeIcon icon={faBorderAll} />;

  return (
    <div>
      <StyledMenu id="menu">
        {tab === "params" ? <ParamControls /> : <TilingControls />}
        
      </StyledMenu>
      <StyledMenuNav className="menuNav">
          <div class="params" onClick={updateMenuTab}>
            {sliders}
          </div>
          <div class="tiling" onClick={updateMenuTab}>
            {pattern}
          </div>
      </StyledMenuNav>
    </div>
  );
};

const StyledMenu = styled(motion.div)`
  width: 60vw;
  height: min-content;
  position: absolute;
  left: 20vw;
  bottom: 8vh;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMenuNav = styled(motion.div)`
  position: absolute;
  display: flex;
  height: 5vh;
  flex-direction: row;
  top: 92vh;
  left: 20vw;

  div {
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 0px 0px 10px 10px;
  width: 5vw;
  border: none;
  padding-left: 3px;
  padding-right: 3px;
  margin-left: 10px;
  display: flex;
  }

  div:hover {
    filter: invert(1);
  }

  .svg-inline--fa{
    width: 90%;
    height: 90%;
    margin: auto;
  }
  
  }
`;

export default Menu;
