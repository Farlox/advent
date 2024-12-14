import fs from "fs";
import path from "path";
import { printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `##${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0); // ending newline
    // .map(row => row.split('')); // for character array instead of parsed lines

    console.time("parse");
    const foos = lines.map(parseLine);
    console.timeEnd("parse");

    console.log(foos);

    let part1 = 0;
    console.log(`part1: ${part1}`);

    let part2 = 0;
    console.log(`part2: ${part2}`);
};

interface Foo {
    line: string;
}

const parseLine = (line: string): Foo => {
    return {
        line,
    };
};

console.time("main");
main();
console.timeEnd("main");
