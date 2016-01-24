ecrit.presentation = {};
ecrit.presentation.Watcher = function (document) {
    document.on("nodeInserted", this.nodeInsertionHandler.bind(this));
    document.on("nodeRemoved", this.nodeRemovalHandler.bind(this));
};

ecrit.presentation.Watcher.prototype.nodeInsertionHandler = function (data) {
    data.node.on("nodeInserted", this.nodeInsertionHandler.bind(this));
    data.node.on("nodeRemoved", this.nodeRemovalHandler.bind(this));

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
            data.node.on("textModified", this.textModifiedHandler.bind(this));
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

ecrit.presentation.Watcher.prototype.nodeRemovalHandler = function (data) {
    document.querySelector("[data-ecrit-id=\"" + data.id + "\"]").remove();
};

ecrit.presentation.Watcher.prototype.textModifiedHandler = function (data) {
    var el = document.querySelector("[data-ecrit-id=\"" + data.node.id + "\"]");
    el.textContent = data.node.text;
};