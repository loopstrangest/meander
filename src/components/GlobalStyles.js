import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Europa', sans-serif;
    //overflow: hidden;
}

body {
  background-color: #242424;
}

//input sliders
input[type=range] {
  -webkit-appearance: none;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: white;
  border: 1px solid black;
}
input[type=range]::-webkit-slider-thumb {
  border: 2px solid black;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -14px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: white;
}
input[type=range]::-moz-range-track {
  width: 100%;
  cursor: pointer;
  background: white;
  border-radius: 1.3px;
  border: 1px solid black;
}
input[type=range]::-moz-range-thumb {
  border: 2px solid black;
  width: 16px;
  border-radius: 3px;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
}

`;

export default GlobalStyles;
