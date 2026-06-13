/* ============================================================
   Chancetop Pixel — Main Script
   Engineer: Cyril
   ============================================================ */

(function() {
  'use strict';

  const SITE_URL = '/chancetop-pixel/';
  const PAGES = {
    'index':   { title: '首页', path: 'index.html' },
    'about':   { title: '关于我们', path: 'about.html' },
    'services':{ title: '技术能力', path: 'services.html' },
    'cases':   { title: '客户案例', path: 'cases.html' },
    'join':    { title: '加入我们', path: 'join.html' },
    'contact': { title: '联系我们', path: 'contact.html' }
  };

  /* ----- Current Page Detection ----- */
  const path = window.location.pathname;
  let currentPage = 'index';
  for (const [key, page] of Object.entries(PAGES)) {
    if (path.endsWith(page.path) || path.endsWith(page.path.replace('.html', ''))) {
      currentPage = key;
      break;
    }
  }

  /* ----- Shared Nav HTML ----- */
  function getNavHTML() {
    let links = '';
    for (const [key, page] of Object.entries(PAGES)) {
      const active = key === currentPage ? ' class="active"' : '';
      const href = key === 'index' ? 'index.html' : page.path;
      links += `<a href="${href}"${active}>${page.title}</a>`;
    }

    return `
      <div class="nav-bar">
        <div class="nav-inner">
          <a href="index.html" class="nav-logo">
            <svg width="93" height="24" viewBox="0 0 93 24" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#logoClip)">
                <path d="M22.4501 6.58431L23.7877 7.55645C24.7737 8.27348 25.1874 9.54209 24.8082 10.7004L21.9744 19.422H12.5902L11.4457 15.9058H19.3474H19.4163L22.4501 6.58431ZM17.4167 7.27377L14.9552 14.8509H18.6578L21.5538 5.92933L14.1278 0.537776C13.1418 -0.179259 11.8042 -0.179259 10.8182 0.537776L9.48058 1.50991L17.4167 7.27377ZM21.1194 22.0557L21.6296 20.4838H11.8249L11.7766 20.3321L9.36337 12.9066L6.37093 15.0784L9.26683 24H18.4441C19.6645 24 20.747 23.214 21.1194 22.0557ZM5.12982 14.6716L5.1643 14.651L11.5767 9.99023L8.58423 7.81844L0.992814 13.3341L3.82667 22.0557C4.20589 23.214 5.28152 24 6.50193 24H8.15674L7.01216 20.4838L5.12982 14.6716ZM8.58423 6.50847L15.0311 11.1899L16.1756 7.67366L8.58423 2.158L1.15829 7.55645C0.172307 8.27348 -0.241394 9.54209 0.137832 10.7004L0.648063 12.2723L8.58423 6.50847Z" class="logo-icon"/>
                <path d="M65.9164 8.08733V6.38438L66.006 6.37748C66.2404 6.3568 66.4886 6.32232 66.7507 6.28096C67.0127 6.23959 67.254 6.19822 67.4677 6.15685C67.6815 6.12238 67.8608 6.08101 68.0055 6.04654C68.0676 6.03275 68.1159 6.01896 68.1503 6.01207L67.9021 4.9572C67.8056 4.97788 67.6815 4.99857 67.5298 5.03304C67.3298 5.07441 67.1092 5.11577 66.8748 5.15714C66.6403 5.19851 66.399 5.23298 66.1715 5.26056C65.937 5.28814 65.7302 5.30193 65.5578 5.30193H62.6688V6.39816H64.8269V8.09423H62.4413V9.19047H63.3997H64.4891H64.8269V9.28699V17.4364H65.9233V9.18357H68.2882V8.08733H65.9164Z" class="logo-text"/>
                <path d="M69.6879 10.004L69.0329 10.8934L71.8668 12.948L72.5011 12.0586L69.6879 10.004Z" class="logo-text"/>
                <path d="M71.8461 8.76989L72.5011 7.88739L69.6742 5.82591L69.0329 6.71531L71.8461 8.76989Z" class="logo-text"/>
                <path d="M83.478 11.4657L81.9197 12.0724V7.68744H83.6159V6.58431H81.9197V4.92272H80.8234V6.59121H78.9135V7.68744H80.8234V12.4861L78.617 13.3272L79.0031 14.3545L80.8441 13.6512L80.8234 15.9954C80.8234 16.1678 80.7131 16.2712 80.5338 16.2712H78.9135V17.3674H80.5476C80.9406 17.3674 81.2578 17.2364 81.5267 16.9744C81.7956 16.7055 81.9197 16.3884 81.9197 15.9954V13.2376L83.8641 12.4999L83.478 11.4657Z" class="logo-text"/>
                <path d="M87.9597 7.33582V9.36283H84.7122V10.4384H91.2418V10.6521V10.6797L91.228 10.7073C91.1039 10.8934 90.8281 11.2519 90.3937 11.769C89.9593 12.2861 89.3387 12.8791 88.5458 13.5203L88.4906 13.5616L88.4286 13.5271L85.312 11.5415L84.7329 12.4516L87.4288 14.1821L87.5529 14.2649L87.4288 14.3476C86.9048 14.6923 86.3256 15.044 85.6982 15.3818C85.0983 15.7058 84.4226 16.023 83.6986 16.3263L84.1123 17.3398C84.9949 16.9744 85.8016 16.5814 86.5118 16.1816C87.2495 15.7679 87.9115 15.3473 88.4975 14.9405L88.5527 14.9061L88.6079 14.9405L92.4277 17.3536L93.0069 16.4436L89.5801 14.258L89.4697 14.189L89.5732 14.1063C90.0351 13.7202 90.4419 13.341 90.7798 12.9894C91.1177 12.6309 91.4003 12.3206 91.6141 12.0586C91.8278 11.7966 91.9933 11.5829 92.0968 11.4174C92.1381 11.3554 92.2553 11.1692 92.2691 11.1416L92.3381 11.0106V9.38351H89.056V7.35651H92.7794V6.24648H89.056V4.92272H87.9597V6.24648H84.2364V7.34272H87.9597V7.33582Z" class="logo-text"/>
                <path d="M74.6041 5.01924H73.5078V17.3605H74.6041V5.01924Z" class="logo-text"/>
                <path d="M34.282 6.73599H33.3788H33.2822V6.63258V4.92272H32.1859V6.63947V6.73599H32.0894H31.2413C30.476 6.73599 29.8554 7.3565 29.8554 8.1218V14.6096C29.8554 15.3749 30.476 15.9954 31.2413 15.9954H32.0894H32.1859V16.0919V17.4157H33.2822V16.0919V15.9954H33.3788H34.2407C34.5716 15.9954 34.8819 15.8989 35.1163 15.7196C35.3163 15.5679 35.468 15.3818 35.5576 15.1612L35.6197 14.9543C35.6472 14.8578 35.661 14.7406 35.661 14.6234V8.1218C35.6679 7.3565 35.0474 6.73599 34.282 6.73599ZM32.1859 11.6174V14.8026V14.8992H32.0894H31.2206C31.0689 14.8992 30.9448 14.7751 30.9448 14.6234V11.6174V11.5139H31.0414H32.0894H32.1859V11.6174ZM32.1859 7.92186V10.3212V10.4177H32.0894H31.0414H30.9448V10.3212V8.09422C30.9448 7.94254 31.0689 7.81844 31.2206 7.81844H32.0894H32.1859V7.92186ZM34.5716 11.6174V14.6234C34.5716 14.7751 34.4475 14.8992 34.2958 14.8992H33.3788H33.2822V14.8026V11.6174V11.5139H33.3788H34.4751H34.5716V11.6174ZM34.5716 10.3281V10.4246H34.4751H33.3788H33.2822V10.3281V7.92875V7.83223H33.3788H34.2958C34.4475 7.83223 34.5716 7.95633 34.5716 8.10801V10.3281Z" class="logo-text"/>
                <path d="M50.0509 11.3485L48.8098 11.8931V7.68055H50.2647V6.58431L48.8098 6.5981V4.92272H47.7135V6.58431L46.0794 6.5981V7.68055H47.7135V12.362L45.8312 13.1962L46.2587 14.1959L47.7066 13.5547V15.9885C47.7066 16.1402 47.5825 16.2643 47.4308 16.2643H46.1415V17.3605H47.4239C47.7549 17.3605 48.0652 17.2502 48.3065 17.0503C48.6443 16.7676 48.8098 16.4229 48.8098 15.9885V13.0859L50.4922 12.3482L50.0509 11.3485Z" class="logo-text"/>
                <path d="M51.2575 6.46021L53.5812 6.474L53.5536 6.59121C53.4846 6.87388 53.3881 7.24619 53.2502 7.68055C53.1123 8.1218 52.9192 8.6251 52.6779 9.16977C52.4297 9.71445 52.1263 10.3074 51.7678 10.921C51.423 11.5139 51.0093 12.1206 50.5336 12.7274L51.3817 13.4099C51.5402 13.2169 51.6919 13.0238 51.8298 12.8239C51.9884 12.5964 52.1401 12.3689 52.2987 12.1551L52.478 11.9V12.2103V16.0023C52.478 16.7676 53.0985 17.3881 53.8639 17.3881H58.3387C58.7731 17.3881 59.1179 17.2226 59.4006 16.8848C59.6005 16.6435 59.7108 16.3332 59.7108 16.0023V11.4588C59.7108 10.6935 59.0903 10.073 58.3249 10.073H53.6363H53.4846L53.5467 9.93507C53.8983 9.17667 54.1672 8.49411 54.3396 7.90807C54.512 7.32203 54.6361 6.86699 54.6982 6.55673L54.7119 6.48089H60.359V5.37776H51.2575V6.46021ZM53.5605 11.6449C53.5605 11.376 53.7811 11.1554 54.05 11.1554H58.1181C58.387 11.1554 58.6076 11.376 58.6076 11.6449V15.7955C58.6076 16.0643 58.387 16.285 58.1181 16.285H54.05C53.7811 16.285 53.5605 16.0643 53.5605 15.7955V11.6449Z" class="logo-text"/>
                <path d="M42.4112 9.10083H38.6121L43.3214 6.0948V4.99167H36.7229V6.08791H41.3011L36.6056 9.09394V10.1971H38.7845C38.7362 10.4797 38.6466 10.8589 38.5362 11.3278C38.4121 11.8242 38.2329 12.3758 38.0053 12.9756C37.7778 13.5754 37.4813 14.2166 37.1297 14.8647C36.7918 15.4921 36.3712 16.0919 35.8817 16.6573L36.6953 17.3743C37.2745 16.6986 37.764 15.9816 38.157 15.2439C38.5638 14.4786 38.8948 13.7409 39.143 13.0583C39.3912 12.3758 39.5774 11.7552 39.6877 11.2175C39.7774 10.7762 39.8463 10.4384 39.8946 10.1902H41.0874C41.0529 10.4591 40.9978 10.8038 40.9219 11.2175C40.8323 11.7208 40.6875 12.2861 40.4944 12.8928C40.3014 13.5065 40.0463 14.1614 39.736 14.8302C39.4326 15.4783 39.0534 16.1057 38.6052 16.6986L39.4602 17.3674C39.998 16.6573 40.4462 15.9127 40.7909 15.1543C41.1495 14.3614 41.439 13.6099 41.639 12.9066C41.8459 12.2103 41.9906 11.576 42.0665 11.0382C42.1148 10.6935 42.1561 10.4108 42.1837 10.1833H42.2044H42.3975C42.4733 10.1833 42.6181 10.2246 42.6664 10.3694H42.687V10.466V15.9747C42.687 16.1333 42.556 16.2712 42.3906 16.2712H40.7909V17.3674H42.4044C42.7974 17.3674 43.1145 17.2364 43.3834 16.9744C43.6523 16.7055 43.7765 16.3884 43.7765 15.9954V10.4729C43.7971 9.72134 43.1766 9.10083 42.4112 9.10083Z" class="logo-text"/>
                <path d="M67.7022 10.004H66.599V17.264H67.7022V10.004Z" class="logo-text"/>
                <path d="M63.0274 10.004V10.2384C63.0274 13.1135 62.8205 15.4094 62.4206 17.071L62.3999 17.1675L63.4686 17.4295L63.4893 17.333C63.9168 15.6576 64.1306 13.2652 64.1306 10.2384V10.004H63.0274Z" class="logo-text"/>
                <path d="M68.7941 14.3484V15.4446H76.6958V14.3484H68.7941Z" class="logo-text"/>
                <path d="M31.4344 19.36C32.1308 19.36 32.5376 19.6426 32.7169 20.1666C32.7582 20.2838 32.7306 20.339 32.6203 20.3804L32.3583 20.47C32.248 20.5045 32.1997 20.4907 32.1584 20.3666C32.0549 20.0701 31.8274 19.9253 31.4344 19.9253C30.9448 19.9253 30.6759 20.1666 30.6759 20.6148V21.6834C30.6759 22.1247 30.9448 22.3729 31.4344 22.3729C31.8343 22.3729 32.0549 22.2212 32.1584 21.9247C32.2066 21.8006 32.2549 21.7799 32.3652 21.8213L32.6203 21.9109C32.7306 21.9523 32.7651 22.0075 32.7238 22.1247C32.5445 22.6487 32.1308 22.9382 31.4344 22.9382C30.5656 22.9382 30.083 22.4556 30.083 21.6765V20.6148C30.083 19.8426 30.5656 19.36 31.4344 19.36Z" class="logo-text"/>
              </g>
              <defs>
                <clipPath id="logoClip">
                  <rect width="93" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </a>
          <div class="nav-links" id="navLinks">
            ${links}
          </div>
          <button class="nav-toggle" id="navToggle" aria-label="菜单">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;
  }

  /* ----- Shared Footer HTML ----- */
  function getFooterHTML() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="nav-logo">
                <svg width="93" height="24" viewBox="0 0 93 24" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#logoClipF)">
                    <path d="M22.4501 6.58431L23.7877 7.55645C24.7737 8.27348 25.1874 9.54209 24.8082 10.7004L21.9744 19.422H12.5902L11.4457 15.9058H19.3474H19.4163L22.4501 6.58431ZM17.4167 7.27377L14.9552 14.8509H18.6578L21.5538 5.92933L14.1278 0.537776C13.1418 -0.179259 11.8042 -0.179259 10.8182 0.537776L9.48058 1.50991L17.4167 7.27377ZM21.1194 22.0557L21.6296 20.4838H11.8249L11.7766 20.3321L9.36337 12.9066L6.37093 15.0784L9.26683 24H18.4441C19.6645 24 20.747 23.214 21.1194 22.0557ZM5.12982 14.6716L5.1643 14.651L11.5767 9.99023L8.58423 7.81844L0.992814 13.3341L3.82667 22.0557C4.20589 23.214 5.28152 24 6.50193 24H8.15674L7.01216 20.4838L5.12982 14.6716ZM8.58423 6.50847L15.0311 11.1899L16.1756 7.67366L8.58423 2.158L1.15829 7.55645C0.172307 8.27348 -0.241394 9.54209 0.137832 10.7004L0.648063 12.2723L8.58423 6.50847Z" class="logo-icon"/>
                    <path d="M65.9164 8.08733V6.38438L66.006 6.37748C66.2404 6.3568 66.4886 6.32232 66.7507 6.28096C67.0127 6.23959 67.254 6.19822 67.4677 6.15685C67.6815 6.12238 67.8608 6.08101 68.0055 6.04654C68.0676 6.03275 68.1159 6.01896 68.1503 6.01207L67.9021 4.9572C67.8056 4.97788 67.6815 4.99857 67.5298 5.03304C67.3298 5.07441 67.1092 5.11577 66.8748 5.15714C66.6403 5.19851 66.399 5.23298 66.1715 5.26056C65.937 5.28814 65.7302 5.30193 65.5578 5.30193H62.6688V6.39816H64.8269V8.09423H62.4413V9.19047H63.3997H64.4891H64.8269V9.28699V17.4364H65.9233V9.18357H68.2882V8.08733H65.9164Z" class="logo-text"/>
                    <path d="M69.6879 10.004L69.0329 10.8934L71.8668 12.948L72.5011 12.0586L69.6879 10.004Z" class="logo-text"/>
                    <path d="M71.8461 8.76989L72.5011 7.88739L69.6742 5.82591L69.0329 6.71531L71.8461 8.76989Z" class="logo-text"/>
                    <path d="M83.478 11.4657L81.9197 12.0724V7.68744H83.6159V6.58431H81.9197V4.92272H80.8234V6.59121H78.9135V7.68744H80.8234V12.4861L78.617 13.3272L79.0031 14.3545L80.8441 13.6512L80.8234 15.9954C80.8234 16.1678 80.7131 16.2712 80.5338 16.2712H78.9135V17.3674H80.5476C80.9406 17.3674 81.2578 17.2364 81.5267 16.9744C81.7956 16.7055 81.9197 16.3884 81.9197 15.9954V13.2376L83.8641 12.4999L83.478 11.4657Z" class="logo-text"/>
                    <path d="M87.9597 7.33582V9.36283H84.7122V10.4384H91.2418V10.6521V10.6797L91.228 10.7073C91.1039 10.8934 90.8281 11.2519 90.3937 11.769C89.9593 12.2861 89.3387 12.8791 88.5458 13.5203L88.4906 13.5616L88.4286 13.5271L85.312 11.5415L84.7329 12.4516L87.4288 14.1821L87.5529 14.2649L87.4288 14.3476C86.9048 14.6923 86.3256 15.044 85.6982 15.3818C85.0983 15.7058 84.4226 16.023 83.6986 16.3263L84.1123 17.3398C84.9949 16.9744 85.8016 16.5814 86.5118 16.1816C87.2495 15.7679 87.9115 15.3473 88.4975 14.9405L88.5527 14.9061L88.6079 14.9405L92.4277 17.3536L93.0069 16.4436L89.5801 14.258L89.4697 14.189L89.5732 14.1063C90.0351 13.7202 90.4419 13.341 90.7798 12.9894C91.1177 12.6309 91.4003 12.3206 91.6141 12.0586C91.8278 11.7966 91.9933 11.5829 92.0968 11.4174C92.1381 11.3554 92.2553 11.1692 92.2691 11.1416L92.3381 11.0106V9.38351H89.056V7.35651H92.7794V6.24648H89.056V4.92272H87.9597V6.24648H84.2364V7.34272H87.9597V7.33582Z" class="logo-text"/>
                    <path d="M74.6041 5.01924H73.5078V17.3605H74.6041V5.01924Z" class="logo-text"/>
                    <path d="M34.282 6.73599H33.3788H33.2822V6.63258V4.92272H32.1859V6.63947V6.73599H32.0894H31.2413C30.476 6.73599 29.8554 7.3565 29.8554 8.1218V14.6096C29.8554 15.3749 30.476 15.9954 31.2413 15.9954H32.0894H32.1859V16.0919V17.4157H33.2822V16.0919V15.9954H33.3788H34.2407C34.5716 15.9954 34.8819 15.8989 35.1163 15.7196C35.3163 15.5679 35.468 15.3818 35.5576 15.1612L35.6197 14.9543C35.6472 14.8578 35.661 14.7406 35.661 14.6234V8.1218C35.6679 7.3565 35.0474 6.73599 34.282 6.73599ZM32.1859 11.6174V14.8026V14.8992H32.0894H31.2206C31.0689 14.8992 30.9448 14.7751 30.9448 14.6234V11.6174V11.5139H31.0414H32.0894H32.1859V11.6174ZM32.1859 7.92186V10.3212V10.4177H32.0894H31.0414H30.9448V10.3212V8.09422C30.9448 7.94254 31.0689 7.81844 31.2206 7.81844H32.0894H32.1859V7.92186ZM34.5716 11.6174V14.6234C34.5716 14.7751 34.4475 14.8992 34.2958 14.8992H33.3788H33.2822V14.8026V11.6174V11.5139H33.3788H34.4751H34.5716V11.6174ZM34.5716 10.3281V10.4246H34.4751H33.3788H33.2822V10.3281V7.92875V7.83223H33.3788H34.2958C34.4475 7.83223 34.5716 7.95633 34.5716 8.10801V10.3281Z" class="logo-text"/>
                    <path d="M50.0509 11.3485L48.8098 11.8931V7.68055H50.2647V6.58431L48.8098 6.5981V4.92272H47.7135V6.58431L46.0794 6.5981V7.68055H47.7135V12.362L45.8312 13.1962L46.2587 14.1959L47.7066 13.5547V15.9885C47.7066 16.1402 47.5825 16.2643 47.4308 16.2643H46.1415V17.3605H47.4239C47.7549 17.3605 48.0652 17.2502 48.3065 17.0503C48.6443 16.7676 48.8098 16.4229 48.8098 15.9885V13.0859L50.4922 12.3482L50.0509 11.3485Z" class="logo-text"/>
                    <path d="M51.2575 6.46021L53.5812 6.474L53.5536 6.59121C53.4846 6.87388 53.3881 7.24619 53.2502 7.68055C53.1123 8.1218 52.9192 8.6251 52.6779 9.16977C52.4297 9.71445 52.1263 10.3074 51.7678 10.921C51.423 11.5139 51.0093 12.1206 50.5336 12.7274L51.3817 13.4099C51.5402 13.2169 51.6919 13.0238 51.8298 12.8239C51.9884 12.5964 52.1401 12.3689 52.2987 12.1551L52.478 11.9V12.2103V16.0023C52.478 16.7676 53.0985 17.3881 53.8639 17.3881H58.3387C58.7731 17.3881 59.1179 17.2226 59.4006 16.8848C59.6005 16.6435 59.7108 16.3332 59.7108 16.0023V11.4588C59.7108 10.6935 59.0903 10.073 58.3249 10.073H53.6363H53.4846L53.5467 9.93507C53.8983 9.17667 54.1672 8.49411 54.3396 7.90807C54.512 7.32203 54.6361 6.86699 54.6982 6.55673L54.7119 6.48089H60.359V5.37776H51.2575V6.46021ZM53.5605 11.6449C53.5605 11.376 53.7811 11.1554 54.05 11.1554H58.1181C58.387 11.1554 58.6076 11.376 58.6076 11.6449V15.7955C58.6076 16.0643 58.387 16.285 58.1181 16.285H54.05C53.7811 16.285 53.5605 16.0643 53.5605 15.7955V11.6449Z" class="logo-text"/>
                    <path d="M42.4112 9.10083H38.6121L43.3214 6.0948V4.99167H36.7229V6.08791H41.3011L36.6056 9.09394V10.1971H38.7845C38.7362 10.4797 38.6466 10.8589 38.5362 11.3278C38.4121 11.8242 38.2329 12.3758 38.0053 12.9756C37.7778 13.5754 37.4813 14.2166 37.1297 14.8647C36.7918 15.4921 36.3712 16.0919 35.8817 16.6573L36.6953 17.3743C37.2745 16.6986 37.764 15.9816 38.157 15.2439C38.5638 14.4786 38.8948 13.7409 39.143 13.0583C39.3912 12.3758 39.5774 11.7552 39.6877 11.2175C39.7774 10.7762 39.8463 10.4384 39.8946 10.1902H41.0874C41.0529 10.4591 40.9978 10.8038 40.9219 11.2175C40.8323 11.7208 40.6875 12.2861 40.4944 12.8928C40.3014 13.5065 40.0463 14.1614 39.736 14.8302C39.4326 15.4783 39.0534 16.1057 38.6052 16.6986L39.4602 17.3674C39.998 16.6573 40.4462 15.9127 40.7909 15.1543C41.1495 14.3614 41.439 13.6099 41.639 12.9066C41.8459 12.2103 41.9906 11.576 42.0665 11.0382C42.1148 10.6935 42.1561 10.4108 42.1837 10.1833H42.2044H42.3975C42.4733 10.1833 42.6181 10.2246 42.6664 10.3694H42.687V10.466V15.9747C42.687 16.1333 42.556 16.2712 42.3906 16.2712H40.7909V17.3674H42.4044C42.7974 17.3674 43.1145 17.2364 43.3834 16.9744C43.6523 16.7055 43.7765 16.3884 43.7765 15.9954V10.4729C43.7971 9.72134 43.1766 9.10083 42.4112 9.10083Z" class="logo-text"/>
                    <path d="M67.7022 10.004H66.599V17.264H67.7022V10.004Z" class="logo-text"/>
                    <path d="M63.0274 10.004V10.2384C63.0274 13.1135 62.8205 15.4094 62.4206 17.071L62.3999 17.1675L63.4686 17.4295L63.4893 17.333C63.9168 15.6576 64.1306 13.2652 64.1306 10.2384V10.004H63.0274Z" class="logo-text"/>
                    <path d="M68.7941 14.3484V15.4446H76.6958V14.3484H68.7941Z" class="logo-text"/>
                    <path d="M31.4344 19.36C32.1308 19.36 32.5376 19.6426 32.7169 20.1666C32.7582 20.2838 32.7306 20.339 32.6203 20.3804L32.3583 20.47C32.248 20.5045 32.1997 20.4907 32.1584 20.3666C32.0549 20.0701 31.8274 19.9253 31.4344 19.9253C30.9448 19.9253 30.6759 20.1666 30.6759 20.6148V21.6834C30.6759 22.1247 30.9448 22.3729 31.4344 22.3729C31.8343 22.3729 32.0549 22.2212 32.1584 21.9247C32.2066 21.8006 32.2549 21.7799 32.3652 21.8213L32.6203 21.9109C32.7306 21.9523 32.7651 22.0075 32.7238 22.1247C32.5445 22.6487 32.1308 22.9382 31.4344 22.9382C30.5656 22.9382 30.083 22.4556 30.083 21.6765V20.6148C30.083 19.8426 30.5656 19.36 31.4344 19.36Z" class="logo-text"/>
                  </g>
                  <defs>
                    <clipPath id="logoClipF">
                      <rect width="93" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <p>技术改变商业 — 厦门畅拓科技，为全球电商企业提供一站式数字化技术解决方案。</p>
            </div>
            <div class="footer-col">
              <h4>导航</h4>
              <a href="index.html">首页</a>
              <a href="about.html">关于我们</a>
              <a href="services.html">技术能力</a>
              <a href="cases.html">客户案例</a>
              <a href="join.html">加入我们</a>
              <a href="contact.html">联系我们</a>
            </div>
            <div class="footer-col">
              <h4>服务</h4>
              <a href="services.html">电商解决方案</a>
              <a href="services.html">技术架构</a>
              <a href="services.html">项目管理</a>
              <a href="services.html">技术咨询</a>
            </div>
            <div class="footer-col">
              <h4>联系</h4>
              <a href="mailto:hr@chancetop.com">hr@chancetop.com</a>
              <a href="contact.html">厦门软件园二期</a>
            </div>
          </div>
          <div class="footer-bottom">
            <span>&copy; ${new Date().getFullYear()} Chancetop. All rights reserved.</span>
            <span>闽ICP备XXXXXXXX号</span>
          </div>
        </div>
      </footer>
    `;
  }

  /* ----- Inject Nav & Footer ----- */
  function injectComponents() {
    const navContainer = document.getElementById('nav-container');
    const footerContainer = document.getElementById('footer-container');
    if (navContainer) navContainer.innerHTML = getNavHTML();
    if (footerContainer) footerContainer.innerHTML = getFooterHTML();
  }

  /* ----- Mobile Nav Toggle ----- */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      links.classList.toggle('open');
    });

    // Close menu on link click
    links.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        links.classList.remove('open');
      });
    });

    // Close on click outside
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
      }
    });

    // Reset on resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        links.classList.remove('open');
      }
    });
  }

  /* ----- Scroll Animation (Fade In) ----- */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      elements.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      elements.forEach(function(el) {
        el.classList.add('visible');
      });
    }
  }

  /* ----- Contact Form Handling ----- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const formView = document.getElementById('formView');
    const loadingView = document.getElementById('formLoading');
    const successView = document.getElementById('formSuccess');
    const errorView = document.getElementById('formError');
    const retryBtn = document.getElementById('formRetry');

    // Formspree endpoint (placeholder — replace with actual endpoint)
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

    function showView(viewToShow) {
      [formView, loadingView, successView, errorView].forEach(function(v) {
        if (v) v.style.display = 'none';
      });
      if (viewToShow) viewToShow.style.display = 'block';
    }

    function validateField(input) {
      const errorEl = input.nextElementSibling;
      if (!input.value.trim()) {
        input.classList.add('error');
        if (errorEl && errorEl.classList.contains('form-error')) {
          errorEl.textContent = '请填写此项';
        }
        return false;
      }
      if (input.type === 'email' && input.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(input.value.trim())) {
          input.classList.add('error');
          if (errorEl && errorEl.classList.contains('form-error')) {
            errorEl.textContent = '邮箱格式不正确';
          }
          return false;
        }
      }
      input.classList.remove('error');
      return true;
    }

    // Real-time validation on blur
    form.querySelectorAll('.form-input').forEach(function(input) {
      input.addEventListener('blur', function() {
        if (input.hasAttribute('required')) {
          validateField(input);
        }
      });
      input.addEventListener('input', function() {
        input.classList.remove('error');
      });
    });

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Validate all required fields
      let valid = true;
      form.querySelectorAll('.form-input[required]').forEach(function(input) {
        if (!validateField(input)) valid = false;
      });

      if (!valid) return;

      // Show loading
      showView(loadingView);

      const formData = new FormData(form);
      const data = {};
      formData.forEach(function(value, key) { data[key] = value; });

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showView(successView);
        } else {
          showView(errorView);
        }
      } catch (err) {
        showView(errorView);
      }
    });

    // Retry button
    if (retryBtn) {
      retryBtn.addEventListener('click', function() {
        showView(formView);
      });
    }
  }

  /* ----- Pixel Grid Animation (Hero) ----- */
  function initPixelGrid() {
    const grid = document.getElementById('pixelGrid');
    if (!grid) return;

    const cells = grid.querySelectorAll('.pixel-cell');
    if (!cells.length) return;

    function activateRandom() {
      // Deactivate all
      cells.forEach(function(c) { c.classList.remove('active'); });
      // Activate random cells
      const count = Math.floor(Math.random() * 8) + 4;
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * cells.length);
        cells[idx].classList.add('active');
      }
    }

    activateRandom();
    setInterval(activateRandom, 2000);
  }

  /* ============================================================
     Bootstrap
     ============================================================ */
  function init() {
    injectComponents();

    // Wait a tick for DOM to update, then init interactivity
    setTimeout(function() {
      initMobileNav();
      initScrollAnimations();
      initContactForm();
      initPixelGrid();

      // Handle hash anchors (smooth scroll for same-page anchors)
      document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href === '#') return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
