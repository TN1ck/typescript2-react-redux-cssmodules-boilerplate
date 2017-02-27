import * as React from 'react';
import * as Grid  from 'src/components/Grid';

class StateCounter extends React.Component<{}, {
    counter: number,
    counts: number
}> {
    constructor (props) {
        super(props);
        this.state = {
            counter: 0,
            counts: 0
        };
        this.countUp = this.countUp.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    countUp () {
        this.setState({
            counter: this.state.counter + 1,
            counts: this.state.counts + 1
        });
    }
    countDown () {
        this.setState({
            counter: this.state.counter - 1,
            counts: this.state.counts + 1
        });
    }
    render () {
        const {
            counter,
            counts
        } = this.state;
        return (
            <div>
                <Grid.Container>
                    <Grid.Row>
                        <Grid.Col xs={12}>
                            <h1>{'State Counter 2'}</h1>
                            <p>
                                {`
                                    We already counted ${counts}
                                    and have a current value of ${counter}
                                `}
                            </p>
                            <button onClick={this.countUp}>{'count up'}</button>
                            <button onClick={this.countDown}>{'count down'}</button>
                        </Grid.Col>
                    </Grid.Row>
                </Grid.Container>
            </div>
        );

    }
};

export default StateCounter;
