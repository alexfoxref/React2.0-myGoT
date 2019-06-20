import React from 'react';

import imgErr from './img/error.jpg';
import img404 from './img/error404.png';
import img408 from './img/error408.jpeg';
import img410 from './img/error410.png';
import img500 from './img/errorCritical.jpg';

import styled from 'styled-components';

const StyledBlock = styled.div`
    position: relative;

    span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: red;
    }

    img {
        width: 100%;
    }
`;



const ErrorMessage = ({errData}) => {
    let mess = `Unexpexted Error. Something goes wrong.`,
        image = imgErr;
    const {message} = errData;

    switch (message) {
        case '404':
            mess = `Error ${message}. The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.`;
            image = img404;
            break;
        case '408':
            mess = `Error ${message}. The server did not receive a complete request message within the time that it was prepared to wait.`;
            image = img408;
            break;
        case '410':
            mess = `Error ${message}. Access to the target resource is no longer available at the origin server.`;
            image = img410;
            break;
        case '500':
            mess = `Critical Error ${message}. Could not connect to server.`;
            image = img500;
            break;
        default:
            break;
    }

    return (
        <StyledBlock>
            <span>{mess}</span>
            <img src={image} alt="error"></img>
        </StyledBlock>
    ) 
}

export default ErrorMessage;