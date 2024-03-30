const fs = require("fs"),
    axios = require("axios"),
    path = require("path");
const { URL, MODES } = require('./consts');

const mode$ = process.argv[2];
let mode;

if (!mode$) {
    throw new Error('Mode argument is required');
}
mode = mode$.toLowerCase();
if (!MODES.includes(mode)) throw new Error(`"${mode}" is not valid mode!\nMode should be\t${MODES.join('\tor ')}.`);

console.log(`Running Mode ${mode}...`);

mode = ['t', 'f'][MODES.indexOf(mode)];

async function save(name, code, id) {
    console.log(`Downloading ${name} resume`);
    let url = URL(code, name, id);
    try {
        let response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        if (response.data) {
            let file = path.parse(url).base;
            fs.writeFileSync(file, Buffer.from(response.data, 'binary'));
            console.log(`${name} resume : FINISHED`);
            return true;
        }
    } catch (_) { return false; }
}

function toId(num) {
    let p = "";
    if (num < 10) p += 0;
    if (num < 100) p += 0;
    return p + num
}

async function dwnAll() {
    let data = fs.readFileSync("./data.txt").toString().split("\n");
    let existed = [];
    for (let name of data) {
        for (let i = 1; i < 300; i++) {
            if (existed.includes(i)) continue;
            let done = await save(name, mode, toId(i));
            if (done) {
                existed.push(i);
                break;
            }
        }
    }
}

dwnAll()
