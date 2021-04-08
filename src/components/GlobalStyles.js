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
  height: 8px;
  cursor: pointer;
  background: white;
  border-radius: 10px;
  border: 1px solid black;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: white;
  border-radius: 10px;
  border: 1px solid black;
}

input[type=range]::-ms-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: white;
  border-radius: 10px;
  border: 1px solid black;
}

input[type=range]::-webkit-slider-thumb {
  border: 2px solid black;
  background-color: white;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5px;
}

input[type=range]::-moz-range-thumb {
  border: 2px solid black;
  background-color: white;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  cursor: pointer;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: white;
}


`;

export default GlobalStyles;
