import fs from "fs";
import path from "path";
import { down, left, onMap, Point, printMatrix, right, up } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `12${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0)
        .map((s) => s.split(""));

    const visited: boolean[][] = Array.from({ length: lines.length }, () =>
        new Array(lines[0].length).fill(false)
    );

    const regions: Region[] = [];
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (visited[y][x]) continue;
            const c = lines[y][x];

            const reg = flood(x, y, lines, c, visited);
            regions.push({
                c,
                p: reg,
            });
        }
    }

    printMatrix(lines);

    // console.log(regions);

    for (const reg of regions) {
        console.log(reg);
        console.log(area(reg));
        console.log(perim(reg, lines));
    }

    const part1 = regions.reduce((sum, next) => (sum += area(next) * perim(next, lines)), 0);
    console.log(`part1: ${part1}`);

    for (const reg of regions) {
        console.log(reg);
        console.log(area(reg));
        console.log(sides(reg, lines));
    }
    const part2 = regions.reduce((sum, next) => (sum += area(next) * sides(next, lines)), 0);
    console.log(`part2: ${part2}`);
};

const flood = (x: number, y: number, lines: string[][], oc: string, visited: boolean[][]) => {
    const p = { x, y };
    const c = lines[y][x];

    if (c !== oc) return [];

    if (visited[y][x]) return [];
    visited[y][x] = true;

    const u = up(p);
    const r = right(p);
    const d = down(p);
    const l = left(p);

    return [
        p,
        ...(onMap(u, lines) ? flood(u.x, u.y, lines, oc, visited) : []),
        ...(onMap(r, lines) ? flood(r.x, r.y, lines, oc, visited) : []),
        ...(onMap(d, lines) ? flood(d.x, d.y, lines, oc, visited) : []),
        ...(onMap(l, lines) ? flood(l.x, l.y, lines, oc, visited) : []),
    ];
};

const area = (reg: Region): number => reg.p.length;
const perim = (reg: Region, lines: string[][]): number => {
    let sum = 0;
    for (const p of reg.p) {
        for (const next of [up(p), right(p), down(p), left(p)]) {
            if (!onMap(next, lines) || lines[next.y][next.x] !== reg.c) {
                sum++;
            }
        }
    }
    return sum;
};

const sides = (reg: Region, lines: string[][]): number => {
    let sum = 0;
    for (const p of reg.p) {
        const u = up(p);
        const r = right(p);
        const d = down(p);
        const l = left(p);

        if (check(u, l, r, reg.c, lines)) sum++;
        if (check(r, u, d, reg.c, lines)) sum++;
        if (check(l, u, d, reg.c, lines)) sum++;
        if (check(d, l, r, reg.c, lines)) sum++;
    }
    return sum;
};

// this logic won't work, need to check the neighbor's border status, not if they match.
const check = (a: Point, n1: Point, n2: Point, c: string, lines: string[][]) =>
    (!onMap(a, lines) || lines[a.y][a.x] !== c) &&
    (!onMap(n1, lines) || lines[n1.y][n1.x] !== c || !onMap(n2, lines) || lines[n2.y][n2.x] !== c);

interface Region {
    c: string;
    p: Point[];
}

console.time("main");
main();
console.timeEnd("main");
