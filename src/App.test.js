import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

describe('App component', function () {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    
    function getFetchSpy(response) {
        return jest
            .spyOn(global, 'fetch')
            .mockImplementation(() => {
                return Promise.resolve({
                    json: () => Promise.resolve({items: []})
                });
            });
    }
    
    test('Renders without crashing', () => {
        render(<App />);
    });
    
    test('Calls GET on /items if needed.', async () => {
        const spy = getFetchSpy({items: []});
    
        await act(async () => {
            render(<App />);
        });
    
        expect(spy).toHaveBeenCalled();
        global.fetch.mockRestore();
    });
});
