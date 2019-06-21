import React, {Component} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';

const StyledItemDetails = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    
    h4 {
        margin-bottom: 20px;
        text-align: center;
        span {
            display: block
        }
    }

    .term {
        font-weight: bold;
    }
`;

const SelectError = styled.span`
    position: absolute;
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

const Field = ({item, field, label}) => {
    let itemField = '';

    if (/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.test(item[field])) {
        itemField = item[field].replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$3/$2/$1');
    } else {
        itemField = item[field];
    }

    return (
        <ListGroupItem className="d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{itemField}</span>
        </ListGroupItem>
    )
}
export {
    Field
}

export default class ItemDetails extends Component {

    state = {
        item: null,
        error: false,
        errData: '',
        loadingItem: false
    }

    componentDidCatch() {
        this.setState({
            error: true,
            loadingItem: false
        })
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate = (prevProps) => {
        // Обязательно ВСЕГДА делать проверку на совпадение с предыдущими пропсами
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemLoaded = (item) => {
        this.setState({
            item,
            loadingItem: false
        });
    }

    onError = (errData) => {
        this.setState({
            error: true,
            errData,
            loadingItem: false
        });
    }

    updateItem = () => {
        const {itemId, getItem} = this.props;
        if (!itemId) {
            return;
        }
        this.setState({
            loadingItem: true,
            item: null
        })
        getItem(itemId)
            .then(item => this.onItemLoaded(item))
            .catch((errData) => this.onError(errData));
    }

    render() {

        const { item, error, errData, loadingItem } = this.state;
        const {label, selectError} = this.props;
        let loading = null,
            loadedItem = null,
            nameItem = null;

        if (error) {
            return <ErrorMessage errData={errData}/>
        } else if (!error) {
            if (!(item || loadingItem)) {
                return <SelectError className="select-error">{selectError}</SelectError>
            } else {
                loading = loadingItem ? <Spinner/> : null;
                if (item) {
                    loadedItem = (
                        React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {item})
                    }))
                }
                nameItem = (item && !loadingItem) ? item.name : null;
            }
        }
                
        return (
            <StyledItemDetails className="rounded">
                <h4>{label}<span>{nameItem}</span></h4>
                <ListGroup flush>
                    {loading}
                    {loadedItem}
                </ListGroup>
            </StyledItemDetails>
        )  
    }
}