const { exec } = require("child_process");
const test = require("tape");

const commandWithCSV = `import-usage --filepath='fixtures/**/*.js' --components='Button,Input' --reportformat='csv'`;
const commandWithJSON = `import-usage --filepath='fixtures/**/*.js' --components='Button,Input' --reportformat='json'`;
const commandWithScope =
  "import-usage --filepath='fixtures/**/*.js' --reportformat='json' --components='Modal' --scope='@scoped/ui/v2'";

test("produces correct csv output", t => {
  exec(commandWithCSV, (error, stdout, stderr) => {
    if (error) {
      t.fail(error.message);
    }

    if (stderr) {
      t.fail(stderr);
    }
    t.equal(stdout.replace(/\r?\n|\r/g, "").trim(), `Button, 6 Input, 2`);
    t.end();
  });
});

test("produces correct json output", t => {
  exec(commandWithJSON, (error, stdout, stderr) => {
    if (error) {
      t.fail(error.message);
    }

    if (stderr) {
      t.fail(stderr);
    }

    t.equal(
      stdout.replace(/\r?\n|\r/g, ""),
      JSON.stringify({
        Button: 6,
        Input: 2
      })
    );
    t.end();
  });
});

test("filters packages which are not in scope of search", t => {
  exec(commandWithScope, (error, stdout, stderr) => {
    if (error) {
      t.fail(error.message);
    }

    if (stderr) {
      t.fail(stderr);
    }

    t.equal(
      stdout.replace(/\r?\n|\r/g, ""),
      JSON.stringify({
        Modal: 1
      })
    );
    t.end();
  });
});
