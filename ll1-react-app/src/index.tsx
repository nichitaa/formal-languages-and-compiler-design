import React from 'react';
import {render} from 'react-dom';
import App from './App';
import AppContext from "./context";

const app = (
    <AppContext>
        <App/>
    </AppContext>
)
render(app, document.getElementById('root'));
