import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
//styles
import { Wrapper, Content } from './BreadCrumb.styles'

const BreadCrumb = ({ movieTitle }) => (
    <Wrapper>
        <Content>
            <Link to='/'>
                <span>Home</span>
                <span>|</span>
                <span>{movieTitle}</span>
            </Link>
        </Content>
    </Wrapper>
);
//check if prop is a string
BreadCrumb.propTypes = {
    movieTitle: PropTypes.string
}

export default BreadCrumb;