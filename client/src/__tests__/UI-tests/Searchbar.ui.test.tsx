import App from '../../App';
import React from 'react';
import { screen, act } from '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import 'jest-extended';
import { renderWithProviders } from '../../util/test-utils';

describe("searchbar", () => {

  test("Searchbar and search icon are toggleable", async () => {
    renderWithProviders(<App />);

    const searchIcon = await screen.findByTestId(/search-icon/i);
    userEvent.click(searchIcon);
    const searchbar = await screen.findByTestId(/searchbar/i);
    const searchbarInput: any = searchbar.querySelector('input');
    const overlay = await screen.findByTestId(/overlay/i);
    expect(searchbar).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    expect(searchbarInput).toHaveFocus();
    expect(searchIcon).not.toBeInTheDocument();
    await act(() => userEvent.click(overlay));
    expect(searchbar).not.toBeInTheDocument();
    expect(overlay).not.toBeInTheDocument();
  })

  it("closes the searchbar when 'enter' is pressed", async () => {
    renderWithProviders(<App />);

    const searchIcon = await screen.findByTestId(/search-icon/i);
    userEvent.click(searchIcon);
    const searchbar = await screen.findByTestId(/searchbar/i);
    const searchbarInput: any = searchbar.querySelector('input');
    const overlay = await screen.findByTestId(/overlay/i);
    expect(searchbar).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    await act(() => userEvent.type(searchbarInput, '{enter}'));
    expect(searchbar).not.toBeInTheDocument();
    expect(overlay).not.toBeInTheDocument();
  })

  it("maintains the last input when searchbar is reopened", async () => {
    renderWithProviders(<App />);

    let searchIcon = await screen.findByTestId(/search-icon/i);
    userEvent.click(searchIcon);
    let searchbar = await screen.findByTestId(/searchbar/i);
    let searchbarInput: any = searchbar.querySelector('input');
    let overlay = await screen.findByTestId(/overlay/i);
    expect(searchbar).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    expect(searchbarInput.value).toBe('');
    userEvent.type(searchbarInput, 'ba{enter}');
    searchIcon = await screen.findByTestId(/search-icon/i);
    userEvent.click(searchIcon);
    searchbar = await screen.findByTestId(/searchbar/i);
    searchbarInput = searchbar.querySelector('input');
    expect(searchbarInput.value).toBe('ba');
    expect(searchbar).toBeInTheDocument();
  })

  it("correctly filters character cards from user input", async () => {
    renderWithProviders(<App />);

    const searchIcon = await screen.findByTestId(/search-icon/i);
    userEvent.click(searchIcon);
    const searchbar = await screen.findByTestId(/searchbar/i);
    const searchbarInput: any = searchbar.querySelector('input');
    await act(() => userEvent.type(searchbarInput, 'ba'));
    const banjo = await screen.findByTestId('banjo')
    const bayonetta = await screen.findByTestId('bayonetta')
    const bowser = await screen.findByTestId('bowser')
    expect(searchbarInput).toHaveValue('ba');
    expect(banjo.closest('.card-column')).not.toHaveClass('d-none');
    expect(bayonetta.closest('.card-column')).not.toHaveClass('d-none');
    expect(bowser.closest('.card-column')).toHaveClass('d-none'); // .not.toBeInTheDocument() is not working. Possibly due to being a bootstrap d-none class?
    await act(() => userEvent.type(searchbarInput, '{backspace}'));
    expect(searchbarInput).toHaveValue('b');
    expect(bowser).not.toHaveClass('d-none');
  })
})
