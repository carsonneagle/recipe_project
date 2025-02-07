import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const[form, setForm] = useState({
        image:"",
        name:"",
        ingredients:"",
        type:"",
        instructions:"",
        category:""

    });
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value};
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newRecipe = { ...form };

        await fetch("https://attck-recipes-back-end.herokuapp.com/recipes", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipe),
        })
        .catch(error => {
            window.alert(error);
            return;
        })

        setForm({name:"", type:"", ingredients:"", category:"", instructions:"", image:""});
        navigate("/recipes");
    }

    return (
        <div>
            <h3>Create New Recipe</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="picture">Picture URL</label>
                    <input
                        type="url"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor = "title">Recipe Title</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => updateForm({ title: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Recipe Description</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => updateForm({ text: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredient List</label>
                    <input
                        type="text"
                        className="form-control"
                        value = {form.ingredients}
                        onChange={(e) => updateForm({ ingredients: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Recipe"
                        className = "btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}
