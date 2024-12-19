export const unique = <T>(val: T, idx: number, arr: T[]) => arr.indexOf(val) === idx;

export const printMatrix = (s: string[][]) => console.log(s.map((row) => row.join("")).join("\n"));

export const aEq = <T>(a: T[], b: T[]): boolean =>
    a.length === b.length && a.every((val, idx) => b[idx] === val);

/* Points */
export interface Point {
    x: number;
    y: number;
}

export const peq = (a: Point, b: Point): boolean => a.x === b.x && a.y === b.y;

export const right = (p: Point): Point => ({ x: p.x + 1, y: p.y });
export const left = (p: Point): Point => ({ x: p.x - 1, y: p.y });
export const down = (p: Point): Point => ({ x: p.x, y: p.y + 1 });
export const up = (p: Point): Point => ({ x: p.x, y: p.y - 1 });

export const add = (a: Point, b: Point) => ({ x: a.x + b.x, y: a.y + b.y });

const z = { x: 0, y: 0 };
const r = right(z);
const l = left(z);
const d = down(z);
const u = up(z);

export const turnClock = (dir: Point): Point => {
    if (peq(dir, r)) return d;
    if (peq(dir, l)) return u;

    if (peq(dir, u)) return r;
    if (peq(dir, d)) return l;

    return dir;
};

export const turnCounter = (dir: Point): Point => {
    if (peq(dir, r)) return u;
    if (peq(dir, l)) return d;

    if (peq(dir, u)) return l;
    if (peq(dir, d)) return r;

    return dir;
};

export const findChar = (c: string, map: string[][]): Point => {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === c) {
                return { x, y };
            }
        }
    }

    return { x: -1, y: -1 };
};

export const onMap = (p: Point, map: string[][]): boolean =>
    p.x >= 0 && p.y >= 0 && p.x < map[0].length && p.y < map.length;

export const makeSameSize = <T>(map: string[][], defaultValue: T) =>
    Array.from({ length: map.length }, () => Array(map[0].length).fill(defaultValue));
