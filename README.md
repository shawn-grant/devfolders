
# devfolders (pre-release)
<img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" width="80"/>

CLI tool to change boring folder icons to cool dev-related icons

## Installation
You can install the Devfolders CLI using npm (Node Package Manager). Note that you will need to install [Node.js](https://nodejs.org) and [npm](https://npmjs.org). Installing Node.js should install npm as well.
**Make sure to install it globally with -g**

`npm install -g devfolders`

## Usage
`devfolder` or `devfolder <options>`

Options:

| Option | Description |
| --- | ----------- |
| list | List the available folder icons|
| remove | Undo the folder icons|
| -v, --version | Outputs the current version of devfolder |
| -t, --target | `"sub"` or `"current"`. Specifies which directory to target. Targets current folder if omitted|
| -i, --icon | Specifies which icon to use. See available icons below|

## Examples

Default process with prompts

`> devfolder`

Target all sub-directories

`> devfolder -t sub`

Specify folder icon

`> devfolder -i flutter`

Set the current folder's icon

`> devfolder -t current -i flutter`

Remove the current folder's icon

`> devfolder remove -t current`

---
## Available Icons
- flutter
- reactjs
- android
- unity3d


## TODO
- More icons
- Add macOS and Linux support

## Contributing

### adding icons:

