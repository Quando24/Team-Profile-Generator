const Manager = require("../lib/Manager");

test("possible to set office number via constructor argument", () => {
    const testValue = 100;
    const m = new Manager("Foo", 1, "test@test.com", testValue);
    expect(m.officeNumber).toBe(testValue);
});

test("getRole() will return \"Manager\"", () => {
    const testValue = "Manager";
    const m = new Manager("Foo", 1, "test@test.com", 100);
    expect(m.getRole()).toBe(testValue);
});

test("possible to set office number via getOffice()", () => {
    const testValue = 100;
    const m = new Manager("Foo", 1, "test@test.com", testValue);
    expect(m.getOfficeNumber()).toBe(testValue);
});