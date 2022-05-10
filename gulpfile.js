const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssValidator = require(`gulp-stylelint`),
    cssCompressor = require(`gulp-clean-css`),
    jsValidator = require(`gulp-eslint`),
    jsCompressor = require(`gulp-uglify`),
    babel = require(`gulp-babel`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let validateHTML = () => {
    return src(`*.html`)
        .pipe(htmlValidator(undefined));
};

let compressHTML = () => {
    return src(`*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let validateCSS = () => {
    return src(`css/*.css`)
    .pipe(cssValidator({
        failAfterError: false,
        reporters: [
          {formatter: `string`, console: true}
        ]
}));
};

let compressCSS = () => {
   return src(`css/*.css`)
    .pipe(cssCompressor({compatibility: `ie8`}))
    .pipe(dest(`prod/css`));
};

let validateJS = () => {
    return src(`js/*.js`)
        .pipe(jsValidator())
        .pipe(jsValidator.formatEach(`compact`));
};

let transpileJSForDev = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`dev/js`));
};

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let moveImgForProd = () => {
    return src(`img/*.png`)
    .pipe(dest(`prod/img`))
};

let moveSvgForProd = () => {
    return src(`img/*.svg`)
    .pipe(dest(`prod/img`))
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
        }
    });
 watch(`*.html`, validateHTML).on(`change`, reload);
 watch(`css/*.css`, validateCSS).on(`change`, reload);
 watch(`js/*.js`, series(validateJS, transpileJSForDev)).on(`change`, reload);
};

let browserChoice = `default`;

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.validateCSS = validateCSS;
exports.compressCSS = compressCSS;
exports.validateJS = validateJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;

exports.serve = series(
    validateHTML,
    validateCSS,
    validateJS,
    transpileJSForDev,
    serve
);

exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd,
    moveImgForProd,
    moveSvgForProd
);

