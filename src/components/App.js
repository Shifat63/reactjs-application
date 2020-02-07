import React from 'react';
import Menu from "./Layout/Menu";
import { BrowserRouter, Route } from "react-router-dom";
import ListRecipe from "./Recipe/ListRecipe"
import AddEditRecipe from "./Recipe/AddEditRecipe";
import ViewRecipe from "./Recipe/ViewRecipe";
import ListCategory from "./Category/ListCategory";
import AddEditCategory from "./Category/AddEditCategory";
import ViewCategory from "./Category/ViewCategory";
import ListIngredient from "./Ingredient/ListIngredient";
import AddEditIngredient from "./Ingredient/AddEditIngredient";
import ViewIngredient from "./Ingredient/ViewIngredient";
import DeleteRecipe from "./Recipe/DeleteRecipe";

class App extends React.Component{
    render(){
        return(
            <div>
                <BrowserRouter>
                    <Menu />
                    <Route
                        exact path='/'
                        render={(props) => <ListRecipe />}
                    />
                    <Route
                        path='/AllRecipes'
                        render={(props) => <ListRecipe />}
                    />
                    <Route
                        path='/AddRecipe'
                        render={(props) => <AddEditRecipe />}
                    />
                    <Route
                        path='/EditRecipe/:id'
                        render={(props) => <AddEditRecipe id={props.match.params.id} />}
                    />
                    <Route
                        path='/ViewRecipe/:id'
                        render={(props) => <ViewRecipe id={props.match.params.id} />}
                    />
                    <Route
                        path='/DeleteRecipe/:id'
                        render={(props) => <DeleteRecipe id={props.match.params.id} />}
                    />
                    <Route
                        path='/AllCategories'
                        render={(props) => <ListCategory />}
                    />
                    <Route
                        path='/AddCategory'
                        render={(props) => <AddEditCategory />}
                    />
                    <Route
                        path='/EditCategory/:id'
                        render={(props) => <AddEditCategory id={props.match.params.id} />}
                    />
                    <Route
                        path='/ViewCategory/:id'
                        render={(props) => <ViewCategory id={props.match.params.id} />}
                    />
                    <Route
                        path='/AllIngredients'
                        render={(props) => <ListIngredient />}
                    />
                    <Route
                        path='/AddIngredient'
                        render={(props) => <AddEditIngredient />}
                    />
                    <Route
                        path='/EditIngredient/:id'
                        render={(props) => <AddEditIngredient id={props.match.params.id} />}
                    />
                    <Route
                        path='/ViewIngredient/:id'
                        render={(props) => <ViewIngredient id={props.match.params.id} />}
                    />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

