# crtElt

Utility to create DOM Element

## Install

```txt
npm install crtelt
# or
yarn add crtelt
```

Import with script tag

```html
<script src="node_modules/crtelt/dist/index.min.js"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/crtelt@latest/dist/index.min.js"></script>
```

Import as module

```javascript
import crtElt from "crtelt";
```

## Usage

```js
crtElt(nodeName, attributes, children);
```

### nodeName:

Name of the tag. Use `fragment` to create document fragment.

### attributes:

Attributes to set.

**events:**

Object of events.

Pass event listener or array of event listener and options.\
Check examples for details.

**dataset:**

Object of dataset.

**style:**

Object of styles.\
You can use CSS variables too.

### children:

You can pass string, document fragment, element, undefined, null.\
It'll be appended if it's truthy.

## Examples

```ts
function Textarea() {
    const handleChange = ({ target }: Event) => {
        if (!(target instanceof HTMLTextAreaElement)) {
            return;
        }

        console.log(target.value);
    };

    return crtElt(
        "div",
        { className: "text" },
        crtElt("textarea", {
            className: "text__input",
            placeholder: "Type Here!",
            ariaLabel: "Type Here!",
            rows: 2,
            events: {
                change: handleChange,
                keydown: handleChange,
                keyup: handleChange,
                click: [
                    () => {
                        console.log("You clicked it");
                    },
                    { once: true },
                ],
            },
            style: {
                width: "100px",
                fontSize: "2rem",
            },
        }),
        crtElt("div", { className: "text__line text__line--top" }),
        crtElt("div", { className: "text__line" })
    );
}
```
