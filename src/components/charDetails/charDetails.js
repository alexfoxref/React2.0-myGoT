import React, {Component} from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';

const StyledCharDetails = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    
    h4 {
    margin-bottom: 20px;
    text-align: center;
    }

    .select-error {
        color: #fff;
        text-align: center;
        font-size: 26px;
    }

    .term {
        font-weight: bold;
    }
`;

const SelectError = styled.span`
    color: white;
`;
export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        error: false,
        errData: '',
        loading: this.props.loadingCharDetails
    }

    componentDidCatch() {
        this.setState({
            error: true,
            loading: false
        })
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        // Обязательно ВСЕГДА делать проверку на совпадение с предыдущими пропсами
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = (errData) => {
        this.setState({
            error: true,
            errData,
            loading: false
        });
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.setState({loading: true});

        this.gotService.getCharacter(charId)
            .then(() => this.onCharLoaded())
            .catch((errData) => this.onError(errData));
    }

    render() {

        const { char, error, errData, loading } = this.state;

        const loadingChar = loading ? <Spinner/> : null;
        const selectError = !(this.state.char || error) ? <SelectError className="select-error">Please select character</SelectError> : null;
        const errorMessage = error ? <ErrorMessage errData={errData}/> : null;
        const content = (this.state.char && !error) ? <View char={char}/> : null;

        if (loadingChar) {
            console.log('loadingChar');
        }

        return (
            <>
                {loadingChar}
                {selectError}
                {errorMessage}
                {content}
            </>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char

    return (
        <StyledCharDetails className="rounded">
            <h4>{name}</h4>
            <ListGroup flush>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </StyledCharDetails>
    )
}