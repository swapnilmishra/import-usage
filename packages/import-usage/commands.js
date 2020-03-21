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
      describe: "Directories to ignore i.e node_modules"
    })
    .option("reportformat", {
      default: "table",
      choices: ["table", "csv", "json"]
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
