const { exec } = require("child_process");
const test = require("tape");

const command =
  "import-usage --filepath='src/**/*.js' --components='LegacyButton,LegacyInput'";
const commandWithCSV = `${command} --reportformat='csv'`;
const commandWithJSON = `${command} --reportformat='json'`;

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
