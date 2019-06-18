import React from 'react';
import img from './error.png';
import styled from 'styled-components';

const StyledImg = styled.img`
    width: 100%;
`;

const ErrorMessage = () => {
    return (
        <>
            <span>Somthing goes wrong</span>
            <StyledImg src={img} alt="error"></StyledImg>
        </>
    ) 
}

export default ErrorMessage;