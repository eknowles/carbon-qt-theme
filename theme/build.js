const sass = require('node-sass');
const fs = require('fs');

console.log(sass.info);

sass.render({
  file: './src/root.scss', includePaths: [
    '../node_modules'
  ]
}, (renderError, result) => {
  if (renderError) {
    throw new Error(renderError.formatted);
  }

  fs.writeFile('../qt/src/main/resources/base/styles.qss', result.css, writeErr => {
    if (writeErr) {
      console.error(writeErr);
      throw new Error(writeErr);
    }
  });
});
