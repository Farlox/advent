import fs from "fs";
import path from "path";
import { distanceSq3, peq3, Point3, printMatrix } from "../lib";

interface Edge {
    a: Point3;
    b: Point3;
    dist: number;
}

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `08${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .replaceAll("\r", "")
        .split("\n")
        .filter((s) => s.length > 0); // ending newline
    // .map(row => row.split('')); // for character array instead of parsed lines

    console.time("parse");
    const boxes = lines.map(parseLine);
    console.timeEnd("parse");

    console.log(boxes);

    const edges: Edge[] = [];

    let part1 = 0;
    for (let i = 0; i < boxes.length - 1; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i];
            const b = boxes[j];
            const dist = distanceSq3(a, b);

            const edge: Edge = { a, b, dist };
            edges.push(edge);
        }
    }

    edges.sort((a, b) => a.dist - b.dist);
    // console.log(edges.slice(0, 10));

    let circuits = boxes.map((b) => [b]);

    let connections = 0;
    while (connections < 10) {
        console.log(connections, circuits);

        let edge = edges.shift()!;
        let starti = circuits.findIndex((c) => c.find((box) => peq3(box, edge.a)));
        console.log("start", circuits[starti]);

        const endi = circuits.findIndex((c) => c.find((box) => peq3(box, edge.b)));
        console.log("end", circuits[endi]);

        if (circuits[starti].find((box) => peq3(box, edge.b))) {
            console.log("already in same circuit");
            continue;
        }

        circuits[starti] = [...circuits[starti], ...circuits[endi]];
        circuits = [...circuits.slice(0, endi), ...circuits.slice(endi + 1)];

        connections++;
    }
    console.log(connections, circuits);

    console.log(`part1: ${part1}`);

    let part2 = 0;
    console.log(`part2: ${part2}`);
};

const parseLine = (line: string): Point3 => {
    const [x, y, z] = line.split(",").map((n) => parseInt(n, 10));
    return { x, y, z };
};

console.time("main");
main();
console.timeEnd("main");
