import { render, screen, fireEvent } from '@testing-library/react';

import Navigation from '../components/NavigationComponent';
import { MockContextProvider } from '../utils/MockContext';

describe('testing Navigation component ', () => {
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

  afterEach(() => {
    // Clear mocks, timers, or reset modules
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.resetModules();
  });
  test('it should render a Navigation title', () => {
    render(
      <MockContextProvider value={{ mockValues }}>
        <Navigation />
      </MockContextProvider>
    );
    const navigationText = screen.getByText('Navigation');
    expect(navigationText).toBeInTheDocument();
  });

  test('it should have a upArrow,downArrow,leftArrow,rightArrow element', () => {
    render(
      <MockContextProvider value={mockValues}>
        <Navigation />
      </MockContextProvider>
    );
    const upArrow = screen.getByTestId('upArrow');
    const downArrow = screen.getByTestId('downArrow');
    const leftArrow = screen.getByTestId('leftArrow');
    const rightArrow = screen.getByTestId('rightArrow');
    expect(upArrow).toBeInTheDocument();
    expect(downArrow).toBeInTheDocument();
    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).toBeInTheDocument();
  });

  // test logic for handle click - upArrow
  test('when upArrow button is clicked it should call handleKeyDown function from Context and return a value ', () => {
    const handleKeyDown = jest.fn().mockReturnValue({ key: 'ArrowUp' });
    render(
      <MockContextProvider value={{ handleKeyDown }}>
        <Navigation />
      </MockContextProvider>
    );
    fireEvent.click(screen.getByTestId('upArrow'));
    expect(handleKeyDown).toHaveBeenCalled();
    expect(handleKeyDown()).toEqual({ key: 'ArrowUp' });
  });

  // test logic for handle click - downArrow
  test('when upArrow button is clicked it should call handleKeyDown function from Context and return a value ', () => {
    const handleKeyDown = jest.fn().mockReturnValue({ key: 'ArrowDown' });
    render(
      <MockContextProvider value={{ handleKeyDown }}>
        <Navigation />
      </MockContextProvider>
    );
    fireEvent.click(screen.getByTestId('upArrow'));
    expect(handleKeyDown).toHaveBeenCalled();
    expect(handleKeyDown()).toEqual({ key: 'ArrowDown' });
  });

  // test logic for handle click - leftArrow
  test('when upArrow button is clicked it should call handleKeyDown function from Context and return a value ', () => {
    const handleKeyDown = jest.fn().mockReturnValue({ key: 'ArrowLeft' });
    render(
      <MockContextProvider value={{ handleKeyDown }}>
        <Navigation />
      </MockContextProvider>
    );
    fireEvent.click(screen.getByTestId('upArrow'));
    expect(handleKeyDown).toHaveBeenCalled();
    expect(handleKeyDown()).toEqual({ key: 'ArrowLeft' });
  });

  // test logic for handle click - rightArrow
  test('when upArrow button is clicked it should call handleKeyDown function from Context and return a value ', () => {
    const handleKeyDown = jest.fn().mockReturnValue({ key: 'ArrowRight' });
    render(
      <MockContextProvider value={{ handleKeyDown }}>
        <Navigation />
      </MockContextProvider>
    );
    fireEvent.click(screen.getByTestId('upArrow'));
    expect(handleKeyDown).toHaveBeenCalled();
    expect(handleKeyDown()).toEqual({ key: 'ArrowRight' });
  });

  // test the movement when cell is blinking
  test('when blink Id is present upward movement should be disabled ', () => {
    const handleKeyDown = jest.fn().mockReturnValue({ key: 'ArrowRight' });
    render(
      <MockContextProvider value={{ blinkingId: '1-1', handleKeyDown }}>
        <Navigation />
      </MockContextProvider>
    );
    fireEvent.click(screen.getByTestId('upArrow'));
    expect(handleKeyDown).not.toHaveBeenCalled();
  });

  test('when blink Id is present downward movement should be disabled ', () => {
    const handleKeyDown = jest.fn().mockReturnValue({ key: 'ArrowDown' });
    render(
      <MockContextProvider value={{ blinkingId: '1-1', handleKeyDown }}>
        <Navigation />
      </MockContextProvider>
    );
    fireEvent.click(screen.getByTestId('downArrow'));
    expect(handleKeyDown).not.toHaveBeenCalled();
  });

  test('when blink Id is present left movement should be disabled ', () => {
    const handleKeyDown = jest.fn().mockReturnValue({ key: 'ArrowLeft' });
    render(
      <MockContextProvider value={{ blinkingId: '1-1', handleKeyDown }}>
        <Navigation />
      </MockContextProvider>
    );
    fireEvent.click(screen.getByTestId('leftArrow'));
    expect(handleKeyDown).not.toHaveBeenCalled();
  });

  test('when blink Id is present right movement should be disabled ', () => {
    const handleKeyDown = jest.fn().mockReturnValue({ key: 'ArrowRight' });
    render(
      <MockContextProvider value={{ blinkingId: '1-1', handleKeyDown }}>
        <Navigation />
      </MockContextProvider>
    );
    fireEvent.click(screen.getByTestId('rightArrow'));
    expect(handleKeyDown).not.toHaveBeenCalled();
  });
});
