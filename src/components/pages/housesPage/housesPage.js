import React from 'react';
import ItemPage from '../itemPage';
import gotService from '../../../services/gotService';


const HousesPage = () => {
    const newGotService = new gotService();

    return (
        <ItemPage 
            getDataList={newGotService.getAllHouses}
            getData={newGotService.getHouse}
            renderItem={({name}) => name}
            fields={[
                {field:"region", label:"Region"},
                {field:"words", label:"Words"},
                {field:"titles", label:"Titles"},
                {field:"overlord", label:"Overlord"},
                {field:"ancestralWeapons", label:"Ancestral Weapons"}
            ]}
            selectError="Please select a house from the list."
            label=""/>
    )
};

export default HousesPage;