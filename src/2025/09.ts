import fs from "fs";
import path from "path";
import { printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `09${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0)
        .map((row) => row.split(",").map((c) => parseInt(c, 10)));

    console.log(lines);

    let part1 = 0;
    for (const a of lines) {
        for (const b of lines) {
            const area = Math.abs(a[0] - b[0] + 1) * (Math.abs(a[1] - b[1]) + 1);
            if (area > part1) console.log(a, b, area);
            part1 = Math.max(part1, area);
        }
    }
    console.log(`part1: ${part1}`);

    let part2 = 0;
    console.log(`part2: ${part2}`);
};

console.time("main");
main();
console.timeEnd("main");
