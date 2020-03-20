### What it is

It is a cli tool to figure out the usage of Components in your source files

- Supports glob patter supported by [glob](https://www.npmjs.com/package/glob)
- Supports 3 output report formats - `table(default), csv, json`

### Help

```shell
> node cli.js -h

Options:
  --version       Show version number                                  [boolean]
  --filepath      File or directory path or glob pattern     [string] [required]
  --components    Comma separated component names            [string] [required]
  --ignore        Directories to ignore i.e node_modules
                                                 [default: "**/node_modules/**"]
  --reportformat            [choices: "table", "csv", "json"] [default: "table"]
  --help, -h      Show help                                            [boolean]
```

### Running

```shell
> node cli.js --filepath="test/src/**/*.js" --components="LegacyButton,LegacyInput" --reportformat="csv"
```
