#!/usr/bin/env node
/**
 * A CLI that uses the ldac profile validator to check an RO-Crate metadata document.
 */
import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import { ROCrate } from 'ro-crate';
import { LdacProfile } from './index.js';
import packageJson from './package.json' assert { type: 'json' };

const { version } = packageJson;

program
  .showHelpAfterError()
  .description(
    'Checks an RO-Crate metadata document; a (ro-crate-metadata.json) file'
  )
  .version(version)
  .argument('<path>', 'Path to the RO-Crate metadata file')
  .option('-e, --errors', 'Output errors only')

  .action(main);

program.parse(process.argv);

function main(cratePath, options) {
  try {
    const opt = { alwaysAsArray: true, link: true };
    const crate = new ROCrate(
      JSON.parse(fs.readFileSync(cratePath, 'utf8')),
      opt
    );
    var result = LdacProfile.validate(crate);
    if (options.errors) {
      console.log(result.errors);
    } else {
      console.log(result);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Error: File not found - '${cratePath}'`);
    } else {
      console.error(error);
    }
  }
}
