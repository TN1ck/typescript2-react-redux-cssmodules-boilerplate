import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from 'src/pages/App';
import Home from 'src/pages/Home';
import Counter from 'src/pages/Counter';
import StateCounter from 'src/pages/StateCounter';

function createRoutes () {
    const routes = (
        <Route path='/' component={ App }>
            <IndexRedirect to='/home' />
            <Route path='/home' component={ Home } />
            <Route path='/counter' component={ Counter } />
            <Route path='/state-counter' component={ StateCounter } />
        </Route>
    );
    return routes;
}

export default createRoutes;
