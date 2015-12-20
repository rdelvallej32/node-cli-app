#!/usr/bin/env node
var program = require('commander'),
    chalk = require("chalk"),
    spawn = require('child_process').spawn,
    
    pkg = require('./package.json');

function list (directory,options) {
    var dir = directory;
    var all = options.all;
    var long = options.long;
    
    // console.log("dir %j", dir);
    // console.log("all? " + all, "long? " + long);
    var cmd = 'ls',
        params = [];
    
    if (all) params.push("-a");
    if (long) params.push("-l");
    
    var ls = params.length === 0 ? spawn(cmd) : spawn(cmd,params);
    
    
    ls.stdout.on('data',function(data){
       console.log("Result:\n", data.toString('utf8'));
    });
    ls.stderr.on('data', function(err){
        console.log(cmd,params);
        console.log("error: \n", err.toString('utf8'));
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