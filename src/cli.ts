#!/usr/bin/env node
import * as fs from 'fs';
import { LexModelValidator } from './LexModelValidator';
import { Log } from './util/Log';

const [, , ...args] = process.argv;

const loadFile = (path: string, verbose: boolean) => {
  try {
    return fs.readFileSync(path);
  } catch (e) {
    if (verbose) {
      Log.error(e.stack);
    }
    return undefined;
  }
};

if (args.length > 0 && args.length < 2) {
  let verbose = false;
  if (args[1] === '--verbose' || args[1] === '-v') {
    verbose = true;
  }
  const path = args[0];
  const rawData = loadFile(path, verbose);
  if (rawData) {
    try {
      const json = JSON.parse(rawData.toString());
      new LexModelValidator().validateJson(json);
    } catch (e) {
      if (verbose) {
        Log.error(e.stack);
      }
      Log.error(
        `The contents of the found file at '${path}' could not be parsed to JSON.`
      );
    }
  } else {
    Log.error(`A file could not find for path '${path}'.`);
  }
} else {
  Log.warning(
    `Invalid syntax.\nThe syntax has to be like: 'lex-model-validator ./path/to/json'.\nAdditionally '--verbose' or '-v' can be passed for stacktraces.`
  );
}
