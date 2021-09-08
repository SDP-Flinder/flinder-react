/**
 * @jest-environment jsdom
 */


import {render, screen} from '@testing-library/react';
import React from 'react';
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