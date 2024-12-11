export const unique = <T>(val: T, idx: number, arr: T[]) => arr.indexOf(val) === idx;

export const printMatrix = (s: string[][]) => console.log(s.map((row) => row.join("")).join("\n"));

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

export const onMap = (p: Point, map: string[][]): boolean =>
    p.x >= 0 && p.y >= 0 && p.x < map[0].length && p.y < map.length;
