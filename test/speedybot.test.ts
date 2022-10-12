import { Speedybot } from "./../src/lib/speedybot";
describe("Sanity test", () => {
  it("Token initalizes", async () => {
    // 1) Initialize your bot
    const fakeToken =
      "2kD2rqamZqbmphaulqYrV5amVqu9WOq11Re6bWR9YiW5N9ybFkPnkaeRl5O7mRfIncSe6jaFNsKf6UJEoOZS6lnFJDOU25R3mrrq5uo";
    const TestBot = new Speedybot({ token: fakeToken });
    const expected = fakeToken;
    const actual = TestBot.exposeToken();
    expect(actual).toEqual(expected);
  });
});
