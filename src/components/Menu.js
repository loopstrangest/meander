//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTab } from "../actions/menuAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSlidersH,
  faBorderAll,
  faGripLinesVertical,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

//components
import ParamControls from "../components/ParamControls";
import TilingControls from "../components/TilingControls";
import BorderControls from "../components/BorderControls";
import ColorControls from "../components/ColorControls";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Menu = () => {
  const dispatch = useDispatch();
  const { tab } = useSelector((state) => state.menu);

  const updateMenuTab = (e) => {
    dispatch(updateTab(e.currentTarget.id));
  };

  const getMenuOption = () => {
    switch (tab) {
      case "params": {
        return <ParamControls />;
      }
      case "tiling": {
        return <TilingControls />;
      }
      case "border": {
        return <BorderControls />;
      }
      case "colors": {
        return <ColorControls />;
      }
    }
  };

  const sliders = <FontAwesomeIcon icon={faSlidersH} />;
  const pattern = <FontAwesomeIcon icon={faBorderAll} />;
  const border = <FontAwesomeIcon icon={faGripLinesVertical} />;
  const colors = <FontAwesomeIcon icon={faPalette} />;

  return (
    <StyledMenu>
      <div id="menu">{getMenuOption()}</div>
      <div className="menuNav">
        <div className="menuOption" id="params" onClick={updateMenuTab}>
          {sliders}
        </div>
        <div className="menuOption" id="tiling" onClick={updateMenuTab}>
          {pattern}
        </div>
        <div className="menuOption" id="border" onClick={updateMenuTab}>
          {border}
        </div>
        <div className="menuOption" id="colors" onClick={updateMenuTab}>
          {colors}
        </div>
      </div>
    </StyledMenu>
  );
};

const StyledMenu = styled(motion.div)`
  z-index: 2;
  position: absolute;
  left: 20vw;
  width: 60vw;
  bottom: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  #menu {
    height: min-content;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menuNav {
    display: flex;
    height: 5vh;
    margin-left: 1vw;
    margin-right: 1vw;
    flex-direction: row;
    justify-content: space-around;
  }

  .menuOption {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
    width: 100%;
    border-radius: 0px 0px 10px 10px;
    border: none;
    padding-left: 1vw;
    padding-right: 1vw;
    margin-left: 1vw;
    margin-right: 1vw;
    display: flex;
  }

  .menuOption:hover {
    filter: invert(1);
  }

  .menuOption > .svg-inline--fa {
    width: 90%;
    height: 90%;
    margin: auto;
  }
`;

export default Menu;
