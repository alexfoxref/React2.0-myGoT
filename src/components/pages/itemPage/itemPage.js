import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import RowBlock from '../../rowBlock';

export default class ItemPage extends Component {
    
    state = {
        selectedItem: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    render() {
        const {error, selectedItem} = this.state;
        const {getDataList, renderItem, fields, getData, selectError, label} = this.props;

        if (error) {
            return <ErrorMessage errData=""/>
        }

        // JSX элементы как props
        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={getDataList}
                // Контролируемый рендер, рендер функция
                renderItem={renderItem}/>
        );

        const fieldsArr = fields.map((item) => {
            const {field, label} = item;
            return (
                <Field field={field} label={label} key={`${field}${selectedItem}`}/> 
            )
        })

        const itemDetails = (
            <ItemDetails 
                selectError={selectError}
                itemId={selectedItem} 
                getItem={getData}
                label={label}>
                    {fieldsArr}
            </ItemDetails>
        );

        const content = !(error) ? itemDetails : null;

        return (
            <RowBlock left={itemList} right={content}/>
        )
    }
}