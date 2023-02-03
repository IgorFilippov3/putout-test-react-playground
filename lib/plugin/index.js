'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

const t = {
    'task-list-accept-task-prop': 'export const TaskList = (__args) => __body',
};

const isImport = (__import, type, name) => {
    if (!__import)
        return false;
    
    return __import.type === type && __import.local.name === name;
};

module.exports.rules = {
    ...getRule('-react-import'),
    '+import-react': {
        report: () => '✅ add react import',
        match: () => ({
            'import __imports from "__a"': ({__imports, __a}) => {
                return __a.value === 'react' && isImport(__imports[0], 'ImportDefaultSpecifier', 'React');
            },
        }),
        replace: () => ({
            'import __imports from "__a"': ``,
        }),
    },
    '-task-list-accept-task-prop': {
        report: () => '❌ &lt;TaskList> component should accept a tasks prop',
        match: () => ({
            [t['task-list-accept-task-prop']]: ({__args}) => {
                try {
                    return __args[0].properties[0].value.name !== 'tasks';
                } catch {
                    return true;
                }
            },
        }),
        replace: () => ({[t['task-list-accept-task-prop']]: ''}),
    },
    '+task-list-accept-task-prop': {
        report: () => '✅ &lt;TaskList> component should accept a tasks prop',
        match: () => ({
            [t['task-list-accept-task-prop']]: ({__args}) => {
                try {
                    return __args[0].properties[0].value.name === 'tasks';
                } catch {
                    return false;
                }
            },
        }),
        replace: () => ({[t['task-list-accept-task-prop']]: ''}),
    },
};
