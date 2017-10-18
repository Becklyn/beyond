const kaba = require("kaba");

const js = kaba.shelf.js({
    input: "src/js/",
    output: "../../dist/js"
});
const scss = kaba.shelf.scss({
    input: "src/scss/",
    output: "../../dist/css"
});

kaba.task("scss", scss);
kaba.task("js", js);

kaba.task("", kaba.parallel(scss, js));
kaba.task("release", kaba.parallel(""));
