/*! Grained.js
 * Author : Sarath Saleem  - https://github.com/sarathsaleem
 * MIT license: http://opensource.org/licenses/MIT
 * GitHub : https://github.com/sarathsaleem/grained
 * v0.0.1
 */
export const createGrain = function () {
  const grained = (ele, opt) => {
    var element = null,
      selectorElement = null;

    if (typeof ele === "string") {
      element = document.getElementById(ele.split("#")[1]);
    }

    if (!element) {
      element = document.getElementsByClassName(ele)[0];
    }

    if (!element) {
      console.error("Grained: cannot find the element: " + ele);
      return;
    }

    //set style for parent
    /*
    if (element.style.position !== "absolute") {
      element.style.position = "relative";
    }
    element.style.overflow = "hidden";
    */

    //var prefixes = ["", "-moz-", "-o-animation-", "-webkit-", "-ms-"];

    //default option values
    var options = opt;
    /*
    var options = {
      animate: true,
      patternWidth: 100,
      patternHeight: 100,
      grainOpacity: 0.1,
      grainDensity: 1,
      grainWidth: 1,
      grainHeight: 1,
      grainChaos: 0.5,
      grainSpeed: 20,
    };

    Object.keys(opt).forEach(function (key) {
      options[key] = opt[key];
    });
    */

    var generateNoise = function () {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      canvas.width = options.patternWidth;
      canvas.height = options.patternHeight;
      for (var w = 0; w < options.patternWidth; w += options.grainDensity) {
        for (var h = 0; h < options.patternHeight; h += options.grainDensity) {
          var rgb = (Math.random() * 256) | 0;
          ctx.fillStyle =
            "rgb(" + [rgb, rgb, rgb, options.grainOpacity].join() + ")";
          ctx.fillRect(w, h, options.grainWidth, options.grainHeight);
        }
      }
      return canvas.toDataURL("image/png");
    };

    function addCSSRule(sheet, selector, rules, index) {
      var ins = "";
      if (selector.length) {
        ins = selector + "{" + rules + "}";
      } else {
        ins = rules;
      }

      sheet.insertRule(ins, index);
    }

    var noise = generateNoise();

    /*
    if (options.animate) {
      var animation = "",
        keyFrames = [
          "0%:-10%,10%",
          "10%:-25%,0%",
          "20%:-30%,10%",
          "30%:-30%,30%",
          "40%::-20%,20%",
          "50%:-15%,10%",
          "60%:-20%,20%",
          "70%:-5%,20%",
          "80%:-25%,5%",
          "90%:-30%,25%",
          "100%:-10%,10%",
        ];

      var pre = prefixes.length;
      while (pre--) {
        animation += "@" + prefixes[pre] + "keyframes grained{";
        for (var key = 0; key < keyFrames.length; key++) {
          var keyVal = keyFrames[key].split(":");
          animation += keyVal[0] + "{";
          animation +=
            prefixes[pre] + "transform:translate(" + keyVal[1] + ");";
          animation += "}";
        }
        animation += "}";
      }

      //add animation keyframe
      var animationAdded = document.getElementById("grained-animation");
      if (animationAdded) {
        animationAdded.parentElement.removeChild(animationAdded);
      }
      var style = document.createElement("style");
      style.type = "text/css";
      style.id = "grained-animation";
      style.innerHTML = animation;
      document.body.appendChild(style);

      //add custimozed style
      var styleAdded = document.getElementById("grained-animation-" + ele);
      if (styleAdded) {
        styleAdded.parentElement.removeChild(styleAdded);
      }

      style = document.createElement("style");
      style.type = "text/css";
      style.id = "grained-animation-" + ele;
      document.body.appendChild(style);
    } */

    var bgRule = "background-image: url(" + noise + ");";
    /*
    var rule =
      'position: absolute;content: "";height: 100%;width: 100%;left: 0%;top: 0%;z-index: 1';
    if (options.animate) {
      while (pre--) {
        rule += prefixes[pre] + "animation-name:grained;";
        rule += prefixes[pre] + "animation-iteration-count: infinite;";
        rule +=
          prefixes[pre] + "animation-duration: " + options.grainChaos + "s;";
        rule +=
          prefixes[pre] +
          "animation-timing-function: steps(" +
          options.grainSpeed +
          ", end);";
      }
    }
    */

    selectorElement = "." + ele;
    var styleSheet = document.getElementsByClassName("grainStylesheet")[0];
    if (!styleSheet) {
      //Add initial stylesheet
      var style = document.createElement("style");
      style.type = "text/css";
      style.className = "grainStylesheet";
      document.body.appendChild(style);
      addCSSRule(style.sheet, selectorElement, bgRule);
    } else {
      //Update stylesheet
      styleSheet.sheet.cssRules[0].style.backgroundImage = "url(" + noise + ")";
    }
  };

  return { grained };

  //window.grained = grained;
  //END
};
