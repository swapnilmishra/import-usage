function showResults(componentsCount, reportformat) {
  switch (reportformat) {
    case "table":
      const Table = require("cli-table3");
      const table = new Table({
        head: ["Component", "Used count"]
      });

      for (let [componentName, usedCount] of Object.entries(componentsCount)) {
        table.push([componentName, usedCount]);
      }

      console.log(table.toString());
      break;

    case "csv":
      let csv = "";
      for (let [componentName, usedCount] of Object.entries(componentsCount)) {
        csv += `${componentName}, ${usedCount} \n`;
      }
      console.log(csv);
      break;

    case "json":
      console.log(JSON.stringify(componentsCount));
      break;

    default:
      break;
  }
}

module.exports = showResults;
