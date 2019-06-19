import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
`;

const HeaderTitle = styled.h3`
    font-size: 24px;
    color: #fff;
    margin: 0;
`;

const HeaderLinks = styled.ul`
    display: flex;
    margin: 0;
    align-items: center;
    color: #fff;
    list-style-type: none;
    li {
        margin-right: 20px;
        font-size: 18px;
    }
`;

const Button = styled.button`
    padding: 5px;
    color: white;
    background-color: rgba(0,0,0,.1);
    font-size: 18px;
    border: 1px solid white;
    border-radius: 5px;
    margin-left: -30%;

    :hover {
        background-color: rgba(0,0,0,.5);
        box-shadow: 0 0 10px white;
    }

    :focus {
        outline: none;
    }
`;

const Header = ({toggleRandom}) => {
    return (
        <HeaderBlock>
            <HeaderTitle>
                <a href="#">
                Game of Thrones DB
                </a>
            </HeaderTitle>
            <Button
                onClick={toggleRandom}>
                    Random Character
            </Button>
            <HeaderLinks>
                <li>
                    <a href="#">Characters</a>
                </li>
                <li>
                    <a href="#">Houses</a>
                </li>
                <li>
                    <a href="#">Books</a>   
                </li>
            </HeaderLinks>
        </HeaderBlock>
    );
};

export default Header;