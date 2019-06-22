import React from 'react';
import ItemDetails, {Field} from '../itemDetails';
import RowBlock from '../rowBlock';
import styled from 'styled-components';

const Description = styled.div`
    width: 100%;
    padding: 0 20px;
    color: white;

    h3 {
        width: 100%;
        text-align: center;
    }

    p {
        width: 100%;
        text-align: justify;
        font-size: 20px;
    }
`;

const BooksItem = ({fields, getData, selectError, label, selectedItem}) => {

    const fieldsArr = fields.map((item) => {
        const {field, label} = item;
        return (
            <Field field={field} label={label} key={`${field}${selectedItem}`}/> 
        )
    })
    
    return (
        <RowBlock
            left={( 
                <ItemDetails 
                    selectError={selectError}
                    itemId={selectedItem} 
                    getItem={getData}
                    label={label}>
                        {fieldsArr}
                </ItemDetails>)}
            right={(
                // не стал делать динамику, это тоже из базы данных идти должно
                <Description>
                    <h3>Short description</h3>
                    <p>
                        Vivamus accumsan quis risus rhoncus finibus. Fusce condimentum tincidunt mollis. Ut eu nulla gravida tortor volutpat fringilla. Morbi et consectetur nulla, sed venenatis lectus. Nullam non eleifend neque, ut vehicula elit. Nulla faucibus mauris justo, in congue quam pulvinar a. Cras a ultrices nunc. Vestibulum at velit tincidunt, vehicula nisl et, mattis sem.
                    </p>
                </Description>
            )}
        />
    )
}

export default BooksItem;