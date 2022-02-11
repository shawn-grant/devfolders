
# devfolders
<img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" width="80"/>

CLI tool to change boring folder icons to cool dev-related icons

## Installation
Requires nodejs installed

## Usage
`npx devfolder`

Options:

| flag | Description |
| --- | ----------- |
| -v, --version | Outputs the current version of devfolders |
|-t, --target| "sub" or "current". Specifies which directory to target. Targets current folder if omitted|
|-i, --icon | Specifies which icon to use. See available icons below|

## Examples

Default process with prompts

`> npx devfolder`

Target all sub-directories

`> npx devfolder -t sub`

Specify folder icon

`> npx devfolder -i flutter`

Multiple flags

`> npx devfolder -t current -i flutter`

---
## Available Icons
- flutter
- reactjs
- android
- unity3d