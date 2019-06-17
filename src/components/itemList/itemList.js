import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';

const StyledListGroupItem = styled(ListGroupItem)`
    cursor: pointer;
`;
export default class ItemList extends Component {

    render() {
        return (
            <ListGroup>
                <StyledListGroupItem>
                    John Snow
                </StyledListGroupItem>
                <StyledListGroupItem>
                    Brandon Stark
                </StyledListGroupItem>
                <StyledListGroupItem>
                    Geremy
                </StyledListGroupItem>
            </ListGroup>
        );
    }
}