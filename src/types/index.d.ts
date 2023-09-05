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

export type CustomListener<
    T extends CustomElementKeys,
    K extends CustomEventMap
> = (
    this: CreatedElement<T>,
    ev: Omit<HTMLElementEventMap[K], "currentTarget"> & {
        currentTarget: CreatedElement<T>;
    }
) => any;

export type CustomEvents<T extends CustomElementKeys> = {
    [K in CustomEventMap]:
        | CustomListener<T, K>
        | [CustomListener<T, K>, boolean | AddEventListenerOptions];
};

export interface CustomAttributes<T extends CustomElementKeys> {
    class?: string;
    events: Partial<CustomEvents<T>>;
    dataset: { [key: string]: string | undefined };
    style: Partial<CSSStyleDeclaration> | { [key: string]: string };
}

export type CustomElementAttributes<
    T extends CustomElementKeys,
    E = CreatedElement<T>
> = Partial<
    Omit<
        {
            [K in keyof E]: E[K] | string;
        },
        keyof CustomAttributes<T>
    > &
        CustomAttributes<T>
>;
