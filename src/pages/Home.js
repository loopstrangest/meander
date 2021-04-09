import { useSelector } from "react-redux";
//components
import Canvas from "../components/Canvas";
import Menu from "../components/Menu";
import ExplainerButton from "../components/ExplainerButton";
import Explainer from "../components/Explainer";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Home = () => {
  const { showExplainer } = useSelector((state) => state.menu);

  return (
    <Homepage>
      {showExplainer ? <Explainer /> : ""}
      <Canvas />
      <Menu />
      <ExplainerButton />
    </Homepage>
  );
};

const Homepage = styled(motion.div)`
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  position: fixed;
`;

export default Home;
