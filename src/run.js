const fs = require("fs"),
    axios = require("axios"),
    path = require("path");
const { URL, MODES } = require('./consts');
const $ = { r: "\x1b[0m", g: "\x1b[32m", s: "\x1b[47m", k: "\x1b[30m", e: "\x1b[31m" }
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
    console.log(`Downloading ${$.g}${name.toUpperCase()}${$.r} resume!`);
    let url = URL(code, name, id);
    try {
        let response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        if (response.data) {
            let file = path.parse(url).base;
            let destination = path.join(process.cwd(), mode$.toUpperCase());
            if(!fs.existsSync(destination)) fs.mkdirSync(destination, { recursive : true });

            fs.writeFileSync(path.join(destination, file), Buffer.from(response.data, 'binary'));
            console.log(`${$.s}${$.g}${name.toUpperCase()}${$.k} resume : FINISHED${$.r}`);
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
    let data = fs.readFileSync("./data.txt").toString().trim().split("\n").map(x => x.trim());
    let existed = [];
    for (let name of data) {
        name = name.toLowerCase()
        for (let i = 1; i < 300; i += i < 100 ? 1 : 10) {
            if (existed.includes(i)) continue;
            let done = await save(name, mode, toId(i));
            if (done) {
                existed.push(i);
                break;
            }
            if(i == 290) console.log(`${$.s}${$.k}Oops! Cannot find ${$.e}${name.toUpperCase()}${$.r}${$.s}${$.k}'s resume!${$.r}`);
        }
    }
}

dwnAll()
