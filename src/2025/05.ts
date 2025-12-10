import fs from "fs";
import path from "path";
import { printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `05${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0);

    console.time("parse");

    const freshRanges = lines
        .filter((line) => line.includes("-"))
        .map((s) => s.split("-").map((c) => parseInt(c, 10)));
    // console.log(freshRanges);

    const ingredients = lines.filter((line) => !line.includes("-")).map((s) => parseInt(s, 10));
    // console.log(ingredients);

    console.timeEnd("parse");

    let part1 = 0;
    for (const i of ingredients) {
        const f = freshRanges.find((r) => r[0] <= i && i <= r[1]);
        if (f) part1++;
    }

    console.log(`part1: ${part1}`);

    let part2 = 0;

    const q = [...freshRanges];
    const fold: number[][] = [];

    console.log(freshRanges);

    while (q.length > 0) {
        const next = q.shift();
        if (next === undefined) break;

        let folded = false;

        for (const r of fold) {
            if (overlap(r, next)) {
                // console.log(r, next);
                const smushed = [Math.min(r[0], next[0]), Math.max(r[1], next[1])];
                // console.log(smushed);
                r[0] = smushed[0];
                r[1] = smushed[1];
                folded = true;
                break;
            }
        }
        if (!folded) {
            fold.push(next);
        }
    }

    console.log(fold);

    part2 = fold.reduce((sum, next) => sum + (next[1] - next[0]), 0);

    console.log(`part2: ${part2}`);
    // too high: 347262367173396
    // need to fold again. one fold can introduce new overlapping regions.  fold until number of ranges doesn't change.
};

const overlap = (a: number[], b: number[]): boolean => {
    if (a[0] >= b[0] && a[0] <= b[1]) return true;
    if (a[1] >= b[0] && a[1] <= b[1]) return true;
    return false;
};

console.time("main");
main();
console.timeEnd("main");
