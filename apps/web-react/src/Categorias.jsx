import { useState, useEffect } from "react";
import "./Categorias.css"
import fetchData from "./FetchData.js";

function Categorias(){
    const [categories, setCategories] = useState()

    useEffect (() => {
        const getCategories = async () =>{
            setCategories(await fetchData("get", "/categories"))
        }
        getCategories()
    },[])
    

    return(
        <>
            <div className="content">
                {categories && categories.map(({ id, title }) => (<li key={id}><h2>{title}</h2></li>))}
            </div>
        </>
    )
}

export default Categorias