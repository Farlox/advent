import fs from "fs";
import path from "path";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `11${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    let stones = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .split(" ")
        .map((c) => parseInt(c, 10));

    console.log(stones);

    console.time("part1");
    for (let i = 0; i < 25; i++) {
        stones = blink(stones);
    }
    const part1 = stones.length;
    console.log(part1);
    console.timeEnd("part1");

    console.time("part2");
    let part2 = 0;
    for (let n of stones) {
        part2 += len(n, 75);
    }

    console.log(part2);
    console.timeEnd("part2");

    // for (let i = 0; i < 50; i++) {
    //     console.log(`${25 + i} / 75 (${(25 + i) / 75}): ${stones.length}`);
    //     stones = blink(stones);
    // }
    // const part2 = stones.length;
    // console.log(part2);
};

const blink = (a: number[]): number[] => {
    return a.flatMap((n) => {
        if (n === 0) {
            return 1;
        } else if (n.toString().length % 2 === 0) {
            const s = n.toString();
            return [parseInt(s.slice(0, s.length / 2), 10), parseInt(s.slice(s.length / 2))];
        } else {
            return n * 2024;
        }
    });
};

const mem: Record<string, number> = {};

let hit = 0;
let miss = 0;

const len = (n: number, blinks: number): number => {
    // console.log(`${n} ${blinks}`);
    if (blinks === 0) return 1;

    const key = `${n}-${blinks}`;
    if (mem[key] === undefined) {
        miss++;
        if (n === 0) {
            // console.log("n0");
            mem[key] = len(1, blinks - 1);
        } else if (n.toString().length % 2 === 0) {
            // console.log("neven");
            const s = n.toString();
            mem[key] =
                len(parseInt(s.slice(0, s.length / 2), 10), blinks - 1) +
                len(parseInt(s.slice(s.length / 2)), blinks - 1);
        } else {
            // console.log("n2024");
            mem[key] = len(n * 2024, blinks - 1);
        }
    } else {
        hit++;
    }

    return mem[key];
};

console.time("main");
main();
console.timeEnd("main");
