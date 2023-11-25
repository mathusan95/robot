import { screen, within, render, fireEvent, waitFor, act } from '@testing-library/react';

import NavigationLayoutComponent from '../components/NavigationLayoutComponent';
import { MockContextProvider } from '../utils/MockContext';
import { createArrayUpTo } from '../utils/helperFunctions';

describe('testing NavigationLayout Component', () => {
  const mockValues = {
    handleKeyDown: jest.fn(),
    handleClick: jest.fn(),
    imagePosition: {
      row: 1,
      col: 1
    },
    blinkingId: '',
    configration: {
      row: [5, 4, 3, 2, 1],
      col: [1, 2, 3, 4, 5]
    }
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    // Clear mocks, timers, or reset modules
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.resetModules();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('renders without crashing', () => {
    render(
      <MockContextProvider value={mockValues}>
        <NavigationLayoutComponent
          viewOnly={true}
          configuration={{ row: createArrayUpTo(2).reverse(), col: createArrayUpTo(2) }}
        />
      </MockContextProvider>
    );
  });

  test('layout should have 25 cells when row of 5 and column of 5 passed as props', () => {
    const { container } = render(
      <MockContextProvider value={{ mockValues }}>
        <NavigationLayoutComponent
          viewOnly={true}
          configuration={{ row: createArrayUpTo(5).reverse(), col: createArrayUpTo(5) }}
        />
      </MockContextProvider>
    );
    const cells = within(container).queryAllByTestId(/cell-/);
    expect(cells.length).toBe(25);
  });

  test('image should be in the cell 2-2 when imagePosition of row = 2 and col = 2 passed as props and when viewOnly is false', () => {
    render(
      <MockContextProvider
        value={{
          ...mockValues,
          imagePosition: {
            row: 2,
            col: 2
          }
        }}
      >
        <NavigationLayoutComponent
          viewOnly={false}
          configuration={{ row: createArrayUpTo(5).reverse(), col: createArrayUpTo(5) }}
        />
      </MockContextProvider>
    );
    const cell = screen.getByTestId('cell-2-2');
    const icon = cell.querySelector('.robot-icon');
    expect(icon).toBeInTheDocument();
  });

  test('image should not be there when viewOnly props is passed as true', () => {
    render(
      <MockContextProvider
        value={{
          ...mockValues,
          imagePosition: {
            row: 2,
            col: 2
          }
        }}
      >
        <NavigationLayoutComponent
          viewOnly={true}
          configuration={{ row: createArrayUpTo(5).reverse(), col: createArrayUpTo(5) }}
        />
      </MockContextProvider>
    );
    const cell = screen.getByTestId('cell-2-2');
    const icon = cell.querySelector('.robot-icon');
    expect(icon).not.toBeInTheDocument();
  });

  // test delay functionality
  /* claculation of time (delay)
  target cell => 5-5
  initial position 1-1

  no of boxes to cover => (5-1) + (5-1) => 8 boxes
  delaytime = 400 * 8 = 3200 ms
  */

  test('when a cell of 5-5 is clicked the image should appear in the cell after 3200ms ', async () => {
    const { rerender } = render(
      <MockContextProvider
        value={{
          ...mockValues,
          imagePosition: {
            row: 1,
            col: 1
          }
        }}
      >
        <NavigationLayoutComponent
          viewOnly={false}
          configuration={{ row: createArrayUpTo(5).reverse(), col: createArrayUpTo(5) }}
        />
      </MockContextProvider>
    );

    const cellToBeclicked = screen.getByTestId('cell-5-5');
    fireEvent.click(cellToBeclicked);

    //check whether image is there before
    const cellBeforeDelay = screen.getByTestId('cell-5-5');
    expect(cellBeforeDelay.querySelector('.robot-icon')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1600);
    });

    await waitFor(
      // the image should not be there before 3200 ms
      () => {
        const cellAfterDelay = screen.getByTestId('cell-5-5');
        const iconAfterDelay = cellAfterDelay.querySelector('.robot-icon');
        expect(iconAfterDelay).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );

    act(() => {
      jest.advanceTimersByTime(1600);
    });

    rerender(
      <MockContextProvider
        value={{
          ...mockValues,
          imagePosition: {
            row: 5,
            col: 5
          }
        }}
      >
        <NavigationLayoutComponent
          viewOnly={false}
          configuration={{ row: createArrayUpTo(5).reverse(), col: createArrayUpTo(5) }}
        />
      </MockContextProvider>
    );

    const cellAfterFullDelay = screen.getByTestId('cell-5-5');
    const iconAfterFullDelay = cellAfterFullDelay.querySelector('.robot-icon');
    expect(iconAfterFullDelay).toBeInTheDocument();
  });

  test('when blinking id is there the specific cell should have .blinking class', async () => {
    const { rerender } = render(
      <MockContextProvider
        value={{
          ...mockValues,
          imagePosition: {
            row: 1,
            col: 1
          },
          blinkingId: '5-5'
        }}
      >
        <NavigationLayoutComponent
          viewOnly={false}
          configuration={{ row: createArrayUpTo(5).reverse(), col: createArrayUpTo(5) }}
        />
      </MockContextProvider>
    );

    const cellToBeBlinked = screen.getByTestId('cell-5-5');
    expect(cellToBeBlinked).toHaveClass('blinking');
  });

  test('when blinking id is present other cells should have class of .disabled excpet the blinking cell(5-5) ', async () => {
    const { container } = render(
      <MockContextProvider
        value={{
          ...mockValues,
          imagePosition: {
            row: 1,
            col: 1
          },
          blinkingId: '5-5'
        }}
      >
        <NavigationLayoutComponent
          viewOnly={false}
          configuration={{ row: createArrayUpTo(5).reverse(), col: createArrayUpTo(5) }}
        />
      </MockContextProvider>
    );

    const allCells = within(container).queryAllByTestId(/cell-/);
    const allCellsExceptCell55 = allCells.filter((cell) => cell.dataset.testid !== 'cell-5-5');
    const allHaveClass = allCellsExceptCell55.every((cell) => cell.classList.contains('disabled'));
    expect(allHaveClass).toBe(true);
  });

  test('when blinking id is present handleClick should not triggered when clicking all the cells', async () => {
    const handleClick = jest.fn();
    const { container } = render(
      <MockContextProvider
        value={{
          ...mockValues,
          imagePosition: {
            row: 1,
            col: 1
          },
          blinkingId: '5-5',
          handleClick: handleClick
        }}
      >
        <NavigationLayoutComponent
          viewOnly={false}
          configuration={{ row: createArrayUpTo(5).reverse(), col: createArrayUpTo(5) }}
        />
      </MockContextProvider>
    );
    const allCells = within(container).queryAllByTestId(/cell-/);

    allCells.forEach((cell) => {
      fireEvent.click(cell);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
