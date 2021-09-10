/**
 * @jest-environment jsdom
 */


import {render, screen} from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import FlatAddress from '../components/FlatSteps/FlatAddress';

test("Next button is disabled when a textfield is empty", async () => {
    const formData = {
        address : {},
        existingFlatmates : 0,
        description : '',
    }
    render(<FlatAddress formData = {formData} />);

    expect(await screen.findByRole('button', {name: /next/i})).toBeDisabled;
})

test("Next button is enabled when user enter all the information", async () => {
    const formData = {
        address : {},
        existingFlatmates : 0,
        description : '',
    }
    render(<FlatAddress formData = {formData} />);

    userEvent.type(screen.getByPlaceholderText(/Number of flatmates/i), "3");
    userEvent.type(screen.getByPlaceholderText(/brief description/i), "This is a house...");


    expect(await screen.findByRole('button', {name: /next/i})).toBeEnabled;
})