# lex-model-validator
Validate Amazon Lex models with ease.

This package checks for all possible errors Amazon Lex could throw while importing, building or even running your language model.

## Quickstart / Installation
to install it locally
```sh
npm install lex-model-validator
```
or globally
```sh
npm install -g lex-model-validator
```

Then you can use the following command to use the CLI.

```sh
lex-model-validator ./path/to/file
```

## CLI
```sh
lex-model-validator <path-to-file> [-v|--verbose]
```
[] = optional


## API
The validator can be used programmatically.
To do that you have to instantiate a new instance of ```LexModelValidator```.
This instance has a function called ```validateJson(json)``` which is the main entry point to use the validator. Pass in an object and the validator do the work.

## TO-DO
Improve Readme
