#!/usr/bin/env node
const program = require('commander'),
    chalk = require("chalk"),
    spawn = require('child_process').spawn,
    
    pkg = require('./package.json');

function list (directory,options) {
    var dir = directory;
    
    var cmd = 'ls',
        params = [];
    
    if (options.all) params.push("-a");
    if (options.long) params.push("-l");
    
    var ls = params.length === 0 ? spawn(cmd) : spawn(cmd,params);
    
    //success
    ls.stdout.on('data',function(data){
        var result = data.toString('utf8');
        console.log(chalk.green.bold("Result:"));
        console.log(result);
    });
    
    //error
    ls.stderr.on('data', function(err){
        var error = chalk.red(err.toString('utf8'));
        // chalk.red(cmd,params);
        console.log(chalk.red.bold("Error:"));
        // chalk.red.underline("Command: " + cmd + params);
        console.log(error);
    });
    
    ls.kill();
}

function helpList(){
    console.log("List Help");
}

program
    .version(pkg.version)
    .command('list [directory]')
    .option('-a, --all', 'List all')
    .option('-l, --long','Long list format')
    .action(list)
    .on('--help',helpList);

program.parse(process.argv);