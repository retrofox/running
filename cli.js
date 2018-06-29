#!/usr/bin/env node

var program = require('commander');
const Running = require('./');

const version = '0.0.1'

const running = new Running();

program
	.version(version)
	.command('pace <distance> <time>')
	.option('-u --unit [unit]', '`min/km`, `min/mi`')
	.action(function(distance, time, cmd){
		running.setDistance(distance);
		running.setTime(time);

		console.log("\n\tpace: %o\n", running.pace(cmd.unit));
	});

program.parse(process.argv);
