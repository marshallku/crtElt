export default function crtElt(nodeName, attributes, ...children) {
    const node =
        nodeName === "fragment"
            ? document.createDocumentFragment()
            : document.createElement(nodeName);

    Object.entries(attributes).forEach(([key, value]) => {
        if (key in node) {
            try {
                node[key] = value;
            } catch (err) {
                node.setAttribute(key, value);
            }
        } else {
            node.setAttribute(key, value);
        }
    });

    children.forEach((childNode) => {
        if (typeof childNode === "string") {
            node.appendChild(document.createTextNode(childNode));
        } else {
            node.appendChild(childNode);
        }
    });

    return node;
}
