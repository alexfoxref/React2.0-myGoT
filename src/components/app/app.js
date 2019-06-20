import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';


export default class App extends Component {

    state = {
        visibleRandom: false,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandom = () => {
        this.setState(({visibleRandom}) => ({
            visibleRandom: !visibleRandom
        }))
    }

    render() {
        const {visibleRandom, error} = this.state;
        
        if (error) {
            return <ErrorMessage errData=""/>
        }

        const content = visibleRandom ? <RandomChar/> : null;

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
                    <CharacterPage/>
                </Container>
            </>
        )
    }
}
