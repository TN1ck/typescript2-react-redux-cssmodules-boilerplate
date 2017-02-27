import * as React from 'react';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { Store } from 'redux';
import createRoutes from './routes';

// import it here to activate hot-reloading for css
// (see index.tsx and search for module.hot)
import './styles/index.global.css';


class Root extends React.Component<React.Props<any> & {
    store: Store<any>,
}, {}> {
    render () {
        // there are some issues with hot-reloading, setting a random key helps
        // it to work better, not super clear where the issue is
        // https://github.com/reactjs/react-router-redux/issues/179#issuecomment-275576250
        // it reset the component-state though, so it's not activated
        return (
            <Provider store={this.props.store}>
                <Router
                    history={browserHistory}
                    routes={createRoutes()}
                />
            </Provider>
        );
    }
};

export default Root;
