import React, {Component} from 'react';
import { Col, Row } from 'reactstrap';
import ErrorMessage from '../errorMessage/errorMessage';
import ItemDetails, {Field} from '../itemDetails/';

export default class RandomItem extends Component {
    
    state = {
        id: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    componentDidMount() {
        this.updateItem();
        this.timerId = setInterval(this.updateItem, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    updateItem = () => {
        const id = Math.floor(Math.random()*140 + 25);
        this.setState({
            id
        })
    }

    render() {

        const { id, error } = this.state;
        const { fields, getData, label } = this.props;

        if (error) {
            return <ErrorMessage errData=""/>
        }

        const fieldsArr = fields.map((item) => {
            const {field, label} = item;
            return (
                <Field field={field} label={label} key={`${field}${id}`}/> 
            )
        });
    
        const itemDetails = (
            <ItemDetails 
                label={label}
                itemId={id} 
                getItem={getData}
                selectError="">
                    {fieldsArr}
            </ItemDetails>
        );
        
        return (
            <Row>
                <Col lg={{size: 5, offset: 0}}>
                    {itemDetails}
                </Col>
            </Row>
        )
    }
}
