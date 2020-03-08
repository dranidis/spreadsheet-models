# Developing and testing a Typescript library for Google Apps Script [![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

The aim is to develop and use a library for Google Apps Scripts (GAS) using Typescript and clasp.

Objectives:

* develop locally using Typescript
* deploy easily with clasp
* use the deployed library without any modifications after deployment
  
  * Use as a GAS library offering auto completion 

The organization and the content of the configuration files is largely based on the: https://github.com/PopGoesTheWza/ts-gas-project-starter project.

# Library repo: dranidis/spreadsheet-models

This repository has the code for the library.

The library functions are declared in the namespace SheetLib.


# Testing repo: dranidis/test-spreadsheet-models

This repository is a consumer for the library found in repo:
dranidis/spreadsheet-models

The library is installed in the test repo as a npm dependency:

```
npm i --save-dev dranidis/spreadsheet-models
```

**IMPORTANT**: to compile the code, add  spreadsheet-models in the types in tsconfig.json.

```
    "types": [
      "google-apps-script", 
      "spreadsheet-models"
    ],
```
This is the only way for ts compiler to recognize SheetLib as valid name.

## Installation and Deployment

### Library 

### Client 

```
git clone https://github.com/dranidis/test-spreadsheet-models.git
npm install
```

Edit .clasp.json with your own client script id.

Edit the appsscript.json file in the client: replace the libraryId with the correct script id from your library GAS script. You should also set the correct version (if changed) and the developmentMode (if true you only need to create one version and work with this till tested).

Write your client code.

```
npm run deploy
```





In the web script editor at the library script:

* File -> Manage versions -> Save new version (at least one version needs to be saved for using it as a library)




## Unresolved Problems

* Autocompletion in the web script editor identifies functions as objects.

    * Not a big issue if the development is performed locally using clasp.

## Resolved issues

* Declarations of the library functions appear last in the generated script.
  * Only index.ts is compiled; it determines the order of contents in the final js file.