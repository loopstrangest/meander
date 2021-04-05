//redux and routes
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import domtoimage from "dom-to-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const DownloadControls = () => {
  const dispatch = useDispatch();
  const check = <FontAwesomeIcon icon={faCheck} />;
  const handleDownload = (width, height) => {
    var divToDownload = document.querySelector(".styledCanvas");
    domtoimage
      .toJpeg(divToDownload, {
        width: width,
        height: height,
        style: {
          marginLeft: "-4px",
          marginTop: "-4px",
        },
      })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = ".jpg";
        link.href = dataUrl;
        link.click();
        link.remove();
      });
  };

  return (
    <StyledDownloadControls>
      <p className="header">
        <u>iPhone</u>
      </p>
      <div className="buttonContainer">
        <button className="download" onClick={() => handleDownload(750, 1334)}>
          6 / 6s / 7 / 8 / SE (2020)
        </button>
        <button className="download" onClick={() => handleDownload(1080, 1920)}>
          6 Plus / 6s Plus / 7 Plus / 8 Plus
        </button>
        <button className="download" onClick={() => handleDownload(640, 1136)}>
          SE (2016)
        </button>
        <button className="download" onClick={() => handleDownload(1125, 2436)}>
          X / XS / 11 Pro
        </button>
        <button className="download" onClick={() => handleDownload(1242, 2688)}>
          XS Max / 11 Pro Max
        </button>
        <button className="download" onClick={() => handleDownload(828, 1792)}>
          XR / 11
        </button>
        <button className="download" onClick={() => handleDownload(1170, 2532)}>
          12 / 12 Pro
        </button>
        <button className="download" onClick={() => handleDownload(1125, 2436)}>
          12 Mini
        </button>
        <button className="download" onClick={() => handleDownload(1284, 2778)}>
          12 Pro Max
        </button>
      </div>
      <p className="header">
        <u>Social Media</u>
      </p>
      <div className="buttonContainer">
        <button className="download" onClick={() => handleDownload(1500, 500)}>
          Twitter Header
        </button>
        <button className="download" onClick={() => handleDownload(820, 360)}>
          Facebook Cover Photo
        </button>
        <button className="download" onClick={() => handleDownload(1584, 396)}>
          LinkedIn Cover Photo
        </button>
      </div>
      <div className="buttonContainer">
        <p>Custom (100px - 2500px):</p>
        <input id="customWidth" type="number" min="100" max="2500" />
        <input id="customHeight" type="number" min="100" max="2500" />
        <button
          class="customDownloadButton"
          onClick={() =>
            handleDownload(
              document.querySelector("#customWidth").value,
              document.querySelector("#customHeight").value
            )
          }
          type="button"
        >
          {check}
        </button>
      </div>
    </StyledDownloadControls>
  );
};

const StyledDownloadControls = styled(motion.div)`
  .header {
    width: 100%;
    text-align: center;
    font-size: 16px;
  }

  .buttonContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 3px;
  }

  input {
    width: 100px;
    margin: 6px;
    padding-left: 2px;
  }
  .customDownloadButton {
    border: none;
    color: black;
    background: none;
    //padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    display: flex;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
  }

  button {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    padding: 3px 6px;
    margin: 3px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 10px;
  }
  button:hover {
    filter: invert(1);
  }
`;

export default DownloadControls;
