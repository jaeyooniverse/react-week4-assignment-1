import { useDispatch, useSelector } from 'react-redux';

import Input from './Input';

import {
  addTask,
  updateTaskTitle,
} from './actions';

export default function InputContainer() {
  const dispatch = useDispatch();

  const { taskTitle } = useSelector((state) => ({
    taskTitle: state.taskTitle,
  }));

  function handleChangeTitle(title) {
    dispatch(updateTaskTitle({ taskTitle: title }));
  }

  function handleClickAddTask() {
    dispatch(addTask());
  }

  return (
    <Input
      value={taskTitle}
      onChange={handleChangeTitle}
      onClick={handleClickAddTask}
    />
  );
}
