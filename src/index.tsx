import 'whatwg-fetch';
import 'babel-polyfill';

import * as React        from 'react';
import * as ReactDOM     from 'react-dom';
import Root              from './Root';
import { AppContainer }  from 'react-hot-loader';
import {
    createStore, applyMiddleware, compose
}                        from 'redux';
import thunkMiddleWare   from 'redux-thunk';
import rootReducer       from 'src/ducks';
import * as createLogger from 'redux-logger';

//
// STORE
//

const middleware = [
    thunkMiddleWare
].concat(process.env.__DEV__ ? [createLogger({collapsed: true})] : []);

const enhancer = compose(
    applyMiddleware(...middleware)
);

export default function configureStore (initialState) {
    const store = createStore(rootReducer, initialState, enhancer);
    module.hot.accept('./ducks', () => {
        const nextRootReducer = require('./ducks');
        store.replaceReducer(nextRootReducer);
    });
    return store;
};

const store = configureStore({});

//
// Render
//

function renderApp (RootComponent) {
    ReactDOM.render(
        <AppContainer>
            <RootComponent
                store={store}
            />
        </AppContainer>,
        document.getElementById('root')
    );
}

renderApp(Root);

if (module.hot) {
    module.hot.accept(
        './Root',
        () => {
            renderApp(require('./Root').default);
        }
    );
}
