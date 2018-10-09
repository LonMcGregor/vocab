import {vocabs} from "./AvailableVocab";
import CSVParser from "./CSVParser";
import fs from "fs";

describe("has word, translation pairs", async () => {
    const csvp = new CSVParser();

    it("has the right number of vocabs available", () => {
        expect(vocabs.length).toBe(12);
    });

    for(let i = 0; i < vocabs.length; i++){
        it("has "+vocabs[i], async () => {
            const file = "public/"+vocabs[i];
            const content = fs.readFileSync(file).toString("utf8");
            fetch.resetMocks();
            fetch.mockResponse(content);
            const arr = await csvp.asArray(file);
            for(let j = 0; j < arr.length; j++){
                expect(arr[j]).toHaveLength(2);
            }
        });
    }
});
