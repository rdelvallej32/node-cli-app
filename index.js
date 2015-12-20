#!/usr/bin/env node
'use strict';

const program = require('commander'),
    chalk = require("chalk"),
    exec = require('child_process').exec,
    
    pkg = require('./package.json');

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

let helpList = () => console.log("List Help");

program
    .version(pkg.version)
    .command('list [directory]')
    .option('-a, --all', 'List all')
    .option('-l, --long','Long list format')
    .action(list)
    .on('--help',helpList);

program.parse(process.argv);

if (!program.argv) program.help();