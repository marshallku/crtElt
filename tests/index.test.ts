import { screen } from "@testing-library/dom";
import crtElt from "../src";

describe("Create Element", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
    });

    it("should create element", () => {
        const element = crtElt("div", { className: "foo bar" }, "Hello World!");

        expect(element.nodeName.toLocaleLowerCase()).toBe("div");
        expect(element).toHaveClass("foo", "bar");
        expect(element.innerHTML).toBe("Hello World!");
    });

    it("should create SVG element", () => {
        const element = crtElt(
            "svg",
            {
                dataset: {
                    testid: "svg",
                },
                viewBox: "0 0 300 300",
                className: "foo bar",
            },
            crtElt("circle", { cx: "150", cy: "150", r: "20" })
        );

        document.body.append(element);

        expect(screen.getByTestId("svg")).toBeInTheDocument();
        expect(element.nodeName.toLocaleLowerCase()).toBe("svg");
        expect(element).toHaveClass("foo", "bar");
        expect(element).not.toHaveAttribute("className");
    });

    it("should create document fragment", () => {
        const element = crtElt(
            "fragment",
            null,
            crtElt(
                "fragment",
                null,
                crtElt("div", { dataset: { testid: "div" } }, "Hello world!")
            )
        );

        document.body.append(element);

        expect(element.nodeName.toLocaleLowerCase()).toBe("#document-fragment");
        expect(screen.getByTestId("div")).toBeInTheDocument();
        expect(document.body.childNodes.length).toBe(1);
    });
});

describe("Setting attributes", () => {
    it("should set styles", () => {
        const element = crtElt("div", {
            style: {
                display: "inline",
                width: "20px",
                height: "30px",
                "--variable": "10px",
            },
        });

        expect(element).toHaveStyle("display: inline");
        expect(element).toHaveStyle("width: 20px");
        expect(element).toHaveStyle("height: 30px");
        expect(element).toHaveStyle("--variable: 10px");
    });

    it("should set datasets", () => {
        const element = crtElt("div", {
            dataset: {
                id: "foo",
                indexId: "1",
            },
        });

        expect(element).toHaveAttribute("data-id", "foo");
        expect(element).toHaveAttribute("data-index-id", "1");
    });

    it("should not set falsy datasets", () => {
        const element = crtElt("div", {
            dataset: {
                foo: undefined,
            },
        });

        expect(element).not.toHaveAttribute("data-foo");
    });

    it("should add classes with class attribute", () => {
        const element = crtElt("div", { class: "foo bar" });

        expect(element).toHaveClass("foo", "bar");
    });
});

describe("Add event listener", () => {
    it("should add click event listener", () => {
        const element = crtElt("button", {
            type: "button",
            events: {
                click({ currentTarget }) {
                    expect(currentTarget.tagName).toBe("BUTTON");
                    currentTarget.innerHTML += "clicked";
                },
            },
        });

        expect(element.innerHTML).toBe("");
        element.click();
        expect(element.innerHTML).toBe("clicked");
        element.click();
        expect(element.innerHTML).toBe("clickedclicked");
    });

    it("should add event listener with options", () => {
        const element = crtElt("button", {
            type: "button",
            events: {
                click: [
                    ({ currentTarget }) => {
                        expect(currentTarget.tagName).toBe("BUTTON");
                        currentTarget.innerHTML += "clicked";
                    },
                    { once: true },
                ],
            },
        });

        expect(element.innerHTML).toBe("");
        element.click();
        expect(element.innerHTML).toBe("clicked");
        element.click();
        expect(element.innerHTML).toBe("clicked");
    });

    it("should return proper target", () => {
        let expectedTarget: string;
        const child = crtElt("div", {}, crtElt("span", {}, "Hello World!"));
        const element = crtElt(
            "button",
            {
                type: "button",
                events: {
                    click({ currentTarget, target }) {
                        expect(currentTarget.tagName).toBe("BUTTON");
                        expect((target as HTMLElement).tagName).toBe(
                            expectedTarget
                        );
                    },
                },
            },
            child
        );

        const testElement = (element: HTMLElement) => {
            expectedTarget = element.tagName;
            element.click();
        };

        testElement(child);
        testElement(element);
        testElement(child.firstElementChild as HTMLSpanElement);
    });
});
