const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

const fsPromises = fs.promises;

// Const
const NODE_MODULES = path.normalize(`${__dirname}/../node_modules`);
const SRC_DIR = path.normalize(`${__dirname}/../src`);
const OUTPUT_DIR = path.normalize(`${__dirname}/../build`);
const STYLESHEET = `${SRC_DIR}/scss/app.scss`;
const ASSETS_DIR = `${OUTPUT_DIR}/assets`;
const QSS_FILE = `${OUTPUT_DIR}/styles.qss`;

// Get sources
const fontsDir = NODE_MODULES + '/@ibm/plex';
const fonts = [
  fontsDir + '/IBM-Plex-Sans/fonts/complete/ttf/IBMPlexSans-Regular.ttf',
  fontsDir + '/IBM-Plex-Sans/fonts/complete/ttf/IBMPlexSans-Italic.ttf',
  fontsDir + '/IBM-Plex-Mono/fonts/complete/ttf/IBMPlexMono-Regular.ttf',
  fontsDir + '/IBM-Plex-Mono/fonts/complete/ttf/IBMPlexMono-Bold.ttf',
];

const svgsDir = NODE_MODULES + '/@carbon/icons/svg';
const svgs = [
  svgsDir + '/16/chevron--down.svg',
  svgsDir + '/16/chevron--up.svg',
  svgsDir + '/16/close.svg',
  svgsDir + '/16/apps.svg',
];

// helper fn to pretty print progress
const logDone = (stage, file) => {
  console.log(`✓ ${path.basename(file)} (${stage})`);
};

// Build directories that don't exist
const dirs = [OUTPUT_DIR, ASSETS_DIR, `${ASSETS_DIR}/fonts`, `${ASSETS_DIR}/svg`];
dirs.forEach((dir) => {
  !fs.existsSync(dir) && fs.mkdirSync(dir);
});

// Copy Carbon Fonts over to assets
fonts.forEach((font) => {
  const source = font;
  const asset = font.split('/').pop();
  const destination = `${ASSETS_DIR}/fonts/${asset}`;

  fs.copyFile(source, destination, (err) => {
    if (err) throw err;
    logDone('fonts', destination);
  });
});

// Copy Carbon SVG Icons over to assets
svgs.forEach((svg) => {
  const source = svg;
  const asset = svg.split('/').pop();
  const destination = `${ASSETS_DIR}/svg/${asset}`;

  fs.copyFile(source, destination, (err) => {
    if (err) throw err;
    logDone('svg', destination);
  });
});

// Render styles to qss
sass.render({ file: STYLESHEET, includePaths: [NODE_MODULES] }, (renderError, result) => {
  if (renderError) throw renderError;

  async function build() {
    await fsPromises.writeFile(QSS_FILE, result.css);
    logDone('style', QSS_FILE);
    const uiData = await fsPromises.readFile(`${SRC_DIR}/demo.ui`, { encoding: 'utf8' });
    await fsPromises.writeFile(`${OUTPUT_DIR}/demo.ui`, uiData.replace('/* QSS */', result.css));
    logDone('ui', `${OUTPUT_DIR}/demo.ui`);
    const qrcData = await fsPromises.readFile(`${SRC_DIR}/demo.qrc`, { encoding: 'utf8' });
    await fsPromises.writeFile(`${OUTPUT_DIR}/demo.qrc`, qrcData.replace(/\.\.\/build\//g, ''));
    logDone('qrc', `${OUTPUT_DIR}/demo.qrc`);
  }

  build().catch((e) => console.log(e));
});
