import { Speedybot } from "./../src/lib/speedybot";
const fakeToken =
  "2kD2rqamZqbmphaulqYrV5amVqu9WOq11Re6bWR9YiW5N9ybFkPnkaeRl5O7mRfIncSe6jaFNsKf6UJEoOZS6lnFJDOU25R3mrrq5uo";
type MySecrets = "SECRET1" | "secret2" | "SECRET3";
const SECRET1Val = "secret1_value";
const SECRET2Val = "secret2_value";
const SECRET3Val = "secret3_value";

describe("Sanity test", () => {
  it("Can add/retrieve a single secret", async () => {
    // 1) Initialize your bot
    const TestBot = new Speedybot<MySecrets>({ token: fakeToken });
    const expected = SECRET1Val;
    TestBot.addSecret("SECRET1", SECRET1Val);
    const actual = TestBot.getSecret("SECRET1");
    expect(actual).toEqual(expected);
  });

  it("Can add/retrieve multiple secrets", async () => {
    // 1) Initialize your bot
    const TestBot = new Speedybot<MySecrets>({ token: fakeToken });
    TestBot.addSecrets({
      SECRET1: SECRET1Val,
      secret2: SECRET2Val,
      SECRET3: SECRET3Val,
    });
    expect(TestBot.getSecret("SECRET1")).toEqual(SECRET1Val);
    expect(TestBot.getSecret("secret2")).toEqual(SECRET2Val);
    expect(TestBot.getSecret("SECRET3")).toEqual(SECRET3Val);
  });

  it("Token is still set separately (not by secrets)", async () => {
    // 1) Initialize your bot
    const TestBot = new Speedybot<MySecrets>({ token: fakeToken });
    TestBot.addSecrets({
      SECRET1: SECRET1Val,
      secret2: SECRET2Val,
      SECRET3: SECRET3Val,
    });
    expect(TestBot.getSecret("SECRET1")).toEqual(SECRET1Val);
    expect(TestBot.getSecret("secret2")).toEqual(SECRET2Val);
    expect(TestBot.getSecret("SECRET3")).toEqual(SECRET3Val);
    expect(TestBot.exposeToken()).toEqual(fakeToken);

    const newToken = fakeToken + "xxxxx";
    TestBot.setToken(newToken);
    expect(TestBot.exposeToken()).toEqual(newToken);
  });
});
