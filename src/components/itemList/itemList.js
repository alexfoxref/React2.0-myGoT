import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const StyledListGroupItem = styled(ListGroupItem)`
    cursor: pointer;
`;
export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false,
        errData: ''
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
            .catch((errData) => this.onError(errData))
    }

    onError = (errData) => {
        this.setState({
            error: true,
            errData
        })
    }

    renderItems(arr) {
        const {onCharSelected} = this.props;

        return arr.map((item) => {
            const {name, id} = item;
            return (
                <StyledListGroupItem
                    key={id}
                    onClick={() => onCharSelected(id.replace(/[^\d]/g, ''))}>
                        {name}
                </StyledListGroupItem>
            )
        })
    }

    render() {

        const {charList, error, errData} = this.state;

        const loadingItems = !(charList || error) ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage errData={errData}/> : null;
        let items = null;
        if (charList && !error) {
            items = this.renderItems(charList);
        }

        return (
            <ListGroup>
                {loadingItems}
                {errorMessage}
                {items}
            </ListGroup>
        );
    }
}