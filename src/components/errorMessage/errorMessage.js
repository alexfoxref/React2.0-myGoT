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



const ErrorMessage = ({errorStatus}) => {
    let message = `Unexpexted Error. Something go wrong.`,
        image = imgErr;

    switch (errorStatus) {
        case '404':
            message = `Error ${errorStatus}. The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.`;
            image = img404;
            break;
        case '408':
            message = `Error ${errorStatus}. The server did not receive a complete request message within the time that it was prepared to wait.`;
            image = img408;
            break;
        case '410':
            message = `Error ${errorStatus}. Access to the target resource is no longer available at the origin server.`;
            image = img410;
            break;
        case '500':
            message = `Critical Error ${errorStatus}. Could not connect to server.`;
            image = img500;
            break;
        default:
            break;
    }

    return (
        <>
            <span>{message}</span>
            <StyledImg src={image} alt="error"></StyledImg>
        </>
    ) 
}

export default ErrorMessage;