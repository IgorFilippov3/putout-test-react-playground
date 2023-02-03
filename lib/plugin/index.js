'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

const t = {
    'task-list-accept-task-prop': 'export const TaskList = (__args) => __body',
};

module.exports.rules = {
    ...getRule('-react-import'),
    ...getRule('+react-import'),
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
