import fs from "fs";
import path from "path";
import { Point, printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `14${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0); // ending newline

    const mapW = isSample ? 11 : 101;
    const mapH = isSample ? 7 : 103;

    console.time("parse");
    const robots = lines.map(parseLine);
    console.timeEnd("parse");

    if (isSample) console.log(robots);

    for (let t = 1; t < 10000; t++) {
        for (const r of robots) {
            r.p.x += r.v.x;
            if (r.p.x < 0) r.p.x += mapW;
            if (r.p.x >= mapW) r.p.x %= mapW;

            r.p.y += r.v.y;
            if (r.p.y < 0) r.p.y += mapH;
            if (r.p.y >= mapH) r.p.y %= mapH;
        }

        console.log(`t=${t}`);
        printRobots(robots, mapW, mapH);
    }

    if (isSample) console.log(robots);

    const midX = Math.floor(mapW / 2);
    const midY = Math.floor(mapH / 2);

    const q1 = robots.filter((r) => r.p.x < midX && r.p.y < midY).length;
    const q2 = robots.filter((r) => r.p.x > midX && r.p.y < midY).length;
    const q3 = robots.filter((r) => r.p.x < midX && r.p.y > midY).length;
    const q4 = robots.filter((r) => r.p.x > midX && r.p.y > midY).length;

    console.log([q1, q2, q3, q4]);

    let part1 = q1 * q2 * q3 * q4;
    console.log(`part1: ${part1}`);

    let part2 = 0;
    console.log(`part2: ${part2}`);
};

interface Robot {
    p: Point;
    v: Point;
}

const printRobots = (robots: Robot[], w: number, h: number) => {
    const map = Array.from({ length: h }, () => Array(w).fill(" "));
    for (const r of robots) {
        map[r.p.y][r.p.x] = "#";
    }

    printMatrix(map);
};

const regex = /p=(?<px>-?\d+),(?<py>-?\d+) v=(?<vx>-?\d+),(?<vy>-?\d+)/;

const parseLine = (line: string): Robot => {
    const m = regex.exec(line);

    return {
        p: { x: parseInt(m?.groups.px), y: parseInt(m?.groups.py) },
        v: { x: parseInt(m?.groups.vx), y: parseInt(m?.groups.vy) },
    };
};

console.time("main");
main();
console.timeEnd("main");
