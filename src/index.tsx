import 'whatwg-fetch';
import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';

import configureStore from 'src/store/configureStore';
const store = configureStore({});

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
        './Root.tsx',
        () => renderApp(require('./Root.tsx').default)
    );
}
