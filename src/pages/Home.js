import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//components
import Canvas from "../components/Canvas";
import Menu from "../components/Menu";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  //fetch games
  const dispatch = useDispatch();

  //get data
  return (
    <Homepage>
      <Canvas />
      <Menu />
    </Homepage>
  );
};

const Homepage = styled(motion.div)``;

export default Home;
