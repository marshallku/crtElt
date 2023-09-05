import {
    CreatedElement,
    CustomElementAttributes,
    CustomElementKeys,
    CustomEvents,
} from "./types";
import createElement from "./utils/createElement";

export default function crtElt<
    T extends CustomElementKeys,
    U = CreatedElement<T>
>(
    nodeName: T,
    nullableAttributes: CustomElementAttributes<T> | null,
    ...children: Array<string | DocumentFragment | Element | undefined | null>
): U {
    const node = createElement(nodeName);
    const attributes = { ...nullableAttributes };

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
                            boolean | AddEventListenerOptions
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
                if (!dataValue) {
                    return;
                }

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

        if (key === "class" && typeof value === "string") {
            node.classList.add(...value.split(" "));

            return;
        }

        if (node instanceof SVGElement && typeof value === "string") {
            if (key === "className") {
                node.classList.add(...value.split(" "));

                return;
            }

            node.setAttribute(key, value);

            return;
        }

        if (key in node) {
            try {
                node[key as "id"] = value as string;
            } catch {
                node.setAttribute(key, value as string);
            }

            return;
        }

        node.setAttribute(key, value as string);
    });

    return node as U;
}
