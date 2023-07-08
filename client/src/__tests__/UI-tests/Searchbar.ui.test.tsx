import App from '../../App';
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import 'jest-extended';
import { renderWithProviders } from '../../util/test-utils';

describe("searchbar", () => {

  test("Searchbar and search icon are toggleable", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const searchIcon = await screen.findByTestId(/search-icon/i);
    await user.click(searchIcon);
    const searchbar = screen.getByTestId(/searchbar/i);
    const searchbarInput: any = searchbar.querySelector('input');
    const overlay = screen.getByTestId(/overlay/i);
    expect(searchbar).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    expect(searchbarInput).toHaveFocus();
    expect(searchIcon).not.toBeInTheDocument();
    await user.click(overlay);
    expect(searchbar).not.toBeInTheDocument();
    expect(overlay).not.toBeInTheDocument();
  })

  it("closes the searchbar when 'enter' is pressed", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const searchIcon = await screen.findByTestId(/search-icon/i);
    await user.click(searchIcon);
    const searchbar = screen.getByTestId(/searchbar/i);
    const searchbarInput: any = searchbar.querySelector('input');
    const overlay = screen.getByTestId(/overlay/i);
    expect(searchbar).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    await user.type(searchbarInput, '{enter}');
    expect(searchbar).not.toBeInTheDocument();
    expect(overlay).not.toBeInTheDocument();
  })

  it("maintains the last input when searchbar is reopened", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    let searchIcon = await screen.findByTestId(/search-icon/i);
    await user.click(searchIcon);
    let searchbar = screen.getByTestId(/searchbar/i);
    let searchbarInput: any = searchbar.querySelector('input');
    let overlay = screen.getByTestId(/overlay/i);
    expect(searchbar).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    expect(searchbarInput.value).toBe('');
    user.type(searchbarInput, 'ba{enter}');
    searchIcon = await screen.findByTestId(/search-icon/i);
    await user.click(searchIcon);
    searchbar = screen.getByTestId(/searchbar/i);
    searchbarInput = searchbar.querySelector('input');
    expect(searchbarInput.value).toBe('ba');
    expect(searchbar).toBeInTheDocument();
  })

  it("correctly filters character cards from user input", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const searchIcon = await screen.findByTestId(/search-icon/i);
    await user.click(searchIcon);
    const searchbar = await screen.findByTestId(/searchbar/i);
    const searchbarInput: any = searchbar.querySelector('input');
    await user.type(searchbarInput, 'ba');
    const banjo = screen.getByTestId('banjo').closest('.card-column');
    const bayonetta = screen.getByTestId('bayonetta').closest('.card-column');
    const bowser = screen.getByTestId('bowser').closest('.card-column');
    expect(searchbarInput).toHaveValue('ba');
    expect(banjo).not.toHaveClass('d-none');
    expect(bayonetta).not.toHaveClass('d-none');
    expect(bowser).toHaveClass('d-none'); // .not.toBeInTheDocument() is not working. Possibly due to being a bootstrap d-none class?
    await user.type(searchbarInput, '{backspace}');
    expect(searchbarInput).toHaveValue('b');
    expect(bowser).not.toHaveClass('d-none');
  })
})
