import PageTree from "./beyond/page-tree";

$(".page-tree").each((index, domElement) => {
    const pageTree = new PageTree(domElement);
    pageTree.initialize();
});
