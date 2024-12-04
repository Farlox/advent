import fs from "fs";
import path from "path";

const main = () => {
    const filePath = path.resolve(__dirname, "04.txt");
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0); // ending newline

    // part1
    let part1 = 0;
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[0].length; x++) {
            part1 += check(x, y, lines, "XMAS");
        }
    }
    console.log(part1);

    // part2
    let p2 = 0;
    for (let y = 1; y < lines.length - 1; y++) {
        for (let x = 1; x < lines[y].length - 1; x++) {
            if (checkX(x, y, lines)) p2++;
        }
    }
    console.log(p2);
};

// p2: 369 - too low

const checkX = (x: number, y: number, lines: string[]): boolean => {
    if (lines.at(y)?.at(x) !== "A") return false;

    let tlm = lines.at(y - 1)?.at(x - 1) === "M" && lines.at(y + 1)?.at(x + 1) === "S";
    let tls = lines.at(y - 1)?.at(x - 1) === "S" && lines.at(y + 1)?.at(x + 1) === "M";
    let blm = lines.at(y + 1)?.at(x - 1) === "M" && lines.at(y - 1)?.at(x + 1) === "S";
    let bls = lines.at(y + 1)?.at(x - 1) === "S" && lines.at(y - 1)?.at(x + 1) === "M";

    return (tlm || tls) && (blm || bls);
};

const check = (x: number, y: number, lines: string[], word: string): number => {
    let tot = 0;

    if (checkInt(x, y, lines, word, 1, 0)) tot++; // right
    if (checkInt(x, y, lines, word, 1, 1)) tot++; // right-down
    if (checkInt(x, y, lines, word, 0, 1)) tot++; // down
    if (checkInt(x, y, lines, word, -1, 1)) tot++; // left-down
    if (checkInt(x, y, lines, word, -1, 0)) tot++; // left
    if (checkInt(x, y, lines, word, -1, -1)) tot++; // left-up
    if (checkInt(x, y, lines, word, 0, -1)) tot++; // up
    if (checkInt(x, y, lines, word, 1, -1)) tot++; // right-up

    return tot;
};

const checkInt = (x: number, y: number, lines: string[], word: string, xDir: number, yDir: number): boolean => {
    for (let i = 0; i < word.length; i++) {
        if (y === 66) {
            debugger;
        }

        const yy = y + yDir * i;
        const xx = x + xDir * i;
        if (yy < 0 || xx < 0) return false;
        if (lines.at(yy)?.at(xx) !== word[i]) {
            return false;
        }
    }

    // console.log(`${x} ${y}`);
    return true;
};

console.time("main");
main();
console.timeEnd("main");
