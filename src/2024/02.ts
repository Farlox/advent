import fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.resolve(__dirname, "02.txt");
  const lines = fs
    .readFileSync(filePath, { encoding: "utf8" })
    .replaceAll("\r", "")
    .split("\n")
    .filter((s) => s.length > 0); // ending newline

  console.time("parse");
  const levels: boolean[] = lines.map(parseLine);
  console.timeEnd("parse");

  const numSafe = levels.filter((level) => level).length;

  console.log(numSafe);
};

const parseLine = (line: string): boolean => {
  const a = line.split(" ").map((n) => parseInt(n, 10));

  const strict = false; // true for part 1, false for part 2
  let asc = isAsc(a, strict);
  let desc = isDesc(a, strict);

  console.log(line + " " + (asc || desc));
  // if (asc || desc) console.log(line);

  return asc || desc;
};

const isAsc = (a: number[], strict = true): boolean => {
  let errorFree = true;

  for (let i = 0; i < a.length - 1; i++) {
    if (a[i] < a[i + 1] && a[i + 1] < a[i] + 4) {
      // continue
    } else {
      if (strict === false) {
        return isAsc(without(a, i)) || isAsc(without(a, i + 1));
      } else {
        return false;
      }
    }
  }

  return true;
};

const isDesc = (a: number[], strict = true): boolean => {
  let errorFree = true;

  for (let i = 0; i < a.length - 1; i++) {
    if (a[i] > a[i + 1] && a[i + 1] > a[i] - 4) {
      // continue
    } else {
      if (strict === false) {
        return isDesc(without(a, i)) || isDesc(without(a, i + 1));
      } else {
        return false;
      }
    }
  }

  return true;
};

const without = (a: number[], i: number): number[] => {
  return [...a.slice(0, i), ...a.slice(i + 1)];
};

console.time("main");
main();
console.timeEnd("main");
