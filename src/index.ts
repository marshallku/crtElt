export default function crtElt<
    T extends CustomElementKeys,
    U extends CreatedElement<T>
>(
    nodeName: T,
    attributes: CustomElementAttributes<T> = {},
    ...children: Array<string | DocumentFragment | Element | undefined | null>
): U {
    const node =
        nodeName === "fragment"
            ? document.createDocumentFragment()
            : document.createElement(nodeName);

    if (!(node instanceof DocumentFragment)) {
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === "events") {
                Object.entries(value).forEach(([type, listener]) => {
                    node.addEventListener(
                        type,
                        listener as EventListenerOrEventListenerObject
                    );
                });

                return;
            }

            if (key in node) {
                try {
                    node[key as "innerText"] = value as string;
                } catch {
                    node.setAttribute(key, value as string);
                }

                return;
            }

            node.setAttribute(key, value as string);
        });
    }

    children.forEach((childNode) => {
        if (!childNode) {
            return;
        }

        if (typeof childNode === "string") {
            node.appendChild(document.createTextNode(childNode));

            return;
        }

        node.appendChild(childNode);
    });

    return node as U;
}
