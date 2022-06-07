interface CustomElements extends HTMLElementTagNameMap, SVGElementTagNameMap {
    fragment: DocumentFragment;
}

declare type CustomElementKeys = keyof CustomElements;

declare type CreatedElement<T extends CustomElementKeys> = CustomElements[T];

declare type CustomElementEventListenerParameter<T extends CustomElementKeys> =
    Parameters<CreatedElement<T>["addEventListener"]>;

declare type CustomEvents<T extends CustomElementKeys> = {
    [key in CustomElementEventListenerParameter<T>[0]]:
        | CustomElementEventListenerParameter<T>[1]
        | [
              CustomElementEventListenerParameter<T>[1],
              CustomElementEventListenerParameter<T>[2]
          ];
};

interface CustomAttributes<T extends CustomElementKeys> {
    events: Partial<CustomEvents<T>>;
    dataset: { [key: string]: string };
    style: Partial<CSSStyleDeclaration> | { [key: string]: string };
}

declare type CustomElementAttributes<T extends CustomElementKeys> =
    | Partial<CreatedElement<T>>
    | Partial<CustomAttributes<T>>
    | { [key: string]: string };

declare function crtElt<
    T extends CustomElementKeys,
    U extends CreatedElement<T>
>(
    nodeName: T,
    attributes?: CustomElementAttributes<T>,
    ...children: Array<string | DocumentFragment | Element | undefined | null>
): U;
