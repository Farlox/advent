import fs from "fs";
import path from "path";
import { aEq, printMatrix } from "../lib";

const main = () => {
    const isSample = process.argv.length > 2 && process.argv[2] == "--sample";
    const fileName = `17${isSample ? ".sample" : ""}.txt`;

    const filePath = path.resolve(__dirname, fileName);
    const lines = fs.readFileSync(filePath, { encoding: "utf8" }).replaceAll("\r", "").split("\n");

    console.time("parse");
    let state: State = {
        a: 0,
        b: 0,
        c: 0,
        program: [],
        instr: 0,
        output: [],
    };

    lines.map((line) => parseLine(line, state));
    console.timeEnd("parse");

    let sim = run(state);
    let part1 = sim.output.join(",");
    console.log(`part1: ${part1}`);

    state.a = 105817292800000;
    while (!aEq(sim.output, state.program)) {
        state.a++;
        if (state.a % 100000 === 0) console.log(`sim ${state.a}`);
        sim = run(state);
    }

    let part2 = state.a;
    console.log(`part2: ${part2}`);
};

const run = (state: State) => {
    const sim = {
        ...state,
        output: [],
    };

    while (sim.instr < sim.program.length) {
        const [opcode, operand] = sim.program.slice(sim.instr, sim.instr + 2);

        // if (isSample) console.log(`> ${0}: ${opcode} ${operand}`);

        let combo = operand;
        if (operand === 4) combo = sim.a;
        if (operand === 5) combo = sim.b;
        if (operand === 6) combo = sim.c;

        let increaseInst = true;

        switch (opcode) {
            case 0:
                adv(sim, combo);
                break;
            case 1:
                bxl(sim, operand);
                break;
            case 2:
                bst(sim, combo);
                break;
            case 3:
                if (jnz(sim, operand)) {
                    increaseInst = false;
                }
                break;
            case 4:
                bxc(sim);
                break;
            case 5:
                out(sim, combo);
                break;
            case 7:
                cdv(sim, combo);
                break;
            default:
                console.error(`UNKNOWN OPCODE ${opcode}`);
                throw new Error(`UNKNOWN OPCODE ${opcode}`);
        }

        // if (isSample) {
        // printState(sim);
        // console.log(sim);
        // }

        if (increaseInst) {
            sim.instr += 2;
        }
    }

    return sim;
};

const sim = () => {
    let a = 47792830;
    while (a > 0) {
        let b = a % 8;
        b = b ^ 5;
        let c = Math.floor(a / Math.pow(2, b));
        b = b ^ 6;
        b = b ^ c;
        console.log(`out: ${b % 8}`);
        a = Math.floor(a / 8);
    }
};

const printState = (state: State) => {
    const { a, b, c } = state;
    const [opcode, operand] = state.program.slice(state.instr, state.instr + 2);

    console.log(`${opcode} ${operand}`);
    const w = 7;
    console.log(`${a.toString().padStart(w)} ${b.toString().padStart(w)} ${c.toString().padStart(w)}`);
    console.log(state.output);
    console.log();
};

const adv = (state: State, operand: number) => {
    const numeral = state.a;
    const denom = Math.pow(2, operand);
    state.a = Math.floor(numeral / denom);

    return state;
};

const bxl = (state: State, operand: number) => {
    state.b = state.b ^ operand;
    return state;
};

const bst = (state: State, operand: number) => {
    state.b = operand % 8;
    return state;
};

const bdv = (state: State, operand: number) => {
    const numeral = state.a;
    const denom = Math.pow(2, operand);
    state.b = Math.floor(numeral / denom);

    return state;
};

const cdv = (state: State, operand: number) => {
    const numeral = state.a;
    const denom = Math.pow(2, operand);
    state.c = Math.floor(numeral / denom);

    return state;
};

/**
 * @returns true if a jump occured, else false.  If a jump occurs, then instr should not be increased this loop.
 */
const jnz = (state: State, operand: number): boolean => {
    if (state.a === 0) return false;

    state.instr = operand;
    return true;
};

const bxc = (state: State) => {
    state.b = state.b ^ state.c;
    return state;
};

const out = (state: State, operand: number) => {
    state.output.push(operand % 8);

    return state;
};

interface State {
    a: number;
    b: number;
    c: number;

    program: number[];
    instr: number;

    output: number[];
}

const parseLine = (line: string, state: State): State => {
    if (line.startsWith("Register A")) {
        state.a = parseInt(line.split(":")[1]);
    }
    if (line.startsWith("Register B")) {
        state.b = parseInt(line.split(":")[1]);
    }
    if (line.startsWith("Register C")) {
        state.c = parseInt(line.split(":")[1]);
    }

    if (line.startsWith("Program:")) {
        state.program = line
            .split(":")[1]
            .split(",")
            .map((s) => parseInt(s, 10));
    }

    return state;
};

console.time("main");
main();
console.timeEnd("main");
