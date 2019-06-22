import React, {Component} from 'react';
import {Container, Button} from 'reactstrap';
import Header from '../header';
import RandomItem from '../randomItem';
import ErrorMessage from '../errorMessage';
import { CharactersPage, BooksPage, HousesPage, BooksItem } from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
    margin: 50px auto;
    width: 70%;
    color: white;

    h1 {
        width: 100%;
        text-align: center;
    }

    p {
        margin: 20px;
        font-size: 20px;
        text-align: justify;
    }
`;

const StyledNoMatch = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    button {
        position: fixed;
        top: 10%;
        left: 10%;
        transform: translate(-50%, -50%);
        font-size: 30px;
        color: red;
    }
`;
export default class App extends Component {

    gotService = new gotService();

    state = {
        visibleRandom: false,
        error: false,
        match: true
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

    onMatch = () => {
        this.setState({
            match: false
        });
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

        const booksItem = (id) => {
            return (
                <BooksItem 
                    fields={[
                        {field:"numberOfPages", label:"Number Of Pages"},
                        {field:"released", label:"Released"}
                    ]}
                    getData={this.gotService.getBook}
                    selectError=""
                    label=""
                    selectedItem={id}/>
            )
        };

        const startPage = (
            <StyledDiv>
                <h1>
                    Welcome to Game of Thrones Data Base!
                </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et justo turpis. Pellentesque scelerisque gravida consequat. Phasellus in leo id diam porttitor aliquam. Ut feugiat, magna sed mollis tincidunt, mi eros consectetur orci, vitae faucibus eros augue nec arcu. Nulla facilisi. Mauris sagittis sem quis elit sagittis, at molestie velit commodo. Proin commodo ligula eget elit condimentum, a pharetra eros ornare. Duis pellentesque pharetra ligula, at hendrerit purus laoreet non. Phasellus ultrices elementum mauris a faucibus.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et justo turpis. Pellentesque scelerisque gravida consequat. Phasellus in leo id diam porttitor aliquam. Ut feugiat, magna sed mollis tincidunt, mi eros consectetur orci, vitae faucibus eros augue nec arcu. Nulla facilisi. Mauris sagittis sem quis elit sagittis, at molestie velit commodo. Proin commodo ligula eget elit condimentum, a pharetra eros ornare. Duis pellentesque pharetra ligula, at hendrerit purus laoreet non. Phasellus ultrices elementum mauris a faucibus.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et justo turpis. Pellentesque scelerisque gravida consequat. Phasellus in leo id diam porttitor aliquam. Ut feugiat, magna sed mollis tincidunt, mi eros consectetur orci, vitae faucibus eros augue nec arcu. Nulla facilisi. Mauris sagittis sem quis elit sagittis, at molestie velit commodo. Proin commodo ligula eget elit condimentum, a pharetra eros ornare. Duis pellentesque pharetra ligula, at hendrerit purus laoreet non. Phasellus ultrices elementum mauris a faucibus.
                </p>
            </StyledDiv>
        );

        const dynamicBooks = (match) => {
            const {id} = match.params;

            return booksItem(id)
        };

        const routerConfig = [
            {
                path: '/',
                component: () => startPage,
                exact: true
            },
            {
                path: '/characters/',
                component: CharactersPage,
                exact: false
            },
            {
                path: '/houses/',
                component: HousesPage,
                exact: false
            },
            {
                path: '/books/',
                component: BooksPage,
                exact: true
            },
            {
                path: '/books/:id',
                component: ({match}) => dynamicBooks(match),
                exect: false
            }
        ];

        const noMatch = (
            <StyledNoMatch>
                <ErrorMessage errData={{message: '404'}}/>
                <Button onClick={this.onMatch}>
                    <Link to="/">Main Page</Link>
                </Button>
            </StyledNoMatch>
        );

        const matchPath = routerConfig.filter((item) => {
            const {path} = item;
            return (path === window.location.pathname)
        }).map(item => item.path);
        
        const noMatchPath = (matchPath.length !== 0) ? null : noMatch;

        const routerItems = routerConfig.map(item => {
            const {path, component, exact} = item;

            return (
                <Route exact={exact} path={path} component={component} key={path}/>
            )
        });

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header toggleRandom={this.toggleRandom}/>
                    </Container>
                    <Container>
                        {randomChar}
                        {routerItems}
                        <Route component={() => noMatchPath}/>
                    </Container>
                </div>
            </Router>
        )
    }
}
