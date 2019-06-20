import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import {Col, Row} from 'reactstrap';
import ErrorMessage from '../errorMessage';


export default class CharacterPage extends Component {
    
    state = {
        selectedChar: 120,
        error: false,
        loadingCharDetails: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id,
            loadingCharDetails: true
        })
    }

    render() {
        const {error, loadingCharDetails, selectedChar} = this.state;

        if (error) {
            return <ErrorMessage errData=""/>
        }

        const content = !(error || loadingCharDetails) ? <CharDetails 
                                                            charId={selectedChar} 
                                                            loading={loadingCharDetails}/> : null;

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