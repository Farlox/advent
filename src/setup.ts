import fs from "fs";
import path from "path";

import minimist from "minimist";

const main = async () => {
  const argv = minimist(process.argv.slice(2));
  console.log(argv);

  if (argv._.length !== 1) {
    console.log("From a year directory (e.g. /src/2024/)");
    console.log("usage: tsx setup.ts 3");
    return;
  }

  const n: number = argv._[0];

  copyTemplate(n);

  fetchInput(n);

  // TODO: download input file
  // curl https://adventofcode.com/2024/day/#/input --header "Cookie: $(cat .token)" > 0#.txt
};

const copyTemplate = (n: number) => {
  const templatePath = path.resolve(__dirname, "template.ts");
  const destPath = path.resolve(process.cwd(), `${n}.ts`.padStart(5, "0"));

  const template = fs.readFileSync(templatePath, { encoding: "utf8" });

  const parsed = template.replace("##", `${n}`.padStart(2, "0"));

  console.log(`using ${templatePath} to create ${destPath}`);
  fs.writeFileSync(destPath, parsed, { encoding: "utf8" });
};

const fetchInput = async (n: number) => {
  const tokenPath = path.resolve(process.cwd(), ".token");
  const token = fs.readFileSync(tokenPath, { encoding: "utf8" });

  const headers = {
    Cookie: `${token}`,
  };

  const url = `https://adventofcode.com/2024/day/${n}/input`;

  console.log(`attempting to fetch ${url} with headers: ${token}`);

  const resp = await fetch(url, { headers });
  if (!resp.ok) {
    console.error(
      `error fetching input file: ${resp.status} ${resp.statusText}`
    );
    console.error(resp);
    return;
  }

  const destPath = path.resolve(process.cwd(), `${n}.txt`.padStart(6, "0"));
  const inputs = await resp.text();

  // TODO: remove ending newline?
  fs.writeFileSync(destPath, inputs, "utf8");
};

main();
