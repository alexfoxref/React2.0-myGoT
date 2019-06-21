import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const StyledListGroup = styled(ListGroup)`
    background-color: #fff;

    div {
        margin-top: 50px;
        margin-bottom: 50px;
    }

    li {
        cursor: pointer;
    }
`;
export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false,
        errData: ''
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    componentDidMount() {
        // передаем функцию в виде props
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
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
        const {onItemSelected, renderItem} = this.props;

        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <ListGroupItem
                    key={id}
                    onClick={() => onItemSelected(id.replace(/[^\d]/g, ''))}>
                        {label}
                </ListGroupItem>
            )
        })
    }

    render() {

        const {itemList, error, errData} = this.state;

        const loadingItems = !(itemList || error) ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage errData={errData}/> : null;
        const items = (itemList && !error) ? this.renderItems(itemList) : null;

        return (
            <StyledListGroup className="rounded">
                {loadingItems}
                {errorMessage}
                {items}
            </StyledListGroup>
        );
    }
}