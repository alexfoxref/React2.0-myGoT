import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


export default class App extends Component {

    state = {
        visible: true
    }

    toggleRandom = () => {
        this.setState(({visible}) => ({
            visible: !visible
        }))
    }

    render() {
        const {visible} = this.state;
        
        const content = visible ? <RandomChar/> : null;

        return (
            <> 
                <Container>
                    <Header toggleRandom={this.toggleRandom}/>
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {content}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
