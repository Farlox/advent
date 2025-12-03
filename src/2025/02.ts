import fs from "fs";
import path from "path";
import { printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `02${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0); // ending newline
    // .map(row => row.split('')); // for character array instead of parsed lines

    console.time("parse");
    const ranges = parseLine(lines[0]);
    console.timeEnd("parse");

    console.log(ranges);

    let part1 = 0;
    for (const range of ranges) {
        for (let n = range.start; n <= range.end; n++) {
            const s = n.toString();
            if (s.length % 2 === 1) continue;
            if (s.slice(0, s.length / 2) === s.slice(s.length / 2)) {
                // console.log(n);
                part1 += n;
            }
        }
    }
    console.log(`part1: ${part1}`);

    let part2 = 0;
    for (const range of ranges) {
        for (let num = range.start; num <= range.end; num++) {
            const s = num.toString();
            for (let i = 1; i <= s.length / 2; i++) {
                // console.log(num, i);
                if (s.length % i !== 0) continue;
                const repeats = s.length / i;
                if (s.slice(0, i).repeat(repeats) === s) {
                    console.log(s);
                    part2 += num;
                    break;
                }
            }
        }
    }
    console.log(`part2: ${part2}`);
};

interface Range {
    start: number;
    end: number;
}

const parseLine = (line: string): Range[] => {
    const arr = line.split(",").map((s) => s.split("-"));
    return arr.map((sa) => ({ start: parseInt(sa[0], 10), end: parseInt(sa[1], 10) }));
};

console.time("main");
main();
console.timeEnd("main");
