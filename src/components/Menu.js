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
  faFileDownload,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

//components
import ParamControls from "../components/ParamControls";
import TilingControls from "../components/TilingControls";
import BorderControls from "../components/BorderControls";
import ColorControls from "../components/ColorControls";
import DownloadControls from "../components/DownloadControls";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Menu = () => {
  const dispatch = useDispatch();
  const { tab, showMenu } = useSelector((state) => state.menu);

  const updateMenuTab = (e) => {
    dispatch(updateTab(e.currentTarget.id));
  };

  const toggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  const getMenuOption = () => {
    switch (tab) {
      case "tiling": {
        return <TilingControls />;
      }
      case "border": {
        return <BorderControls />;
      }
      case "params": {
        return <ParamControls />;
      }
      case "colors": {
        return <ColorControls />;
      }
      case "download": {
        return <DownloadControls />;
      }
    }
  };

  const sliders = <FontAwesomeIcon icon={faSlidersH} />;
  const pattern = <FontAwesomeIcon icon={faBorderAll} />;
  const border = <FontAwesomeIcon icon={faGripLinesVertical} />;
  const colors = <FontAwesomeIcon icon={faPalette} />;
  const download = <FontAwesomeIcon icon={faFileDownload} />;
  const menu = <FontAwesomeIcon icon={faBars} />;
  const close = <FontAwesomeIcon icon={faTimes} />;

  return (
    <div>
      {showMenu ? (
        <StyledMenu>
          <div id="menu">
            {getMenuOption()}
            <div className="hideMenu" onClick={toggleMenu}>
              {close}
            </div>
          </div>
          <div className="menuNav">
            <div className="menuOption" id="tiling" onClick={updateMenuTab}>
              {pattern}
            </div>
            <div className="menuOption" id="border" onClick={updateMenuTab}>
              {border}
            </div>
            <div className="menuOption" id="params" onClick={updateMenuTab}>
              {sliders}
            </div>

            <div className="menuOption" id="colors" onClick={updateMenuTab}>
              {colors}
            </div>
            <div className="menuOption" id="download" onClick={updateMenuTab}>
              {download}
            </div>
          </div>
        </StyledMenu>
      ) : (
        <StyledMenuButton onClick={toggleMenu}>
          <div className="menuButton">{menu}</div>
        </StyledMenuButton>
      )}
    </div>
  );
};

const StyledMenu = styled(motion.div)`
  z-index: 2;
  position: absolute;
  left: 20vw;
  bottom: 4%;
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;

  #menu {
    height: min-content;
    max-height: 60vh;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #menu > * {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin: 6px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-color: black rgba(0, 0, 0, 0);
    scrollbar-width: thin;
  }

  .menuNav {
    display: flex;
    height: 5vh;
    min-height: 40px;
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

  .hideMenu {
    height: 30px !important;
    width: 30px !important;
    position: absolute;
    top: -20px;
    left: -20px;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
    z-index: 5;
    border-radius: 50%;
  }

  .hideMenu:hover {
    cursor: pointer;
    filter: invert(1);
  }

  .hideMenu > .svg-inline--fa {
    width: 80%;
    height: 80%;
    margin: auto;
  }

  .menuOption:hover {
    cursor: pointer;
    filter: invert(1);
  }

  .menuOption > .svg-inline--fa {
    width: 90%;
    height: 90%;
    margin: auto;
  }
`;

const StyledMenuButton = styled(motion.div)`
  z-index: 2;
  position: absolute;
  left: 4vw;
  bottom: 4vh;
  width: 5vh;
  height: 5vh;
  min-height: 40px;

  :hover {
    cursor: pointer;
    filter: invert(1);
  }

  .menuButton {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
  }

  .menuButton > .svg-inline--fa {
    width: 75%;
    height: 75%;
    margin: auto;
  }
`;

export default Menu;
