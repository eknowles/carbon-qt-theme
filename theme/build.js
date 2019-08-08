const sass = require('node-sass');
const fs = require('fs');

sass.render({ file: './src/root.scss' }, (renderError, result) => {
  if (!renderError) {
    // No errors during the compilation, write this result on the disk
    fs.writeFile('../qt/src/main/resources/base/styles.qss', result.css, writeErr => {
      if (writeErr) {
        console.log(writeErr);
        return;
      }

      console.log('done');
    });
  }
});
