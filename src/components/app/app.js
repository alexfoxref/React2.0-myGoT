import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../header';
import RandomItem from '../randomItem';
import ErrorMessage from '../errorMessage';
import CharactersPage from '../pages/charactersPage';
import BooksPage from '../pages/booksPage';
import HousesPage from '../pages/housesPage';
import gotService from '../../services/gotService';


export default class App extends Component {

    gotService = new gotService();

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

        const randomChar = visibleRandom ? <RandomItem 
                                                getData={this.gotService.getCharacter}
                                                fields={[
                                                    {field:"gender", label:"Gender"},
                                                    {field:"born", label:"Born"},
                                                    {field:"died", label:"Died"},
                                                    {field:"culture", label:"Culture"}
                                                ]}
                                                label="Random character:"/> : null;

        return (
            <> 
                <Container>
                    <Header toggleRandom={this.toggleRandom}/>
                </Container>
                <Container>
                    {randomChar}
                    <CharactersPage/>
                    <BooksPage/>
                    <HousesPage/>
                </Container>
            </>
        )
    }
}
