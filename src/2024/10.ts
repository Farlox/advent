import fs from "fs";
import path from "path";
import { down, left, onMap, peq, Point, printMatrix, right, unique, up } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `10${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0)
        .map((line) => line.split("")); // ending newline

    printMatrix(lines);

    const zeros: Point[] = [];
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] === "0") {
                zeros.push({ x, y });
            }
        }
    }

    let part1 = 0;
    let part2 = 0;
    for (const z of zeros) {
        console.log("zero:");
        console.log(z);
        let nines: Point[] = [];

        let queue: Point[] = [z];
        while (queue.length > 0) {
            const cur = queue.pop()!;
            const { x, y } = cur;
            const n = parseInt(lines[y][x]);

            if (n === 9) {
                nines.push(cur);
            } else {
                const nc = (n + 1).toString();

                let next = [right(cur), down(cur), left(cur), up(cur)].filter(
                    (p) => onMap(p, lines) && lines[p.y][p.x] === nc
                );
                queue = [...queue, ...next];
                // console.log(queue);
            }
        }

        console.log(nines);
        part2 += nines.length;

        const unique = nines.filter((val, idx, arr) => arr.findIndex((v) => peq(v, val)) === idx);
        console.log(unique);
        const score = unique.length;
        console.log(score);
        part1 += score;
    }

    console.log(`part1: ${part1}`);
    console.log(`part2: ${part2}`);
};

console.time("main");
main();
console.timeEnd("main");
