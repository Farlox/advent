import fs from "fs";
import path from "path";
import { Point, printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `13${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0); // ending newline

    let regex = /Button .: X\+(?<x>\d+), Y\+(?<y>\d+)/;
    let pregex = /Prize: X=(?<x>\d+), Y=(?<y>\d+)/;

    const machines: Machine[] = [];
    let machine: Machine = {};
    for (const line of lines) {
        if (line.startsWith("Button A: ")) {
            const m = regex.exec(line);
            machine.a = { x: parseInt(m?.groups.x), y: parseInt(m?.groups.y) };
        } else if (line.startsWith("Button B: ")) {
            const m = regex.exec(line);
            machine.b = { x: parseInt(m?.groups.x), y: parseInt(m?.groups.y) };
        } else if (line.startsWith("Prize")) {
            const m = pregex.exec(line);
            machine.p = { x: parseInt(m?.groups.x), y: parseInt(m?.groups.y) };
            machines.push({ ...machine });
            machine = {};
        }
    }
    console.log(machines);

    let part1 = 0;
    for (const m of machines) {
        let min = Number.MAX_VALUE;
        for (let i = 0; i <= 100; i++) {
            for (let j = 0; j <= 100; j++) {
                if (i * m.a.x + j * m.b.x === m.p.x && i * m.a.y + j * m.b.y === m.p.y) {
                    const cost = 3 * i + j;
                    console.log(`${i} ${j}`);
                    min = Math.min(cost, min);
                }
            }
        }

        if (min < Number.MAX_VALUE) {
            part1 += min;
        }
    }
    console.log(`part1: ${part1}`);

    for (const m of machines) {
        m.p.x += 10000000000000;
        m.p.y += 10000000000000;
    }

    let part2 = 0;
    for (const m of machines) {
        let min = Number.MAX_VALUE;
        for (let i = Math.floor(m.p.x / m.a.x); i >= 0; i--) {
            let xx = m.p.x - i * m.a.x;
            for (let j = Math.floor((m.p.x - xx) / m.b.x); j >= 0; j--) {
                const curX = i * m.a.x + j * m.b.x;
                console.log(`checking ${i} ${j}: ${curX} (${m.p.x - curX})`);
                if (i * m.a.x + j * m.b.x === m.p.x && i * m.a.y + j * m.b.y === m.p.y) {
                    const cost = 3 * i + j;
                    console.log(`${i} ${j}`);
                    min = Math.min(cost, min);
                }
            }
        }

        if (min < Number.MAX_VALUE) {
            part2 += min;
        }
    }
    console.log(`part2: ${part2}`);
};

interface Machine {
    a: Point;
    b: Point;
    p: Point;
}

console.time("main");
main();
console.timeEnd("main");
