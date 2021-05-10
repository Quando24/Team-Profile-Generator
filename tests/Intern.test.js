const Intern = require("../lib/Intern");

test("possible to set school via constructor argument", () => {
    const testValue = "Syracuse University";
    const i = new Intern("Foo", 1, "test@test.com", testValue);
    expect(i.school).toBe(testValue);
});

test("getRole() will return \"Intern\"", () => {
    const testValue = "Intern";
    const i = new Intern("Foo", 1, "test@test.com", "Syracuse University");
    expect(i.getRole()).toBe(testValue);
});

test("possible to set school via getSchool()", () => {
    const testValue = "Syracuse University";
    const i = new Intern("Foo", 1, "test@test.com", testValue);
    expect(i.getSchool()).toBe(testValue);
});