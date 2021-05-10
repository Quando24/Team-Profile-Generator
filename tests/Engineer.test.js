const Engineer = require("../lib/Engineer")

 test("possible to set GitHub account via constructor arguement", () => {
     const testValue = "GitHubUser";
     const e = new Engineer("Foo", 1, "test@test.com", testValue);
     expect(e.gitHub).toBe(testValue);
 });

test("getRole() will return \"Engineer\"", () => {
    const testValue = "Engineer";
    const e = new Engineer("Foo", 1, "test@test.com", "GitHubUser");
    expect(e.getRole()).toBe(testValue);
});

test("Possible to get GitHub username from getGitHub()", () => {
    const testValue = "GitHubUser";
    const e = new Engineer("Foo", 1, "test@test.com", testValue);
    expect(e.getGitHub()).toBe(testValue);
});

