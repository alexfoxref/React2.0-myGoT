import React from 'react';
import ItemPage from '../itemPage';
import gotService from '../../../services/gotService';


const CharactersPage = () => {
    const newGotService = new gotService();

    return (
        <ItemPage 
            getDataList={newGotService.getAllCharacters}
            getData={newGotService.getCharacter}
            renderItem={({name, gender}) => `${name} (${gender})`}
            fields={[
                {field:"gender", label:"Gender"},
                {field:"born", label:"Born"},
                {field:"died", label:"Died"},
                {field:"culture", label:"Culture"}
            ]}
            selectError="Please select a character from the list."
            label=""/>
    )
};

export default CharactersPage;