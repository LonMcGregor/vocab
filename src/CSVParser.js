export default class CSVParser {
    asArray(uri){
        return fetch(uri)
            .then(response => {
                return response.text();
            })
            .then(text => {
                const lines = text.split("\n");
                const fullArray = [];
                lines.forEach(line => {
                    if(line!==""){
                        fullArray.push(line.split(","));
                    }
                });
                return fullArray;
            });
    }
}
