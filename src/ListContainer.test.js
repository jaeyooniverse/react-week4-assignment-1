import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ListContainer from './ListContainer';

jest.mock('react-redux');

describe('ListContainer', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);

  function renderListContainer() {
    return render((
      <ListContainer />
    ));
  }

  function returnUseSelector(tasks) {
    return (
      useSelector.mockImplementation((selector) => selector({
        tasks,
      }))
    );
  }

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '아무 것도 하지 않기 #1' },
      { id: 2, title: '아무 것도 하지 않기 #2' },
    ];

    it('shows existing tasks ', () => {
      returnUseSelector(tasks);

      const { getByText } = renderListContainer();
      expect(getByText(/아무 것도 하지 않기 #1/)).not.toBeNull();
    });

    it('remove task from tasks', () => {
      const { getAllByText } = renderListContainer();

      const completeButton = getAllByText(/완료/)[0];
      expect(completeButton).not.toBeNull();

      fireEvent.click(completeButton);

      expect(dispatch).toBeCalledWith({
        type: 'deleteTask',
        payload: {
          id: 1,
        },
      });
    });
  });

  context('without tasks', () => {
    const emptyTask = [];

    it("shows message: '할 일이 없어요!'", () => {
      returnUseSelector(emptyTask);

      const { getByText } = renderListContainer();
      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });

    it("doesn't have '완료' button", () => {
      const { queryAllByText } = renderListContainer();
      expect(queryAllByText(/완료/)).toHaveLength(0);
    });
  });
});
