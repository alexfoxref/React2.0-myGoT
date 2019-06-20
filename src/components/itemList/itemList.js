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
        error: true,
        errData: '',
        loading: true
    }

    componentDidCatch() {
        this.setState({
            error: true,
            loading: false
        })
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList,
                    loading: false
                })
            })
            .catch((errData) => this.onError(errData))
    }

    onError = (errData) => {
        this.setState({
            error: true,
            errData,
            loading: false
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

        const {charList, error, errData, loading} = this.state;

        const loadingItems = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage errData={errData}/> : null;
        let items = null;
        if (!(loading || error)) {
            items = this.renderItems(charList);
        }

        if (loadingItems) {
            console.log('loadingItems');
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