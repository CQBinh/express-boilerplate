#!/bin/bash
# sudo babel-node app.js --presets es2015,stage-3
sudo NODE_ENV=production babel-node app.js -r babel-register