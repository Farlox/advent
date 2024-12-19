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

    console.time("reverse");
    for (const pattern of patterns) {
        const num = reverse(pattern, towels, {});
        console.log(`${pattern} ${num}`);
        part2 += num;
    }
    console.timeEnd("reverse");

    // console.time("generate");
    // for (const pattern of patterns) {
    //     const num = generate(pattern, towels);
    //     console.log(`${pattern} ${num}`);
    //     part2 += num;
    // }
    // console.timeEnd("generate");

    console.log(`part2: ${part2}`);
};

const reverse = (pattern: string, towels: string[], cache: Record<string, number>): number => {
    if (pattern === "") return 1;
    if (cache[pattern] !== undefined) return cache[pattern];

    const ends = towels.filter((towel) => pattern.endsWith(towel));
    const score = ends
        .map((end) => reverse(pattern.slice(0, -end.length), towels, cache))
        .reduce((sum, next) => sum + next, 0);

    cache[pattern] = score;
    return score;
};

const generate = (pattern: string, towels: string[]) => {
    let total = 0;

    let list: string[] = [""];
    while (list.length > 0) {
        const cur = list.shift();

        if (cur === pattern) {
            total++;
            continue;
        }

        const next = towels.filter((towel) => pattern.startsWith(cur + towel)).map((next) => cur + next);
        list = [...list, ...next];
    }

    return total;
};

const check = (pattern: string, cur: string, towels: string[], seen: string[]): boolean => {
    if (pattern === cur) return true;
    if (seen.includes(cur)) return false;
    seen.push(cur);

    // console.log(`${pattern} ~ ${cur}`);

    const opts = towels.filter((towel) => pattern.startsWith(cur + towel));
    const result = opts.map((opt) => check(pattern, cur + opt, towels, seen));

    return result.some((res) => res === true);
};

console.time("main");
main();
console.timeEnd("main");
