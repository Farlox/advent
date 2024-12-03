import fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.resolve(__dirname, "03.txt");
  const text = fs.readFileSync(filePath, { encoding: "utf8" });

  const regex = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/gm;

  const p1 = part1(text, regex);
  console.log(`p1: ${p1}`);
  // 167090022
  //  93175512

  const splits = text.split(`do()`);
  console.log(splits.length);

  let sum = 0;

  let go = true;
  for (let i = 0; i < splits.length; i++) {
    const dosplit = splits[i].split(`don't()`);
    sum += part1(dosplit[0], regex);
  }

  // for (let i = 0; i < splits.length; i += 2) {
  //   console.log(`part ${i}`);
  //   sum += part1(splits[i], regex);
  // }

  // for (let i = 1; i < splits.length; i += 2) {
  //   let dosplit = splits[i].split("do()", 2);

  //   // console.log(splits[i].indexOf("do()"));

  //   console.log(`group ${i} split into ${dosplit.length} parts`);
  //   if (dosplit.length > 1) {
  //     // console.log(dosplit[1]);
  //     sum += part1(dosplit[1], regex);
  //   }
  // }

  console.log(sum);
};

const part1 = (text: string, regex: RegExp): number => {
  let sum: number = 0;
  let m: RegExpExecArray;
  while ((m = regex.exec(text)) !== null) {
    sum += parseInt(m.groups.a) * parseInt(m.groups.b);
  }

  return sum;
};

console.time("main");
console.log("> start");
main();
console.timeEnd("main");
