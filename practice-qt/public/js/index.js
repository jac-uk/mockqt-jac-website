var iframe_id = "example";
var updateIframeHeight = "true";
var hide_page_until_loaded_external = "true";
var scroll_to_top = "#totop";
var usePostMessage = true;
var jquery_path = "./js/jquery.js";
// var debugPostMessage = true;
var resize_on_element_resize = "body";
var resize_on_element_resize_delay = 0;
var enable_responsive_iframe = "true";

loadScript(jquery_path)
  .then(() => {
    if (typeof window.jQuery !== 'function') {
      throw new Error(`Failed to initialise jQuery from ${jquery_path}`);
    }
    return loadScript("./js/ai_external.js");
  })
  .catch(error => console.error(error));
loadScript("./govuk-frontend/govuk-frontend-4.0.0.min.js")
  .catch(error => console.error(error));

function loadScript(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function updateScoreHTML() {
  let score = getUrlParameter('score');
  score = score ? score : 0;
  document.querySelector('.score').innerHTML = score;
}

// format: hh:mm:ss
function getDiffTimeString(diff) {
  // time calculations for hours, minutes and seconds
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.round((diff % (1000 * 60)) / 1000);
  hours = (hours.toString().length === 1) ? ('0' + hours) : hours;
  minutes = (minutes.toString().length === 1) ? ('0' + minutes) : minutes;
  seconds = (seconds.toString().length === 1) ? ('0' + seconds) : seconds;
  return `${hours}:${minutes}:${seconds}`;
}

function backToTop() {
  document.querySelector('.anchor').scrollIntoView({ block: "start" });
}

backToTop();
