if (!("ondeviceorientation" in window)) {
  alert("Device orientation is not supported.");
}

const externalSvg = document.getElementById("external-svg");

function updatePositionFallback(event) {
  const alpha = event.rotationRate.alpha
  const beta = event.rotationRate.beta

  updateSvgPosition(alpha, beta);
}

function updatePosition(event) {
  updateSvgPosition(event.gamma, event.beta);
}

function updateSvgPosition(gamma, beta) {
  const parallaxFactor = 0.5;
  const x = map(gamma, -180, 180, -50 * parallaxFactor, 50 * parallaxFactor);
  const y = map(beta, -90, 90, -50 * parallaxFactor, 50 * parallaxFactor);

  externalSvg.setAttribute("x", 10 + x);
  externalSvg.setAttribute("y", 10 + y);
}

function map(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
  window.addEventListener("deviceorientation", updatePosition);
} else {
  window.addEventListener("devicemotion", updatePositionFallback);
  updatePositionFallback();
}