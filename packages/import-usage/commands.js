const yargs = require("yargs");

function buildCommands(handler) {
  const argv = yargs
    .option("filepath", {
      describe: "File or directory path or glob pattern",
      type: "string"
    })
    .option("components", {
      type: "string",
      describe: "Comma separated component names"
    })
    .option("ignore", {
      default: "**/node_modules/**",
      type: "string",
      describe: "Directories to ignore i.e node_modules"
    })
    .option("reportformat", {
      default: "table",
      type: "string",
      choices: ["table", "csv", "json"],
      describe: "stdout format of data"
    })
    .option("scope", {
      type: "string",
      describe: "If defined, components only from this package will be searched"
    })
    .demandOption(
      ["filepath", "components"],
      "Please provide both filepath and components"
    )
    .help()
    .alias("help", "h").argv;

  handler(argv);
}

module.exports = buildCommands;
