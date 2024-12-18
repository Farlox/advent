import fs from "fs";
import path from "path";
import { down, left, makeSameSize, onMap, peq, Point, printMatrix, right, up } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `18${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0); // ending newline
    // .map(row => row.split('')); // for character array instead of parsed lines

    const mapW = isSample ? 7 : 71;
    const mapH = isSample ? 7 : 71;

    const exit = isSample ? { x: 6, y: 6 } : { x: 70, y: 70 };

    const map: string[][] = Array.from({ length: mapH }, () => Array(mapW).fill("."));

    console.time("parse");
    const corruptions = lines.map(parseLine);
    console.timeEnd("parse");

    console.log(corruptions);

    printMatrix(map);
    for (const p of corruptions.slice(0, isSample ? 12 : 1024)) {
        map[p.y][p.x] = "#";
    }
    printMatrix(map);

    let dist: number[][] = makeSameSize(map, Number.MAX_SAFE_INTEGER);
    let q: Cell[] = [{ x: 0, y: 0, dist: 0 }];

    let part1 = Number.MAX_SAFE_INTEGER;
    while (q.length > 0) {
        const cell = q.pop()!;

        if (peq(cell, exit)) {
            part1 = Math.min(cell.dist, part1);
            continue;
        }

        dist[cell.y][cell.x] = cell.dist;

        for (const next of [up(cell), right(cell), down(cell), left(cell)]) {
            if (onMap(next, map) && map[next.y][next.x] === "." && dist[next.y][next.x] > cell.dist + 1) {
                q.push({ x: next.x, y: next.y, dist: cell.dist + 1 });
            }
        }
    }
    console.log(`part1: ${part1}`);

    let part2: Point = { x: -1, y: -1 };
    for (const c of corruptions.slice(isSample ? 12 : 1024)) {
        map[c.y][c.x] = "#";

        dist = makeSameSize(map, Number.MAX_SAFE_INTEGER);
        q = [{ x: 0, y: 0, dist: 0 }];
        let hasPath = false;

        while (q.length > 0) {
            const cell = q.pop()!;

            if (peq(cell, exit)) {
                hasPath = true;
                break;
            }

            dist[cell.y][cell.x] = cell.dist;

            for (const next of [up(cell), right(cell), down(cell), left(cell)]) {
                if (onMap(next, map) && map[next.y][next.x] === "." && dist[next.y][next.x] > cell.dist + 1) {
                    q.push({ x: next.x, y: next.y, dist: cell.dist + 1 });
                }
            }
        }

        if (!hasPath) {
            part2 = c;
            break;
        }
    }

    console.log(`part2: ${JSON.stringify(part2)}`);
};

interface Cell extends Point {
    dist: number;
}

const parseLine = (line: string): Point => {
    const [x, y] = line.split(",").map((c) => parseInt(c, 10));
    return { x, y };
};

console.time("main");
main();
console.timeEnd("main");
