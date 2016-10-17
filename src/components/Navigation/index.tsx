import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { Link } from 'react-router';

const styles = require('./styles.css');

function _Item (props) {
    return (
        <Link
            activeStyle={{color: 'black', fontWeight: 'bold'}}
            styleName='navigation-item'
            to={props.to}
        >
            {props.children}
        </Link>
    );
};

function _Wrapper (props) {
    return (
        /**
         * The alternative way to do this is, without react-css-modules is:
         * className={styles['navigation-wrapper']}
         */
        <div styleName='navigation-wrapper'>
            {props.children}
        </div>
    );
};

export const Item = CSSModules(_Item, styles);
export const Wrapper = CSSModules(_Wrapper, styles);
