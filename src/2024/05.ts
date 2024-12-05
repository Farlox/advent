import fs from "fs";
import path from "path";

const main = () => {
    const filePath = path.resolve(__dirname, "05.txt");
    const lines = fs.readFileSync(filePath, { encoding: "utf8" }).replaceAll("\r", "").split("\n");

    console.time("parse");
    const rules = lines.filter((line) => line.includes("|")).map((line) => line.split("|").map((s) => parseInt(s, 10)));

    const books = lines.filter((line) => line.includes(",")).map((line) => line.split(",").map((n) => parseInt(n, 10)));

    console.timeEnd("parse");

    console.log(rules);
    console.log(books);

    let part1 = 0;
    let part2 = 0;

    for (const book of books) {
        let sortedBook = [...book];

        sortedBook.sort((a, b) => {
            for (const rule of rules) {
                if (rule[0] === a && rule[1] === b) {
                    return -1;
                } else if (rule[1] === a && rule[0] === b) {
                    return 1;
                }
            }

            return 0;
        });
        console.log(book);
        console.log(sortedBook);

        const good = areEq(book, sortedBook);
        if (good) {
            const m = mid(book);
            part1 += m;
            console.log(`good +${m}`);
        } else {
            const m = mid(sortedBook);
            part2 += m;
        }
    }

    console.log(part1);
    console.log(part2);
};

const areEq = (a: number[], b: number[]) => {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
};

const mid = (a: number[]): number => a[Math.floor(a.length / 2)];

console.time("main");
main();
console.timeEnd("main");
