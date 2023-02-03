'use strict';

const {types} = require('putout');
const {isImport} = types;

module.exports.report = () => '❌ add react import';

module.exports.match = () => ({
    'import __imports from "__a"': ({__imports, __a}) => {
        return __a.value !== 'react' || !isImport(__imports[0], 'ImportDefaultSpecifier', 'React');
    },
});

module.exports.replace = () => ({
    'import __imports from "__a"': ``,
});

