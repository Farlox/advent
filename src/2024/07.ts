import fs from "fs";
import path from "path";

const main = () => {
    const filePath = path.resolve(__dirname, "07.txt");
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0); // ending newline

    console.time("parse");
    const eqs = lines.map(parseLine);
    console.timeEnd("parse");

    const good = eqs.filter((eq) => isGood(eq));

    const part1 = good.reduce((sum, next) => sum + next.val, 0);

    console.log(part1);
};

const isGood = (eq: Eq): boolean => {
    if (eq.nums.length === 1) return eq.val === eq.nums[0];

    if (eq.nums[0] > eq.val) return false;

    const add = {
        val: eq.val,
        nums: [eq.nums[0] + eq.nums[1], ...eq.nums.slice(2)],
    };

    const mul = {
        val: eq.val,
        nums: [eq.nums[0] * eq.nums[1], ...eq.nums.slice(2)],
    };

    const cat = {
        val: eq.val,
        nums: [parseInt(eq.nums[0].toString() + eq.nums[1].toString(), 10), ...eq.nums.slice(2)],
    };

    return isGood(add) || isGood(mul) || isGood(cat);
};

interface Eq {
    val: number;
    nums: number[];
}

const parseLine = (line: string): Eq => {
    const split = line.split(":");

    return {
        val: parseInt(split[0], 10),
        nums: split[1]
            .split(" ")
            .filter((s) => s.length > 0)
            .map((n) => parseInt(n, 10)),
    };
};

console.time("main");
main();
console.timeEnd("main");
