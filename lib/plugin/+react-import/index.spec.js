'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    '+react-import': plugin,
});

test('+react-import: report', (t) => {
    t.report('react-import', '✅ add react import');
    t.end();
});

test('+react-import: transform', (t) => {
    t.transform('react-import');
    t.end();
});

