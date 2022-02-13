#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path'
import * as url from 'url'

// ask user for the folder target
async function askTarget() {
    const answer = await inquirer.prompt({
        name: 'target',
        type: 'list',
        message: 'Choose folder(s) to target',
        choices: [
            {
                name: 'Current folder only',
                value: 'current',
            },
            {
                name: 'All subfolders (one level deep)',
                value: 'sub',
            }
        ]
    })

    return answer.target
}

// ask the user for the icon
async function askIcon() {
    const answer = await inquirer.prompt({
        name: 'icon',
        type: 'list',
        message: 'Choose an icon',
        choices: await getAvailableIconsList()
    })

    return answer.icon
}

// change the icons for the target folders
async function changeFolderIcons(folderTarget, iconName) {
    console.log()

    // current folder only
    if (folderTarget == "current") {
        changeIcon(process.cwd(), iconName)
        return;
    }

    // subfolders (1 level deep)
    if (folderTarget == "sub") { 
        const folders = await getSubfolders()
        folders.forEach(folder => changeIcon(path.join(process.cwd(), folder), iconName))
        return;
    }
}

// list the icons available
async function getAvailableIconsList() {
    let list = []
    const projectPath = url.fileURLToPath(import.meta.url.replace('src/devfolder.js', ''))
    
    try {
        // assuming every OS will have the same icons available
        const results = await fs.readdirSync(path.join(projectPath, 'icons', 'windows'))

        results.forEach((file) => {
            list.push(file.split('.')[0])
        })
    }
    catch (error) {
        console.log(error)
    }

    return list
}

// returns a list of subfolders in the CWD
async function getSubfolders() {
    let list = []

    try {
        // assuming every OS will have the same icons available
        await fs.readdirSync(process.cwd(), { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .forEach((folderName) => {
                list.push(folderName)
            })
    }
    catch (error) {
        console.log(chalk.red(error))
    }

    return list
}

// actually change icon, called once, for each folder
async function changeIcon(folderPath, iconName) {
    console.log(chalk.yellow('Changing icon for ' + folderPath))

    const projectPath = url.fileURLToPath(import.meta.url.replace('src/devfolder.js', ''))
    const iconPath = path.join(projectPath, 'icons', 'windows', iconName)

    if (process.platform == 'win32') {
        try {
            // create the icon config file
            await fs.writeFileSync(path.join(folderPath, 'desktop.ini'),
                '[.ShellClassInfo]\n' +
                'IconResource=' + iconPath + '.ico\n' +
                'IconIndex=0')
            
            // run commands to let the system recognize the file
            exec('attrib +r ' + folderPath)
            exec('attrib +s +h ' + folderPath + '/desktop.ini')
        }
        catch (error) {
            console.log(chalk.red(error))
        }
    }
    else if (process.platform == 'linux') {
        
    }
    else if (process.platform == 'darwin') {
        
    }
    else {
        console.log(chalk.red("\nDevfolders not supported on your OS"))
    }
}

export {askTarget, askIcon, changeFolderIcons, getAvailableIconsList}