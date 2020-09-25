import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App';
import { Daewoo } from './models/drivers';

describe("Check that renders correct elements", () => {
  test('renders Menu button', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Menu/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders window text', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/window/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('should open drawer by menu click', async () => {
    const { getByText } = render(<App />);
    const menuElement = getByText(/Menu/i);
    await fireEvent.click(menuElement)
    const typeOfMicrowave = getByText(/type of microwave/i);
    expect(typeOfMicrowave).toBeInTheDocument();
  })
})

describe("Check modes", () => {
  test('renders Menu button', () => {
    const { getByText } = render(<App />);
    const modesElement = getByText(/MyModes/i);
    expect(modesElement).toBeInTheDocument();
  });

  test('setup microwave type', () => {
    const { getByText } = render(<App />);
    const modesElement = getByText(/MyModes/i);
    expect(modesElement).toBeInTheDocument();
  });

  test('can select T1000', async () => {
    const { getByText, getAllByText } = render(<App />);
    const menuElement = getByText(/Menu/i);
    await fireEvent.click(menuElement);

    let inputElem = screen.getByTestId("select").children[0].children[0].children[0];

    await fireEvent.change(inputElem, {
      target: { value: "T1000" },
    });

    const secondOption = getAllByText(/T1000/i)[0];
    expect(secondOption).toBeInTheDocument();
  });
})

describe("Microwave basic functionality", () => {
  test("expect to set timer to 100 and check that it's value setted", () => {
    let microwave = new Daewoo();
    microwave.setTimer(100);
    expect(microwave.getState().timer).toBe(100)
  });

  test("expect to start microwave", () => {
    let microwave = new Daewoo();
    microwave.start();
    expect(microwave.getState().isOn).toBe(true);
  });
  test("expect to stop microwave", () => {
    let microwave = new Daewoo();
    microwave.start();
    expect(microwave.getState().isOn).toBe(true);
    microwave.stop();
    expect(microwave.getState().isOn).toBe(false);
  });
});
