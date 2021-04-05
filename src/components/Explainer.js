import { useDispatch } from "react-redux";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHome,
  faSlidersH,
  faBorderAll,
  faGripLinesVertical,
  faPalette,
  faFileDownload,
  faTint,
  faWaveSquare,
  faGlasses,
  faPlus,
  faMinus,
  faCheck,
  faRandom,
  faBreadSlice,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Explainer = () => {
  const dispatch = useDispatch();
  const toggleExplainer = () => {
    dispatch({ type: "TOGGLE_EXPLAINER" });
  };

  //use fontawesomeicons
  const mail = <FontAwesomeIcon class="icon" icon={faEnvelope} />;
  const twitter = <FontAwesomeIcon class="icon" icon={faTwitter} />;
  const home = <FontAwesomeIcon class="icon" icon={faHome} />;
  const sliders = <FontAwesomeIcon class="textIcon" icon={faSlidersH} />;
  const pattern = <FontAwesomeIcon class="textIcon" icon={faBorderAll} />;
  const border = (
    <FontAwesomeIcon class="textIcon" icon={faGripLinesVertical} />
  );
  const colors = <FontAwesomeIcon class="textIcon" icon={faPalette} />;
  const solid = <FontAwesomeIcon class="textIcon" icon={faTint} />;
  const randomSolid = <FontAwesomeIcon class="textIcon" icon={faRandom} />;
  const gradient = <FontAwesomeIcon class="textIcon" icon={faWaveSquare} />;
  const glasses = <FontAwesomeIcon class="textIcon" icon={faGlasses} />;
  const bread = <FontAwesomeIcon class="textIcon" icon={faBreadSlice} />;
  const download = <FontAwesomeIcon class="textIcon" icon={faFileDownload} />;

  return (
    <ExplainerShadow onClick={toggleExplainer}>
      <Information>
        <p>
          Meander lets you create custom wallpapers for your digital device.
        </p>
        <p>{pattern} Choose the pattern to display.</p>

        <p>{border} Change the border thickness of each shape.</p>
        <p>
          {sliders} Stretch and compress the shapes in various directions. The
          small patterns above each slider show how the slider affects the
          displayed pattern.
        </p>
        <p>
          {colors} Change pattern colors and add visual effects:
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{solid} Default solid fill
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{randomSolid} Random solid fill
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{gradient} Random gradient fill
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{glasses} Blur effect
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bread} Grain effect
        </p>
        <p>{download} Download the displayed pattern as a JPG.</p>
        <hr />
        <p class="aboutMe">
          Meander is made by Loopy, a web developer actively seeking work
          opportunities.
        </p>
        <div className="links">
          <a
            href="https://twitter.com/strangestloop"
            target="_blank"
            rel="noreferrer"
          >
            {twitter}
          </a>
          <a href="mailto:loopstrangest@gmail.com">{mail}</a>
          <a href="https://strangestloop.io" target="_blank" rel="noreferrer">
            {home}
          </a>
        </div>
      </Information>
    </ExplainerShadow>
  );
};

const ExplainerShadow = styled(motion.div)`
  width: 100%;
  display: flex;
  height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Information = styled(motion.div)`
  display: block;
  width: 75%;
  height: min-content;
  margin: auto;
  border-radius: 1rem;
  padding: 1rem 3rem;
  background: white;
  position: relative;
  color: black;
  z-index: 10;
  font-size: 20px;
  img {
    width: 100%;
  }
  p {
    padding: 0.5rem 0rem;
  }
  hr {
    margin: 0.5rem 0rem;
  }

  .textIcon {
    width: 2vw;
    height: 2vh;
    min-height: 16px;
    min-width: 16px;
  }

  .links,
  .aboutMe {
    display: flex;
    justify-content: center;
  }
  .aboutMe {
    text-align: center;
  }
  .links {
    margin-top: 0.5rem;
    height: 2rem;
  }
  .links a {
    display: inline-block;
    height: 100%;
  }
  .icon {
    opacity: 50%;
    height: 100%;
    padding: 0 0.5rem;
    color: skyblue;
  }
  .icon:hover {
    opacity: 100%;
    cursor: pointer;
  }
`;

export default Explainer;
