import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

a {
  text-decoration: none;
  underline:none;
}

div {
   box-sizing: border-box;
}

@font-face {
font-family: "Pretendard";
font-weight: 900;
font-display: swap;
src: local("Pretendard Black"),
    url("../../public/fonts/woff2-subset/Pretendard-Black.subset.woff2") format("woff2"),
    url("../../public/fonts/woff-subset/Pretendard-Black.subset.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 800;
  font-display: swap;
  src: local("Pretendard ExtraBold"),
    url("../../public/fonts/woff2-subset/Pretendard-ExtraBold.subset.woff2") format("woff2"),
    url("../../public/fonts/woff-subset/Pretendard-ExtraBold.subset.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 700;
  font-display: swap;
  src: local("Pretendard Bold"),
    url("../../public/fonts/woff2-subset/Pretendard-Bold.subset.woff2") format("woff2"),
    url("../../public/fonts/woff-subset/Pretendard-Bold.subset.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 600;
  font-display: swap;
  src: local("Pretendard SemiBold"),
    url("../../public/fonts/woff2-subset/Pretendard-SemiBold.subset.woff2") format("woff2"),
    url("../../public/fonts/woff-subset/Pretendard-SemiBold.subset.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 500;
  font-display: swap;
  src: local("Pretendard Medium"),
    url("../../public/fonts/woff2-subset/Pretendard-Medium.subset.woff2") format("woff2"),
    url("../../public/fonts/woff-subset/Pretendard-Medium.subset.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 400;
  font-display: swap;
  src: local("Pretendard Regular"),
    url("../../public/fonts/woff2-subset/Pretendard-Regular.subset.woff2") format("woff2"),
    url("../../public/fonts/woff-subset/Pretendard-Regular.subset.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 300;
  font-display: swap;
  src: local("Pretendard Light"),
    url("../../public/fonts/woff2-subset/Pretendard-Light.subset.woff2") format("woff2"),
    url("../../public/fonts/woff-subset/Pretendard-Light.subset.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 200;
  font-display: swap;
  src: local("Pretendard ExtraLight"),
    url("../../public/fonts/woff2-subset/Pretendard-ExtraLight.subset.woff2") format("woff2"),
    url("../../public/fonts/woff-subset/Pretendard-ExtraLight.subset.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 100;
  font-display: swap;
  src: local("Pretendard Thin"),
    url("../../public/fonts/woff2-subset/Pretendard-Thin.subset.woff2") format("woff2"),
    url("../../public/fonts/woff-subset/Pretendard-Thin.subset.woff") format("woff");
}

html, body {
    font-family: "Pretendard", sans-serif;
}


:root {
  --app-height: 100%;
}

html,
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  height: var(--app-height);
}
`;
