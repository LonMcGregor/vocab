import Sack from "./Sack";

it("construct and size properly", () => {
    const s1 = new Sack([]);
    expect(s1.size()).toEqual(0);
    const s2 = new Sack([["a", "A"], ["b", "B"], ["c", "C"]]);
    expect(s2.size()).toEqual(3);
    const s3 = new Sack([["a", "A"], ["b", "B"], ["c", "C"], 42, "er£"]);
    expect(s3.size()).toEqual(5);
});

it("clear properly", () => {
    const s = new Sack([["a", "A"], ["b", "B"], ["c", "C"]]);
    expect(s.size()).toEqual(3);
    s.clear();
    expect(s.size()).toEqual(0);
});

it("set properly", () => {
    const s = new Sack([["a", "A"], ["b", "B"], ["c", "C"]]);
    expect(s.size()).toEqual(3);
    s.set([1,2,3,4,5]);
    expect(s.size()).toEqual(5);
});

it("contains the right elements", () => {
    const expected = [["a", "A"], 42, "er£"];
    const s = new Sack(expected);
    const out = [];
    out.push(s.pick());
    out.push(s.pick());
    out.push(s.pick());
    expect(out).toEqual(expect.arrayContaining(expected));
    expect(() => {s.pick();}).toThrow();
});

it("reshuffle properly", () => {
    const s = new Sack([1,2]);
    const out = s.pick();
    expect(s.size()).toEqual(2);
    expect(s.size(true)).toEqual(1);
    expect(s.peek()).toEqual(out===1 ? 2 : 1);
    s.reshuffle();
    expect(s.size()).toEqual(2);
    expect(s.size(true)).toEqual(2);
    const out2 = [];
    out2.push(s.pick());
    out2.push(s.pick());
    expect(out2).toEqual(expect.arrayContaining([1,2]));
});

it("pick multiple properly", () => {
    const expected = [["a", "A"], 42, "er£"];
    const s = new Sack(expected);
    const out = s.pick(2);
    expect(out.length).toEqual(2);
    out.forEach(x => {
        expect(expected.indexOf(x)).toBeGreaterThan(-1);
    });
    const s2 = new Sack(expected);
    expect(() => {s2.pick(4);}).toThrow();
    expect(s2.pick(0)).toEqual([]);
});

it("pick all properly", () => {
    const expected = [["a", "A"], 42, "er£"];
    const s = new Sack(expected);
    const out = s.pick(3);
    expect(out.length).toEqual(3);
    expect(out).toEqual(expect.arrayContaining(expected));
    expect(() => {s.pick();}).toThrow();
});

it("peek multiple properly", () => {
    const expected = new Set(["a", "b", "c", "d", "e", "f"]);
    const s = new Sack(Array.from(expected));
    const picked = s.pick();
    expected.delete(picked);
    const peeked = s.peek(5);
    expect(peeked.length).toEqual(5);
    expect(peeked).toEqual(expect.arrayContaining(Array.from(expected)));
    expect(s.pick(5)).toEqual(expect.arrayContaining(Array.from(expected)));
    const expected2 = new Set(["a", "b", "c", "d", "e", "f"]);
    const s2 = new Sack(expected2);
    expect(() => {s2.pick(7);}).toThrow();
});

it("peek multiple properly less than full", () => {
    const expected = new Set(["a", "b", "c", "d", "e", "f"]);
    const s = new Sack(Array.from(expected));
    const picked = s.pick();
    expected.delete(picked);
    for(var i = 0; i < 6; i++){
        const peeked = s.peek(4);
        expect(peeked.length).toEqual(4);
        peeked.forEach(x => {
            expect(expected.has(x)).toEqual(true);
        });
    }
});
