#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import * as fs from 'fs';

async function askTarget() {
    const answer = await inquirer.prompt({
        name: 'target',
        type: 'list',
        message: 'Which folder(s) should be affected?',
        choices: [
            'current folder',
            'sub folders'
        ]
    })

    return answer.target
}

async function askIcon() {
    const answer = await inquirer.prompt({
        name: 'icon',
        type: 'list',
        message: 'Choose an icon',
        choices: [
            'current folder',
            'sub folders'
        ]
    })

    return answer.icon
}

function changeFolderIcons(folderTarget) {
    if (process.platform === "win32") {
        // CHANGE ICON ON WINDOWS
    }
    else if (process.platform === "linux"){
        // CHANGE ICON ON LINUX
        
    }
    else if (process.platform === "darwin"){
        // CHANGE ICON ON MACOS
        
    }
    else {
        console.log(chalk.red("Devfolders not supported on your OS"))
    }
}



export {askTarget, askIcon, changeFolderIcons}