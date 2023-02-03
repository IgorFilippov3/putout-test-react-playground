const putout = require('putout');
const { readFile } = require('fs/promises');

const test = async () => {
  const source = await readFile('./source.js', 'utf-8');

  const t = {
    'task-list-accept-task-prop': 'export const TaskList = (__args) => __body',
  };

  const rules = {
    '-import-react': {
      report: () => '❌ add react import',
      match: () => ({
        'import __imports from "__a"': ({ __imports, __a}, path) => {
          return __a.value !== 'react' || !isImport(__imports[0], 'ImportDefaultSpecifier', 'React');
        }
      }),
      replace: () => ({
        'import __imports from "__a"': ``
      })
    },
    '+import-react': {
      report: () => '✅ add react import',
      match: () => ({
        'import __imports from "__a"': ({ __imports, __a}) => {
          return __a.value === 'react' && isImport(__imports[0], 'ImportDefaultSpecifier', 'React');
        }
      }),
      replace: () => ({
        'import __imports from "__a"': ``
      })
    },
    '-task-list-accept-task-prop': {
      report: () => '❌ &lt;TaskList> component should accept a tasks prop',
      match: () => ({
        [t['task-list-accept-task-prop']]: ({ __args }) => {
          try {
            return __args[0].properties[0].value.name !== 'tasks';
          } catch (e) {
            return true;
          }
        }
      }),
      replace: () => ({ [t['task-list-accept-task-prop']]: '' })
    },
    '+task-list-accept-task-prop': {
      report: () => '✅ &lt;TaskList> component should accept a tasks prop',
      match: () => ({
        [t['task-list-accept-task-prop']]: ({ __args }) => {
          try {
            return __args[0].properties[0].value.name === 'tasks';
          } catch (e) {
            return false;
          }
        }
      }),
      replace: () => ({ [t['task-list-accept-task-prop']]: '' })
    },
  };
  
  const { places } = putout(source, {
    fix: false,
    plugins: [
      ['test-react', { rules }],
    ]
  });

  return places;
}

test().then(r => console.log(r));

const isImport = (__import, type, name) => {
  if (!__import) return false;
  return __import.type === type && __import.local.name === name;
}





// places contains array of elements
// ({
//     rule: '+add-click',
//     places: [{
//         message: '✅ add "click"',
//         position: {
//             line: 12,
//             column: 0,
//         }
//     }],
// });