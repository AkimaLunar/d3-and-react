import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Page = ({ alt, className, children }) => (
    <div className={`page ${alt && 'page--alt'} ${className}`}>{children}</div>
);

Page.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    alt: PropTypes.bool,
};

export default Page;
