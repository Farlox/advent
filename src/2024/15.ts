import fs from "fs";
import path from "path";
import { Point, printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `15${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs.readFileSync(filePath, { encoding: "utf8" }).replaceAll("\r", "").split("\n");
    // .map(row => row.split('')); // for character array instead of parsed lines

    const blank = lines.findIndex((line) => line === "");
    const map = lines.slice(0, blank).map((row) => row.split(""));

    printMatrix(map);

    let robot: Point = { x: 0, y: 0 };

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === "@") {
                robot = { x, y };
                map[y][x] = ".";
                break;
            }
        }
    }

    const moves = lines.slice(blank + 1).join("");
    console.log(moves);

    // robot movement
    for (const c of moves) {
        console.log(c);

        const dir = getDir(c);
        const next = add(robot, dir);
        const nextC = map[next.y][next.x];
        if (nextC === "#") {
            // no move
        } else if (nextC === ".") {
            robot = next;
        } else if (nextC === "O") {
            let over = next;
            while (map[over.y][over.x] !== "." && map[over.y][over.x] !== "#") {
                over = add(over, dir);
            }

            if (map[over.y][over.x] === "#") {
                console.log("push box into wall");
                continue;
            }

            if (map[over.y][over.x] === ".") {
                map[over.y][over.x] = "O";
                map[next.y][next.x] = ".";
                robot = next;
            }
        }

        if (isSample) printMatrix(map);
    }

    let part1 = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === "O") {
                part1 += 100 * y + x;
            }
        }
    }
    console.log(`part1: ${part1}`);

    let part2 = 0;
    console.log(`part2: ${part2}`);
};

const getDir = (c: string): Point => {
    switch (c) {
        case ">":
            return { x: 1, y: 0 };
        case "v":
            return { x: 0, y: 1 };
        case "<":
            return { x: -1, y: 0 };
        case "^":
            return { x: 0, y: -1 };
    }

    return { x: 0, y: 0 };
};

const add = (a: Point, b: Point) => ({ x: a.x + b.x, y: a.y + b.y });

console.time("main");
main();
console.timeEnd("main");
