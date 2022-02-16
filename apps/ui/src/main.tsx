import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

ReactDOM.render(
    <StrictMode>
        <ApiProvider api={api}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApiProvider>
    </StrictMode>,
    document.getElementById('root')
);
