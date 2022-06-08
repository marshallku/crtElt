export interface CustomElements
    extends Omit<HTMLElementTagNameMap, "title">,
        Omit<SVGElementTagNameMap, "script" | "a" | "style"> {
    fragment: DocumentFragment;
}

export type CustomElementKeys = keyof CustomElements;

export type CreatedElement<T extends CustomElementKeys> = CustomElements[T];

export type CustomElementEventListenerParameter<T extends CustomElementKeys> =
    Parameters<CreatedElement<T>["addEventListener"]>;

export type CustomEvents<T extends CustomElementKeys> = {
    [key in CustomElementEventListenerParameter<T>[0]]:
        | CustomElementEventListenerParameter<T>[1]
        | [
              CustomElementEventListenerParameter<T>[1],
              CustomElementEventListenerParameter<T>[2]
          ];
};

export interface CustomAttributes<T extends CustomElementKeys> {
    events: Partial<CustomEvents<T>>;
    dataset: { [key: string]: string };
    style: Partial<CSSStyleDeclaration> | { [key: string]: string };
}

export type CustomElementAttributes<T extends CustomElementKeys> =
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
