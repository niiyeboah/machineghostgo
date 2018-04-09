import WebFont from "webfontloader";

export default (font, async = false) => {
  WebFont.load({ google: { families: [font] } });
  document.querySelector("body").style.fontFamily = `
    ${font ? font + "," : ""} BlinkMacSystemFont, -apple-system, 
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", 
    "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif
  `;
};
