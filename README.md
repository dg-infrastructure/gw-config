# Gruntwork Config Library

## Purpose

This is a hierarchial configuration library that allows for easy use of retreiving configuration from various sources.

## Configuration

gw-config will import configuration values from multiple sources and will merge them, eliminating the conflicts. The
library will respect configuration from least precedence (1) to highest precedence (3):

1. default config
1. NODE_ENV specific config
1. environment variables

#### Config Dir

All the configuration files for `gw-config` will be located in the `/config` directory unless it is overridden by 
specifying the `GW_CONFIG_DIR` env variable. 

#### Default Config

The deafult configuration is stored in a file named `default.json` in the config directory.

#### NODE_ENV specific config

The `NODE_ENV` specific config is stored in a filed named `{env}.json` (for example, `test.json` or `production.json`).

## Usage


```json
# default.json

{
  "myApp": {
    "myKey": "myValue"
  }
}
```

```javascript
const config = require('gw-config');
let val = config.get('myApp:myKey');

assert(val==='myValue');
```

## Versioning

We are following the principles of [Semantic Versioning](http://semver.org/). During initial development, the major
version is to 0 (e.g., `0.x.y`), which indicates the code does not yet have a stable API. Once we hit `1.0.0`, we will
follow these rules:

1. Increment the patch version for backwards-compatible bug fixes (e.g., `v1.0.8 -> v1.0.9`).
2. Increment the minor version for new features that are backwards-compatible (e.g., `v1.0.8 -> 1.1.0`).
3. Increment the major version for any backwards-incompatible changes (e.g. `1.0.8 -> 2.0.0`).

The version is defined using Git tags.  Use GitHub to create a release, which will have the effect of adding a git tag.


## Gruntwork License

Copyright (c) 2017 Gruntwork, Inc.

This code is the property of Gruntwork, Inc. In the Software Development Agreement signed by both Gruntwork and your
company, Gruntwork grants you a limited license to use, modify, and create derivative works of this code. Please
consult the Software Development Agreement for the complete terms under which you may use this code. 
