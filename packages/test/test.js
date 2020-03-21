const { exec } = require("child_process");
const test = require("tape");

const commandWithCSV = `import-usage --filepath='fixtures/**/*.js' --components='LegacyButton,LegacyInput' --reportformat='csv'`;
const commandWithJSON = `import-usage --filepath='fixtures/**/*.js' --components='LegacyButton,LegacyInput' --reportformat='json'`;
const commandWithScope =
  "import-usage --filepath='fixtures/**/*.js' --reportformat='json' --components='LegacyModal' --scope='@scoped/ui/v2'";

test("produces correct csv output", t => {
  exec(commandWithCSV, (error, stdout, stderr) => {
    if (error) {
      t.fail(error.message);
    }

    if (stderr) {
      t.fail(stderr);
    }
    t.equal(
      stdout.replace(/\r?\n|\r/g, "").trim(),
      `LegacyButton, 3 LegacyInput, 2`
    );
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
        LegacyButton: 3,
        LegacyInput: 2
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
        LegacyModal: 1
      })
    );
    t.end();
  });
});
