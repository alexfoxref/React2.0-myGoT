import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import {Col, Row} from 'reactstrap';
import ErrorMessage from '../errorMessage';


export default class CharacterPage extends Component {
    
    state = {
        selectedChar: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        const {error, selectedChar} = this.state;

        if (error) {
            return <ErrorMessage errData=""/>
        }

        const content = !(error) ? <CharDetails charId={selectedChar}/> : null;

        return (
            <Row>
                <Col md='6'>
                    <ItemList
                        onCharSelected={this.onCharSelected}/>
                </Col>
                <Col md='6'>
                    {content}
                </Col>
            </Row>
        )
    }
}