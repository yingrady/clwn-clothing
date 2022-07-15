import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// import SHOP_DATA from '../shop-data.js'; don't need because we are done with running the data

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    useEffect(()=>{
        const getCategoriesMap = async()=>{
            const categoryMap = await getCategoriesAndDocuments()
            console.log(categoryMap)
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[]);

    // useEffect(()=>{
    //     addCollectionAndDocuments('categories',SHOP_DATA);
    // },[]) delete because we only want to run it once
    const value = {categoriesMap};
    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
}