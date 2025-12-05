import fs from "fs";
import path from "path";
import { printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `04${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    let grid = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0)
        .map((row) => row.split("")); // for character array instead of parsed lines

    printMatrix(grid);

    let part1 = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] !== "@") continue;
            const c = count(grid, x, y);
            // console.log(x, y, c);
            if (c < 4) {
                part1++;
            }
        }
    }
    console.log(`part1: ${part1}`);

    let part2 = 0;
    let prevPart2 = -1;
    while (prevPart2 !== part2) {
        console.log(prevPart2, part2);
        printMatrix(grid);
        prevPart2 = part2;

        const nextGrid: string[][] = grid.map((row) => row.slice()); // copy

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                if (grid[y][x] !== "@") continue;
                const c = count(grid, x, y);
                if (c < 4) {
                    nextGrid[y][x] = ".";
                    part2++;
                }
            }
        }

        grid = nextGrid;
    }

    console.log(`part2: ${part2}`);
};

const count = (grid: string[][], x: number, y: number): number => {
    let n = 0;

    for (let yd = -1; yd <= 1; yd++) {
        for (let xd = -1; xd <= 1; xd++) {
            if (xd === 0 && yd === 0) continue;
            if (x + xd < 0 || y + yd < 0) continue;
            if (x + xd >= grid[0].length || y + yd >= grid.length) continue;
            // console.log(x + xd, y + yd, grid.at(y + yd), grid.at(y + yd)?.at(x + xd));
            if (grid[y + yd][x + xd] === "@") {
                n++;
            }
        }
    }

    return n;
};

console.time("main");
main();
console.timeEnd("main");
