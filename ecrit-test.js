var doc = new ecrit.Document();
var watcher = new ecrit.presentation.Watcher(doc);
var para = new ecrit.Paragraph(doc, "p-id-1");

doc.applyTransformation({
    "affectsId": "root",
    "timestamp": 100,
    "action": "insertNode",
    "node": para,
    "lastApplied": -1
});

var textSpan = new ecrit.TextSpan(para, "ts-id-1", { text: "test text" });

doc.getChildNodeById("p-id-1").applyTransformation({
    "affectsId": "p-id-1",
    "timestamp": 200,
    "action": "insertNode",
    "node": textSpan,
    "lastApplied": -1
});

doc.getChildNodeById("ts-id-1").applyTransformation(new ecrit.Transformation({
    action: "insertText",
    text: "abc ",
    index: 0,
    timestamp: 300,
    lastApplied: -1
}));

doc.getChildNodeById("ts-id-1").applyTransformation(new ecrit.Transformation({
    action: "insertText",
    text: "hello there! ",
    index: 4,
    timestamp: 500,
    lastApplied: 300
}));

// doc.applyTransformation({
//     "affectsId": "p-id-1",
//     "timestamp": 100,
//     "action": "removeNode",
//     "node": doc.getChildNodeById("ts-id-1"),
//     "lastApplied": 100
// });