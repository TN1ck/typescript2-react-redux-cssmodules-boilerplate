const COUNT_UP = 'counter/COUNT_UP';
const COUNT_DOWN = 'counter/COUNT_DOWN';

interface CounterMessage {
    type: string;
};

export function countUp () {
    return {
        type: COUNT_UP
    };
}

export function countDown () {
    return {
        type: COUNT_DOWN
    };
}

export interface CounterState {
    counter: number;
    counts: number;
};

const INITIAL_STATE: CounterState = {
    counter: 0,
    counts: 0
};

export default function counterReducer (state: CounterState = INITIAL_STATE, action: CounterMessage) {
    switch (action.type) {
        case COUNT_UP:
            return {
                counter: state.counter + 1,
                counts: state.counts + 1
            };
        case COUNT_DOWN:
            return {
                counter: state.counter - 1,
                counts: state.counts + 1
            };
        default:
            return state;
    }
}
