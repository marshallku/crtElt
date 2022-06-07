export default function createElement(nodeName: string) {
    if (nodeName === "fragment") {
        return document.createDocumentFragment();
    }

    return document.createElement(nodeName);
}
