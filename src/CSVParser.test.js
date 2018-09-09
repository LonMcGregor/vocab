import CSVParser from "./CSVParser";

it("reads as array", async () => {
    const c = new CSVParser();
    fetch.resetMocks();
    fetch.mockResponse(` pre-space,b, spaces
c,d,space between

e,f, trailing newline
`);
    const result = await c.asArray("/example.csv");
    expect(result).toEqual(
        [
            [" pre-space", "b", " spaces"],
            ["c", "d", "space between"],
            ["e", "f", " trailing newline"],
        ]
    );
});
