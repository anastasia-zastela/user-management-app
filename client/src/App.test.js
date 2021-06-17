import 'babel-polyfill';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
        test('render app not loggin', () => {
                const app = render(<App />)
                expect(app.container).toBeInTheDocument()
        })
        test('localStorage null', () => {
                render(<App />)
                expect(JSON.parse(localStorage.getItem('tokens'))).toEqual({
                        accessToken: '',
                        refreshToken: '',
                })
        })
});