'use strict';

const {join} = require('path');

const putout = require('putout');
const {readFile} = require('fs/promises');
const plugin = require('./plugin');

const test = async () => {
    const source = await readFile(join(__dirname, '../test/fixture/source.js'), 'utf-8');
    
    console.log(source);
    const {places} = putout(source, {
        fix: false,
        plugins: [
            ['test-react', plugin],
        ],
    });
    
    return places;
};

test().then(console.log);

