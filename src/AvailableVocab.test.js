import {vocabs} from "./AvailableVocab";
import CSVParser from "./CSVParser";
import fs from "fs";
import glob from "glob";

describe("has word, translation pairs", async () => {
    const csvp = new CSVParser();

    it("has the right number of vocabs available", () => {
        glob("public/*/*.csv", (error, files) => {
            expect(vocabs.length).toBe(files.length);
        });
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
