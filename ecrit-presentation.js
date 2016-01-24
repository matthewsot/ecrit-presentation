ecrit.presentation = {};
ecrit.presentation.Watcher = function (document, presentationDiv) {
    document.on("nodeInserted", this.nodeInsertionHandler);
    document.on("nodeRemoved", this.nodeRemovalHandler);
};

ecrit.presentation.Watcher.prototype.nodeInsertionHander = function (data) {
    data.node.on("nodeInserted", this.nodeInsertionHandler);
    var parentEl = document.querySelector("[data-ecrit-id=\"" + data.node.parent.id + "\"]");
    switch (data.node.type) {
        case "Paragraph":
            var newEl = document.createElement("p");
            newEl.setAttribute("data-ecrit-id", data.node.id);
            
            if (data.index === parentEl.childNodes.length) {
                parentEl.appendChild(newEl);
            }
            else {
                parentEl.insertBefore(newEl, parentEl.childNodes[data.index]);
            }
            break;
        case "TextSpan":
            data.node.on("textModified", this.textModifiedHandler);
            var newEl = document.createElement("span");
            newEl.setAttribute("data-ecrit-id", data.node.id);
            newEl.textContent = data.node.text;

            if (data.index === parentEl.childNodes.length) {
                parentEl.appendChild(newEl);
            }
            else {
                parentEl.insertBefore(newEl, parentEl.childNodes[data.index]);
            }
            break;
    }
};

ecrit.presentation.Watcher.prototype.textModificationHandler = function (data) {

};