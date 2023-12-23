# CalmByte CLI

The CalmByte CLI is a command-line interface tool for creating ReactJS components.

## Development Setup

### Prerequisites

- Install [Node.js] which includes [Node Package Manager][npm]

Install CalmByte CLI globally:

```
npm install -g @calmbyte/cli
```

## Documentation

For help

```
cb --help
```

### Commands

| Command      | Alias | Description                       |
| ------------ | ----- | --------------------------------- |
| **generate** | **g** | **Generates and/or modify files** |

### Generating component

```
cb generate [options] component <name>
```

```
cb generate -p src/molecules component Avatar
```

### Options

| Option          | Alias     | Description                                                             | Default value |
| --------------- | --------- | ----------------------------------------------------------------------- | ------------- |
| **--extension** | **--ext** | **File extension ts/js/tsx/jsx**                                        | **tsx**       |
| **--path**      | **--p**   | **File path**                                                           | **./**        |
| **--dry**       | **--d**   | **Dry run**                                                             |
| **--type**      | **--t**   | **Component as function declaration or function expression (dcl/expr)** | **dcl**       |

[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm
