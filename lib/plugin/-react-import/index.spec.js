'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'no-react-import': plugin,
});

test('no-react-import: report', (t) => {
    t.report('no-react-import', '❌ add react import');
    t.end();
});

test('no-react-import: transform', (t) => {
    t.transform('no-react-import');
    t.end();
});

