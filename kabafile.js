const kaba = require("kaba");

const js = kaba.shelf.js({
    input: "assets/js/",
    output: "../../preview/web/public/js"
});
const scss = kaba.shelf.scss({
    input: "assets/scss/",
    output: "../../preview/web/public/css"
});

kaba.task("scss", scss);
kaba.task("js", js);

kaba.task("", kaba.parallel(scss, js));
kaba.task("release", kaba.parallel(""));
