import React from 'react';

import imgErr from './img/error.jpg';
import img404 from './img/error404.png';
import img408 from './img/error408.jpeg';
import img410 from './img/error410.png';
import img500 from './img/errorCritical.jpg';

import styled from 'styled-components';

const StyledImg = styled.img`
    width: 100%;
`;



const ErrorMessage = ({errData}) => {
    let mess = `Unexpexted Error. Something go wrong.`,
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
        <>
            <span>{mess}</span>
            <StyledImg src={image} alt="error"></StyledImg>
        </>
    ) 
}

export default ErrorMessage;