import * as React      from 'react';

import * as Grid       from 'src/components/Grid';
import * as Navigation from 'src/components/Navigation';

const App: React.StatelessComponent<React.Props<{}>> = function (props) {
    return (
        <div>
            <Grid.Container>
                <Grid.Row>
                    <Navigation.Wrapper>
                        <Navigation.Item to={'/home'}>{'Home'}</Navigation.Item>
                        <Navigation.Item to={'/counter'}>{'Redux Counter'}</Navigation.Item>
                        <Navigation.Item to={'/state-counter'}>{'State Counter'}</Navigation.Item>
                    </Navigation.Wrapper>
                </Grid.Row>
            </Grid.Container>
            {props.children}
        </div>
    );
};

export default App;
