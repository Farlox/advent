# Advent of Code playpen and solutions

1. at the start of a year

-   Save your [adventofcode.com](https://adventofcode.com) cookie in `/src/{year}/.token`
    -   this should be in the format `session=<token>`

2. at the start of each day, use setup to copy template.ts to `{nn}.ts` and download the input file to `{nn}.txt`

-   in `/src/{year}`
    > tsx ../setup.ts {n}
-   where {n} is the number of day.
