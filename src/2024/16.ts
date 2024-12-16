import fs from "fs";
import path from "path";
import { add, findChar, makeSameSize, onMap, peq, Point, printMatrix, turnClock, turnCounter } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `16${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0)
        .map((row) => row.split("")); // for character array instead of parsed lines

    printMatrix(lines);

    let deer: Point = findChar("S", lines);
    let dir = { x: 1, y: 0 };
    let exit = findChar("E", lines);

    const best = makeSameSize(lines, Number.MAX_SAFE_INTEGER);

    let part1 = Number.MAX_SAFE_INTEGER;

    const q: Cell[] = [];
    q.push({ ...deer, n: 0, dir, hist: [] });

    let onPath: Point[] = [];

    while (q.length > 0) {
        const cell = q.pop()!;

        if (peq(cell, exit)) {
            part1 = Math.min(part1, cell.n);
            onPath = [...onPath, ...cell.hist, toPoint(cell)];
            continue;
        }

        const b = best[cell.y][cell.x];

        if (b + 2000 < cell.n) {
            continue;
        }
        best[cell.y][cell.x] = Math.min(b, cell.n);

        const clock = {
            ...cell,
            n: cell.n + 1000,
            dir: turnClock(cell.dir),
            hist: [...cell.hist, toPoint(cell)],
        };
        if (q.find((c) => cellEq(c, clock)) === undefined) {
            q.push(clock);
        }

        const counter = {
            ...cell,
            n: cell.n + 1000,
            dir: turnCounter(cell.dir),
            hist: [...cell.hist, toPoint(cell)],
        };
        if (q.find((c) => cellEq(c, counter)) === undefined) {
            q.push(counter);
        }

        const fwd = {
            ...add(cell, cell.dir),
            n: cell.n + 1,
            dir: cell.dir,
            hist: [...cell.hist, toPoint(cell)],
        };
        if (onMap(fwd, lines) && lines[fwd.y][fwd.x] !== "#") q.push(fwd);

        q.sort((a, b) => b.n - a.n);
    }

    if (isSample) {
        console.log(
            best
                .map((row) =>
                    row
                        .map((c) => (c === Number.MAX_SAFE_INTEGER ? "      " : c.toString().padStart(6)))
                        .join("")
                )
                .join("\n")
        );
    }
    console.log(`part1: ${part1}`);

    onPath = onPath.filter((val, idx, arr) => arr.findIndex((p) => peq(p, val)) === idx);

    console.log(onPath);

    if (isSample) {
        for (let y = 0; y < lines.length; y++) {
            let s = "";
            for (let x = 0; x < lines[y].length; x++) {
                if (onPath.find((o) => o.x === x && o.y === y) !== undefined) {
                    s += "O";
                } else {
                    s += " ";
                }
            }
            console.log(s);
        }
    }

    // part 2 is incorrect.  My part1 search doesn't find one of the equivalent paths because another earlier
    // shortest paths cuts across at a lower distance.  Due to this, it doesn't count all cells on the path.
    // fix would be to fix the 'visited' cache correctly - using 3 keys {x, y, dir}
    let part2 = onPath.length;
    console.log(`part2: ${part2}`);
};

interface Cell extends Point {
    n: number;
    dir: Point;
    hist: Point[];
}

const cellEq = (a: Cell, b: Cell): boolean => peq(a, b) && peq(a.dir, b.dir) && a.n === b.n;

const toPoint = (cell: Cell): Point => ({ x: cell.x, y: cell.y });

console.time("main");
main();
console.timeEnd("main");
