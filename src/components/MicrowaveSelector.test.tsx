import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import { MicrowaveSelector } from './MicrowaveSelector'
import '@testing-library/jest-dom/extend-expect'

describe("Check selector", () => {
  test('can select T1000', async () => {
    const { getAllByText } = render(<MicrowaveSelector />);
    let inputElem = screen.getByTestId("select").children[0].children[0].children[0];

    await fireEvent.change(inputElem, {
      target: { value: "T1000" },
    });

    const secondOption = getAllByText(/T1000/i)[0];
    expect(secondOption).toBeInTheDocument();
  });
})
