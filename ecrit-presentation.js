ecrit.presentation = {};
ecrit.presentation.Watcher = function (document) {
    document.on("nodeInserted", this.nodeInsertionHandler);
    document.on("nodeRemoved", this.nodeRemovalHandler);
};

ecrit.presentation.Watcher.prototype.nodeInsertionHander = function (data) {
    data.node.on("nodeInserted", this.nodeInsertionHandler);
    if (data.node.type === "TestSpan") {
        data.node.on("textModified", this.textModifiedHandler);
    }
};

ecrit.presentation.Watcher.prototype.textModificationHandler = function (data) {

};