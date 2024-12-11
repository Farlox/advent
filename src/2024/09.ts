import fs from "fs";
import path from "path";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `09${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const line = fs.readFileSync(filePath, { encoding: "utf8" });

    // console.log(line);

    const expanded = expand(line);
    // console.log(expanded.join(""));

    const compacted = compact(expanded);
    // console.log(compacted.join(""));

    const part1 = checksum(compacted);
    console.log(part1);

    const expanded2 = expand(line);
    // console.log(expanded2.join(""));

    console.log(expanded2.filter((c) => c === ".").length);

    const compacted2 = compact2(expanded2);
    // console.log(compacted2.join(""));

    console.log(compacted2.filter((c) => c === ".").length);

    // let max = 0;
    // let sum = 0;
    // const n = compacted2.map((c) => (c === "." ? 0 : parseInt(c, 10)));
    // for (let i = 0; i < n.length; i++) {

    //     if (Number.MAX_SAFE_INTEGER - n[i] * i < sum) {
    //         max++;
    //         sum = 0;
    //         console.log("oh");
    //     }
    //     sum += n[i] * i;

    //     // console.log(sum);
    // }
    // console.log(sum);
    // console.log(max);

    // const part2 = checksum(compacted2);
    // console.log(part2);
};

const expand = (s: string): string[] => {
    let a: string[] = [];

    let isFile = true;
    let fn = 0;
    for (const c of s) {
        const n = parseInt(c);
        if (isFile) {
            for (let i = 0; i < n; i++) {
                a.push(fn.toString());
            }
            isFile = false;
        } else {
            for (let i = 0; i < n; i++) {
                a.push(".");
            }
            isFile = true;
            fn++;
        }
    }

    return a;
};

const compact = (s: string[]): string[] => {
    let i = s.indexOf(".");
    let j = s.length - 1;

    while (i < j) {
        if (s[j] !== ".") {
            s[i] = s[j];
            s[j] = ".";
            i = s.indexOf(".", i);
        }

        j--;
    }

    return s;
};

const checksum = (s: string[]): number =>
    s.map((c) => (c === "." ? 0 : parseInt(c, 10))).reduce((prod, cur, idx) => (prod += cur * idx), 0);

const compact2 = (s: string[]): string[] => {
    let n = s[s.length - 1];
    let j = s.indexOf(n);
    let i = s.indexOf(".");

    while (j > i) {
        let jLen = 0;
        for (let jj = j; jj < s.length; jj++) {
            if (s[jj] === n) {
                jLen++;
            } else {
                break;
            }
        }

        const ss = s.join("");
        let i = ss.indexOf(".".repeat(jLen));

        // move if possible
        if (i > 0 && i < j) {
            const end = j + jLen;
            for (j; j < end; j++) {
                s[i] = s[j];
                s[j] = ".";
                i++;
            }
        } else {
            // console.log(`${n} doesn't fit ${jLen}`);
        }

        // console.log(s.join(""));

        // iterate
        n = (parseInt(n) - 1).toString();
        j = s.indexOf(n);
        i = s.indexOf(".");
    }

    return s;
};

console.time("main");
main();
console.timeEnd("main");
