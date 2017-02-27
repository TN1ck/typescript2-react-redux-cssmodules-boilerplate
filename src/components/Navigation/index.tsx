import * as React from 'react';
import { Link } from 'react-router';

import * as styles from './styles.css';

export function Item (props) {
    return (
        <Link
            activeStyle={{color: 'black', fontWeight: 'bold'}}
            className={styles.navigationItem}
            to={props.to}
        >
            {props.children}
        </Link>
    );
};

export function Wrapper (props) {
    return (
        /**
         * The alternative way to do this is, without react-css-modules is:
         * className={styles['navigation-wrapper']}
         */
        <div className={styles.navigationWrapper}>
            {props.children}
        </div>
    );
};
