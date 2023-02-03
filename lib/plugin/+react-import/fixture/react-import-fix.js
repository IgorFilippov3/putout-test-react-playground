// можно ли захендлить случай если импорт не написали вообще
export const TaskList = ({ tasks }) => { // можно ли обработать export
  const renderTasks = (tasks) => { // как лучше тестировать вложенную ф-ю если по-сути она повторяет родителя
    return tasks.map(t => <div key={t}>{t}</div>)
  }

  if (tasks.length === 0) {
    return <div>There are no tasks, yet. Try to add one.</div>;
  }

  return <div>{renderTasks(tasks)}</div>;
}