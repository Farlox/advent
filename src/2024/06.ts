import fs from "fs";
import path from "path";

const main = () => {
    const filePath = path.resolve(__dirname, "06.txt");
    const lines: string[][] = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0)
        .map((line) => line.split("")); // ending newline

    let y = lines.findIndex((line) => line.includes("^"));
    let x = lines[y].indexOf("^");

    console.log(`${x}, ${y}`);

    let visited: string[][] = Array.from({ length: lines.length }, () => Array(lines[0].length).fill(" "));

    let next = calcNext(x, y, lines);
    while (next !== undefined) {
        console.log(`${x}, ${y} -> ${next.x}, ${next.y}`);

        x = next.x;
        y = next.y;
        visited[y][x] = "X";
        lines[y][x] = next.c;

        next = calcNext(x, y, lines);

        // console.log(visited.map((r) => r.join("")).join("\n"));
        // console.log();
    }

    console.log(visited.map((r) => r.join("")).join("\n"));
    console.log();
    const part1 = visited
        .map((row) => row.filter((c) => c === "X"))
        .reduce((sum, row) => sum + row.length, 0);

    console.log(part1);
};

const calcNext = (x: number, y: number, lines: string[][]) => {
    let c = lines[y][x];

    let d = [0, 0];

    switch (c) {
        case "^":
            d = [0, -1];
            break;
        case ">":
            d = [1, 0];
            break;
        case "v":
            d = [0, 1];
            break;
        case "<":
            d = [-1, 0];
            break;
    }

    let xx = x + d[0];
    let yy = y + d[1];

    if (xx < 0 || yy < 0 || xx >= lines[0].length || yy >= lines.length) {
        return undefined;
    }

    if (lines[yy][xx] === "#") {
        // right turn
        switch (c) {
            case "^":
                c = ">";
                d = [1, 0];
                break;
            case ">":
                c = "v";
                d = [0, 1];
                break;
            case "v":
                c = "<";
                d = [-1, 0];
                break;
            case "<":
                c = "^";
                d = [0, -1];
                break;
        }
    }

    return {
        x: x + d[0],
        y: y + d[1],
        c,
    };
};

console.time("main");
main();
console.timeEnd("main");
