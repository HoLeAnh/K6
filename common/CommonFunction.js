

export function convertString(string) {
    let result = JSON.stringify(string);
    return result
}

export function convertJson(json) {
    let result = JSON.parse(json);
    return result
}

export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

export function randomNumberNotDuplicate(min, max, list) {
    let result = null
    let isDuplicate = true
    let count = 0

    while (isDuplicate && count < 1000) {
        isDuplicate = false;
        result = Math.floor(Math.random() * (max - min)) + min;
        for (let index = 0; index < list.length; index++) {
            if (list[index] == result) {
                isDuplicate = true;
            }
        }
        count++
    }
    return result
}

export function writeFile(path, body) {
    const fs = eval('require("fs")')
    fs.writeFile(path, body, 'utf8', (err) => {
        if (err) {
            console.log('this is a err')
            console.error(err);
            return;
        };
        console.log("File has been created");
    });
    const stream = fs.createWriteStream(path);
    stream.write(body);
}

export function lala(text) {
    console.log('=========> text : ' + text)
}



export let pi = 3.14