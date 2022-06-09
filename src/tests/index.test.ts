import { screen } from "@testing-library/dom";
import crtElt from "..";

describe("Create Element", () => {
    it("Create element", () => {
        const element = crtElt("div", { className: "foo bar" }, "Hello World!");

        expect(element.nodeName.toLocaleLowerCase()).toBe("div");
        expect(element).toHaveClass("foo", "bar");
        expect(element.innerHTML).toBe("Hello World!");
    });

    it("Create SVG element", () => {
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
        expect(element).toHaveClass("foo", "bar");
        expect(element.nodeName.toLocaleLowerCase()).toBe("svg");
    });
});

describe("Set attributes", () => {
    it("Styles", () => {
        const element = crtElt("div", {
            style: {
                display: "inline",
                width: "20px",
                height: "30px",
            },
        });

        expect(element).toHaveStyle("display: inline");
        expect(element).toHaveStyle("width: 20px");
        expect(element).toHaveStyle("height: 30px");
    });

    it("Dataset", () => {
        const element = crtElt("div", {
            dataset: {
                id: "foo",
                indexId: "1",
            },
        });

        expect(element).toHaveAttribute("data-id", "foo");
        expect(element).toHaveAttribute("data-index-id", "1");
    });
});

describe("Add event listener", () => {
    it("Click", () => {
        const element = crtElt("button", {
            type: "button",
            events: {
                click({ target }) {
                    if (!(target instanceof HTMLButtonElement)) {
                        return;
                    }

                    target.innerHTML += "clicked";
                },
            },
        });

        expect(element.innerHTML).toBe("");
        element.click();
        expect(element.innerHTML).toBe("clicked");
        element.click();
        expect(element.innerHTML).toBe("clickedclicked");
    });

    it("Event listener options", () => {
        const element = crtElt("button", {
            type: "button",
            events: {
                click: [
                    ({ target }) => {
                        if (!(target instanceof HTMLButtonElement)) {
                            return;
                        }

                        target.innerHTML += "clicked";
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
});
