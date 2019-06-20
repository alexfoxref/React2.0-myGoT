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
export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        error: false,
        errData: '',
        loadingChar: false
    }

    componentDidCatch() {
        this.setState({
            error: true,
            loadingChar: false
        })
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate = (prevProps) => {
        // Обязательно ВСЕГДА делать проверку на совпадение с предыдущими пропсами
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loadingChar: false
        });
    }

    onError = (errData) => {
        this.setState({
            error: true,
            errData,
            loadingChar: false
        });
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }
        this.setState({
            loadingChar: true
        })
        this.gotService.getCharacter(charId)
            .then(char => this.onCharLoaded(char))
            .catch((errData) => this.onError(errData));
    }

    render() {

        const { char, error, errData, loadingChar } = this.state;

        if (error) {
            return <ErrorMessage errData={errData}/>
        } else if (!error) {
            if (!(char || loadingChar)) {
                return <SelectError className="select-error">Please select character</SelectError>
            } else if (loadingChar) {
                return <Spinner/>
            } else if (char) {
                return <View char={char}/>
            }
        }
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