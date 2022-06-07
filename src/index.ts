import createElement from "./createElement";

export default function crtElt<
    T extends CustomElementKeys,
    U extends CreatedElement<T>
>(
    nodeName: T,
    attributes: CustomElementAttributes<T> = {},
    ...children: Array<string | DocumentFragment | Element | undefined | null>
): U {
    const node = createElement(nodeName);

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

    if (node instanceof DocumentFragment) {
        return node as U;
    }

    Object.entries(attributes).forEach(([key, value]) => {
        if (typeof value === "undefined" || value === null) {
            return;
        }

        if (key === "events") {
            Object.entries(value as Partial<CustomEvents<T>>).forEach(
                ([type, args]) => {
                    if (Array.isArray(args)) {
                        const curArgs = args as [
                            EventListenerOrEventListenerObject,
                            boolean | AddEventListenerOptions | undefined
                        ];

                        node.addEventListener(type, ...curArgs);

                        return;
                    }

                    const curArgs = args as EventListenerOrEventListenerObject;

                    node.addEventListener(type, curArgs);
                }
            );

            return;
        }

        if (key === "dataset") {
            Object.entries(value).forEach(([dataAttribute, dataValue]) => {
                node.dataset[dataAttribute] = dataValue as string;
            });

            return;
        }

        if (key === "style") {
            Object.entries(value as CSSStyleDeclaration).forEach(
                ([styleAttribute, styleValue]) => {
                    if (styleAttribute in node.style) {
                        node.style[styleAttribute as "width"] = styleValue;
                        return;
                    }

                    node.style.setProperty(styleAttribute, styleValue);
                }
            );

            return;
        }

        if (node instanceof SVGElement) {
            node.setAttribute(key, value);

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

    return node as U;
}
