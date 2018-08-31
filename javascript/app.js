function convertToJson(){
    const html = String(document.querySelector("#originalHTML").value);
    document.querySelector("#jsonHTML").value = parseHtml(html)
}

function parseHtml(data){
    jsonParse = { component: [{}]}
    let currentElement = 0;
    for(let i = 0; i < data.length; i++){
        if (data[i] === "<" && data[i + 1] !== "/"){
            //Create Element
            jsonParse.component[currentElement].element = "";
            for(let j = 1; j < data.length; j++){
                if (data[i + j] !== ">"){
                    if ((data[j] === " ") && ((data[j + 1] + data[j + 2] + data[j + 3] + data[j + 4] + data[j + 5]) === "class")){
                        //Create Class
                        jsonParse.component[currentElement].class = "";
                        for(let k = 8; k < data.length; k++){
                            if (data[k + j] !== "\""){
                                jsonParse.component[currentElement].class += data[j + k];
                            } else {
                                j += k;
                                k = data.length
                            }
                        }
                        console.log(j)
                    } else {
                        jsonParse.component[currentElement].element += data[i + j]
                    }
                } else {
                    i += j + 1;
                    j = data.length;
                }
            }
        } else if (data[i] === "<" && data[i + 1] === "/"){
            console.log(jsonParse)
            return jsonParse
        }
    }
    console.log(jsonParse)
}