#!/usr/bin/env node

// windows shell commands
// attrib +r "path_to_folder"
// attrib +s +h "path_to_folder/desktop.ini"

// you may want to ignore it in .gitignore files
import commandLineArgs from 'command-line-args';
import chalk from 'chalk';
import {askTarget, askIcon, changeFolderIcons} from './devfolder.js'

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
        

// DO THE STUFF
console.clear()
console.log(title)
try {
    const options = commandLineArgs(optionDefinitions)

    let commandArg = options.command || 'none'
    let versionArg = options.version || false
    let helpArg = options.help || false
    let targetArg = options.target || 'none'
    let iconArg = options.icon || 'none'
    
    // if no arguments, ask question
    if (Object.entries(options).length == 0) {
        await askTarget()
        await askIcon()
        await changeFolderIcons()
        process.exit(0)
    }

    // handle list and remove commands
    if (commandArg != 'none') {
        switch (commandArg) {
            case 'list':
                // show a list of icons available
                break;
            
            case 'remove':
                // show a list of icons available
                break;
        }

        process.exit(0)
    }

}
catch (e) {
    // unknown args
    console.log(e)
    console.log(chalk.red("Invalid options"))
}