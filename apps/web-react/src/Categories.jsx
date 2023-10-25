import { useState, useEffect } from "react";
import "./Categories.css"
import fetchData from "./FetchData.js";
import edit_img from "./assets/edit.svg";
import trash_img from "./assets/trash.svg";

function Categories() {
    const [categories, setCategories] = useState()

    useEffect(() => {
        const getCategories = async () => {
            setCategories(await fetchData("get", "/categories"))
        }
        getCategories()
    }, [])

    return (
        <>
            <div className="content">
                {categories && categories.map(({ id, title, color }) => (
                    <li key={id} id={"category-color"} className="categories-list-item">
                        <span>
                            <span className="categories-color">{color}</span>
                            {title}
                        </span>
                        <span>
                            <a href="#"><img src={edit_img}/></a>
                            <a href="#"><img src={trash_img}/></a>
                        </span>
                    </li>
                ))}
            </div>
        </>
    )
}

export default Categories