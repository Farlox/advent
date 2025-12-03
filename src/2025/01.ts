import fs from "fs";
import path from "path";
import { printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `01${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0); // ending newline
    // .map(row => row.split('')); // for character array instead of parsed lines

    console.time("parse");
    const turns = lines.map(parseLine);
    console.timeEnd("parse");

    // console.log(turns);

    let part1 = 0;
    let part2 = 0;
    let n = 50;
    for (const turn of turns) {
        if (turn.dir === "L") {
            n -= turn.dist;
            while (n < 0) {
                n += 100;
            }
        } else {
            n += turn.dist;
            while (n > 99) {
                n -= 100;
            }
        }

        if (n === 0) {
            part1++;
        }
    }

    console.log(`part1: ${part1}`);

    n = 50;
    for (const turn of turns) {
        const dir = turn.dir === "L" ? -1 : 1;
        for (let i = 0; i < turn.dist; i++) {
            n += dir;
            if (n === 100) n = 0;
            if (n === -1) n = 99;

            if (n === 0) {
                part2++;
            }
        }
    }
    console.log(`part2: ${part2}`);
};

interface Foo {
    dir: "L" | "R";
    dist: number;
}

const parseLine = (line: string): Foo => {
    return {
        dir: line.slice(0, 1),
        dist: parseInt(line.slice(1)),
    };
};

console.time("main");
main();
console.timeEnd("main");
