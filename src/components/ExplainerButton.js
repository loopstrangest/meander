//redux and routes
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const ExplainerButton = () => {
  const dispatch = useDispatch();

  const toggleExplainer = () => {
    dispatch({ type: "TOGGLE_EXPLAINER" });
  };

  const question = <FontAwesomeIcon icon={faQuestion} />;

  return (
    <StyledExplainerButton onClick={toggleExplainer}>
      <div className="explainerButton">{question}</div>
    </StyledExplainerButton>
  );
};

const StyledExplainerButton = styled(motion.div)`
  z-index: 2;
  position: absolute;
  right: 4vw;
  bottom: 4vh;
  width: 5vh;
  height: 5vh;
  min-height: 40px;

  :hover {
    cursor: pointer;
    filter: invert(1);
  }

  .explainerButton {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
  }

  .explainerButton > .svg-inline--fa {
    width: 80%;
    height: 80%;
    margin: auto;
  }
`;

export default ExplainerButton;
