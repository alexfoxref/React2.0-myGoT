import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field, SelectError} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import RowBlock from '../../rowBlock';
import {withRouter} from 'react-router-dom';

class ItemPage extends Component {
    
    state = {
        selectedItem: null,
        error: false,
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        const {dynamic} = this.props;
        if (!dynamic) {
            this.setState({
                selectedItem: id
            })
        } else {
            // из компонента высшего порядка withRouter
            this.props.history.push(id)
        }
    }

    render() {
        const {error, selectedItem} = this.state;
        const {getDataList, renderItem, fields, getData, selectError, label, dynamic} = this.props;

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

        const content = !error ? itemDetails : null;

        const pageContent = dynamic ? 
            <RowBlock 
                left={itemList} 
                right={<SelectError className="select-error">{selectError}</SelectError>}/> :
            <RowBlock 
                left={itemList} 
                right={content}/>;

        return pageContent;
    }
}

export default withRouter(ItemPage);