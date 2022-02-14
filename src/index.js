#!/usr/bin/env node

import latestVersion from 'latest-version';
import compareVersions from 'compare-versions';
import commandLineArgs from 'command-line-args';
import chalk from 'chalk';
import {askTarget, askIcon, changeFolderIcons, getAvailableIconsList} from './devfolder.js'

const CURRENT_VERSION = '1.0.6'

const optionDefinitions = [
    { name: 'command', type: String, defaultOption: true },
    { name: 'version', alias: 'v', type: Boolean },
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'target', alias: 't', type: String },
    { name: 'icon', alias: 'i', type: String }
]

const title = 
    chalk.red("\t----#") + chalk.blue("----#") + chalk.green("----#") + chalk.yellow("----\n") +
    chalk.bold(chalk.red("\t  ") + chalk.yellow("DE") + chalk.blue("VF") + chalk.red("OL") +
    chalk.green("DER") + chalk.white(" Icons") + chalk.yellow("  \n")) +
    chalk.red("\t----#") + chalk.blue("----#") + chalk.green("----#") + chalk.yellow("----\n");
        
// SHOW THE TITLE
console.clear()
console.log(title)
    
// PARSE AND HANDLE COMMAND LINE ARGUMENTS
try {
    const cliOptions = commandLineArgs(optionDefinitions)
    const icons = await getAvailableIconsList()
    let folderTarget = ''
    let iconName = ''

    // if no arguments, ask question
    if (Object.entries(cliOptions).length == 0) {
        folderTarget = await askTarget()
        iconName = await askIcon()
        await changeFolderIcons(folderTarget, iconName)
        await exitCLI()
    }

    let versionArg = cliOptions.version || false
    let helpArg = cliOptions.help || false
    let commandArg = cliOptions.command || 'none'
    let targetArg = cliOptions.target || 'none'
    let iconArg = cliOptions.icon || 'none'

    // show the version. Other args are ignored
    if (versionArg) {
        console.log(chalk.yellow("Devfolders version " + CURRENT_VERSION))
        await exitCLI()
    }
    
    // show usage info. Other args are ignored
    if (helpArg) {
        console.log("Usage:")
        console.log("")
        await exitCLI()
    }

    // handle list and remove commands
    if (commandArg != 'none') {
        switch (commandArg) {
            case 'list':
                // show a list of icons available
                console.log(chalk.bold("Available Icons:"))
                icons.forEach(icon => console.log(icon))
                break;
            
            case 'remove':
                // show a list of icons available
                break;
            
            default:
                console.log(chalk.yellow("Invalid command '" + commandArg + "'"))
                break;
        }

        await exitCLI()
    }

    // when flags are passed
    console.log('Target: ' + targetArg + ', Icon: ' + iconArg + '\n')

    if (targetArg != 'current' && targetArg != 'sub') {
        console.log(chalk.yellow('invalid target'))
        folderTarget = await askTarget()      
    }
    else {
        folderTarget = targetArg
    }

    if (icons.includes(iconArg) == false) {
        console.log(chalk.yellow('invalid icon name'))
        iconName = await askIcon()
    }
    else {
        iconName = iconArg
    }

    await changeFolderIcons(folderTarget, iconName)
    await exitCLI()
}
catch (e) {
    // unknown args
    console.log(e)
    console.log(chalk.red("Invalid options"))
    await exitCLI()
}

async function checkForUpdate() {
    try {
        const latestVer = await latestVersion('devfolders')
    
        if(compareVersions(latestVer, CURRENT_VERSION) == 1)
            console.log('\n*New version available (' + latestVer + '). ' +
            '\nRun "npm install -g devfolders" to update');
    }
    catch (err) { 
    }
}

async function exitCLI() {
    await checkForUpdate()
    process.exit(0)
}