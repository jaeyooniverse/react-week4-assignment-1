export default function reducer(state, action) {
  const { newId, taskTitle, tasks } = state;

  if (action.type === 'updateTaskTitle') {
    return {
      ...state,
      taskTitle: action.payload.taskTitle,
    };
  }

  if (action.type === 'addTask') {
    return {
      ...state,
      newId: newId + 1,
      tasks: [...tasks, {
        id: newId,
        title: taskTitle,
      }],
    };
  }
  return state;
}
