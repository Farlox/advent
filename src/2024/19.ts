import fs from "fs";
import path from "path";
import { printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `19${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs.readFileSync(filePath, { encoding: "utf8" }).replaceAll("\r", "").split("\n");

    const towels = lines[0]
        .split(",")
        .map((s) => s.trim())
        .sort((a, b) => b.length - a.length);

    const patterns = lines.slice(1).filter((line) => line.length > 0);

    console.log(towels);
    console.log(patterns);

    let part1 = 0;

    for (const pattern of patterns) {
        if (check(pattern, "", towels, []) > 0) {
            // console.log(`${pattern}: Good!`);
            part1++;
        } else {
            // console.log(`${pattern}: nope`);
        }
    }
    console.log(`part1: ${part1}`);

    let part2 = 0;

    for (const pattern of patterns) {
        const num = check(pattern, "", towels, []);
        part2 += num;
    }

    console.log(`part2: ${part2}`);
};

const check = (pattern: string, cur: string, towels: string[], seen: string[]): number => {
    if (pattern === cur) return 1;
    if (seen.includes(cur)) return 0;
    seen.push(cur);

    // console.log(`${pattern} ~ ${cur}`);

    const opts = towels.filter((towel) => pattern.startsWith(cur + towel));
    const result = opts.map((opt) => check(pattern, cur + opt, towels, seen));

    return result.reduce((sum, next) => sum + next, 0);
};

console.time("main");
main();
console.timeEnd("main");
