import React from 'react';
import ItemPage from '../itemPage';
import gotService from '../../../services/gotService';


const BooksPage = () => {
    const newGotService = new gotService();

    return (
        <ItemPage 
            getDataList={newGotService.getAllBooks}
            getData={newGotService.getBook}
            renderItem={({name}) => name}
            fields={[
                {field:"numberOfPages", label:"Number Of Pages"},
                {field:"released", label:"Released"}
            ]}
            selectError="Please select a book from the list."
            label=""/>
            
    )
};

export default BooksPage;