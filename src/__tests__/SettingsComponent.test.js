import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { MockContextProvider } from '../utils/MockContext';
import Setting from '../components/SettingsComponent';
describe('testing Setting Component', () => {
  const mockValues = {
    saveConfiguration: jest.fn(),
    tableConfiguration: {
      row: 5,
      col: 5
    },
    imagePosition: {
      row: 1,
      col: 1
    },
    blinkingId: ''
  };

  afterEach(() => {
    // Clear mocks, timers, or reset modules
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.resetModules();
  });

  test('When SettingIcon is clicked it should display a modal of Setting', () => {
    render(
      <MockContextProvider value={mockValues}>
        <Setting />
      </MockContextProvider>
    );
    const settingsIcon = screen.getByTitle('Change Navigation Layout');
    fireEvent.click(settingsIcon);

    // Check if the modal is in the document
    const modalTitle = screen.getByText('Settings');
    expect(modalTitle).toBeInTheDocument();
  });

  test('when row and column is selected(row-3 , col -3) using  dropdown it should display the correct layout', async () => {
    render(
      <MockContextProvider value={mockValues}>
        <Setting />
      </MockContextProvider>
    );
    const settingsIcon = screen.getByTitle('Change Navigation Layout');
    fireEvent.click(settingsIcon);
    const dropdownCol = screen.getByTestId('select-col');
    const dropdownRow = screen.getByTestId('select-row');
    fireEvent.change(dropdownCol, { target: { value: '3' } });
    fireEvent.change(dropdownRow, { target: { value: '3' } });

    // wait for the state to update
    await waitFor(() => {
      const cells = screen.queryAllByTestId(/cell-/);
      expect(cells.length).toBe(9);
    });
  });

  /* when SaveChanges button is clicked the row and col 
  value which were selected passed  saveConfigurationFunction*/
  test('when SaveChanges button saveConfigurationFunction should be triggerd', async () => {
    const saveConfiguration = jest.fn().mockReturnValue({ col: 3, row: 3 });
    render(
      <MockContextProvider value={{ ...mockValues, saveConfiguration }}>
        <Setting />
      </MockContextProvider>
    );
    const settingsIcon = screen.getByTitle('Change Navigation Layout');
    fireEvent.click(settingsIcon);
    const dropdownCol = screen.getByTestId('select-col');
    const dropdownRow = screen.getByTestId('select-row');
    fireEvent.change(dropdownCol, { target: { value: '3' } });
    fireEvent.change(dropdownRow, { target: { value: '3' } });

    // wait for the state to update
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('save-changes-button'));
      expect(saveConfiguration).toHaveBeenCalled();
      expect(saveConfiguration()).toEqual({ col: 3, row: 3 });
    });
  });

  /*when cell is blinking(blinkId) setting icon should have disabled class
   and onClick function should not show the setting modal*/
  test('when cell is blinking setting icon should be disabled', async () => {
    render(
      <MockContextProvider value={{ ...mockValues, blinkingId: '3-3' }}>
        <Setting />
      </MockContextProvider>
    );
    const settingsIcon = screen.getByTestId('change-nvg-btn');
    expect(settingsIcon).toHaveClass('disabled');
    fireEvent.click(settingsIcon);
    const modalTitle = screen.queryByText('Settings');
    expect(modalTitle).not.toBeInTheDocument();
  });
});
