import Vocab from "./Vocab";

it("instances appropriately", () => {
    fetch.resetMocks();
    fetch.mockResponse(`a,b
c,d
e,f
g,h
i,j`);
    const v = new Vocab();
    v.loadVocab().then(()=>{
        v.nextWord();
    });
});
