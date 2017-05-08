import React from 'react';
import { Router, Route, hasHistory, IndexRoute } from 'react-router';
import { Home, Welcome, About, Contact } from './components';

const routes = (
    `<Router history = { hasHistory } >
        <Route path = "/" component = { Home } >
            <IndexRoute component = { Welcome } >
            <Route path = "/about" component = { About }/>
            <Route path = "/contact" component = { Contact }/>
            </IndexRoute>
        </Route> 
    </Router >`
);

export default routes;