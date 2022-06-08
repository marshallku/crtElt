import crtElt from "..";

describe("Create Element", () => {
    it("Create simple div", () => {
        const element = crtElt("div", { className: "foo bar" }, "Hello World!");

        expect(element.nodeName).toBe("DIV");
        expect(element).toHaveClass("foo", "bar");
        expect(element.innerHTML).toBe("Hello World!");
    });
});
