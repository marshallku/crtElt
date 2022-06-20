export interface CustomElements
    extends Omit<HTMLElementTagNameMap, "title">,
        Omit<SVGElementTagNameMap, "script" | "a" | "style"> {
    fragment: DocumentFragment;
}

export type CustomElementKeys = keyof CustomElements;

export type CustomEventMap = keyof HTMLElementEventMap;

export type CreatedElement<T extends CustomElementKeys> = CustomElements[T];

export type CustomElementEventListenerParameter<T extends CustomElementKeys> =
    Parameters<CreatedElement<T>["addEventListener"]>;

type CustomListener<T extends CustomElementKeys, K extends CustomEventMap> = (
    this: CreatedElement<T>,
    ev: HTMLElementEventMap[K]
) => any;

export type CustomEvents<T extends CustomElementKeys> = {
    [key in CustomEventMap]:
        | CustomListener<T, key>
        | [CustomListener<T, key>, boolean | AddEventListenerOptions];
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
