#!/usr/bin/env node
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const glob = require("glob");
const fs = require("fs");
const showResults = require("./reporter");
const buildCommands = require("./commands");

let componentsToFind = [];
let componentsCount = {};

function handler({ filepath, components, ignore, reportformat }) {
  componentsToFind = components.split(",");
  componentsToFind.forEach(c => (componentsCount[c] = 0));

  glob(filepath, { ignore }, function(er, files) {
    files.forEach(file => {
      const code = fs.readFileSync(file, { encoding: "utf-8" });
      readAST(code);
    });
    showResults(componentsCount, reportformat);
  });
}

function readAST(code) {
  try {
    const ast = parser.parse(code, {
      sourceType: "module"
    });

    traverse(ast, {
      enter(path) {
        if (path.isImportSpecifier()) {
          const compName = path.node.imported.name;
          if (componentsToFind.includes(compName)) {
            componentsCount[compName]++;
          }
        }
      }
    });
  } catch (e) {
    console.error("error while reading AST", e);
  }
}

buildCommands(handler);
