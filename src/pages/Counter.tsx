import * as React                         from 'react';

import {connect}                          from 'react-redux';
import {countUp, countDown, CounterState} from 'src/ducks/counter';

import * as Grid                          from 'src/components/Grid';

const Counter: React.StatelessComponent<{
    currentlySelected: string,
    counter: CounterState,
    countUp: () => any,
    countDown: () => any
}> = function _Counter (props) {
    return (
        <div>
            <Grid.Container>
                <Grid.Row>
                    <Grid.Col xs={12}>
                        <h1>{'Redux Counter'}</h1>
                        <p>
                            {`
                                We already counted ${props.counter.counts}
                                and have a current value of ${props.counter.counter}
                            `}
                        </p>
                        <button onClick={props.countUp}>{'count up'}</button>
                        <button onClick={props.countDown}>{'count down'}</button>
                    </Grid.Col>
                </Grid.Row>
            </Grid.Container>
        </div>
    );
};

export default connect(
    function (state) {
        return {
            counter: (state.counter as CounterState)
        };
    },
    function (dispatch) {
        return {
            countUp: () => dispatch(countUp()),
            countDown: () => dispatch(countDown()),
        };
    }
)(Counter);
