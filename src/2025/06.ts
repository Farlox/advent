import fs from "fs";
import path from "path";
import { printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `06${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0);

    const lines1 = lines.map((row) => row.split(" ").filter((s) => s.length > 0));

    // console.log(lines1);

    let part1 = 0;
    for (let x = 0; x < lines1[0].length; x++) {
        const op = lines1.at(-1)![x];
        let col = op === "*" ? 1 : 0;
        for (let y = 0; y < lines1.length - 1; y++) {
            if (op === "*") {
                col *= parseInt(lines1[y][x]);
            } else {
                col += parseInt(lines1[y][x]);
            }
        }
        // console.log(x, col);
        part1 += col;
    }
    console.log(`part1: ${part1}`);

    console.log(lines);

    let part2 = 0;
    console.log(`part2: ${part2}`);
};

console.time("main");
main();
console.timeEnd("main");
