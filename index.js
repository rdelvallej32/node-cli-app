#!/usr/bin/env node
'use strict';
/**
 * Require dependencies
 *
 */
const program = require('commander'),
    chalk = require("chalk"),
    exec = require('child_process').exec,
    pkg = require('./package.json');

/**
 * list function definition
 *
 */
let list = (directory,options)  => {
    const cmd = 'ls';
    
    let dir = directory,
        params = [];
    
    if (options.all) params.push("a");
    if (options.long) params.push("l");
    let parameterizedCommand = params.length ? cmd + ' -' + params.join('') : cmd;
    
    
    let output = (error, stdout, stderr) => {
        if (error) console.log(chalk.red.bold.underline("exec error:") + error);
        if (stdout) console.log(chalk.green.bold.underline("Result:") + stdout);
        if (stderr) console.log(chalk.red("Error: ") + stderr);
    };
    
    exec(parameterizedCommand,output);
    
};

/**
 * help function definition
 *
 */
let helpList = () => console.log("List Help");

program
    .version(pkg.version)
    .command('list [directory]')
    .option('-a, --all', 'List all')
    .option('-l, --long','Long list format')
    .action(list)
    .on('--help',helpList);

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();