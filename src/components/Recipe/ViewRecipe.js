import React from "react";
import BodyTemplate from "../Layout/BodyTemplate";
import Axios from "axios";

class ViewRecipe extends React.Component{

    state = {
        hostname: 'http://localhost:8080',
        recipe : null
    }

    async componentDidMount() {
        const response = await Axios.get(this.state.hostname + "/api/v1/recipes/" + this.props.id);
        this.setState({recipe : response.data});
    }

    render() {
        var recipeName = '';
        var categories = '';
        var ingredients = '';
        if(this.state.recipe != null)
        {
            recipeName = this.state.recipe.name;
            for (let i=0; i<this.state.recipe.categories.length; i++)
            {
                if(i == (this.state.recipe.categories.length-1))
                {
                    categories = categories + this.state.recipe.categories[i].name;
                }
                else
                {
                    categories = categories + this.state.recipe.categories[i].name + ', ';
                }
            }
            for (let i=0; i<this.state.recipe.ingredients.length; i++)
            {
                if(i == (this.state.recipe.ingredients.length-1))
                {
                    ingredients = ingredients + this.state.recipe.ingredients[i].name;
                }
                else
                {
                    ingredients = ingredients + this.state.recipe.ingredients[i].name + ', ';
                }
            }
        }

        return(
            <BodyTemplate>
                <div className="container-fluid" style={{marginTop: '20px'}}>
                    <h1>View Recipe</h1>
                    <div className="pannel-group">
                        <div className="panel panel-primary">
                            <div className="panel-body">
                                <table id="recipeDetails" className="table table-hover">
                                    <tr>
                                        <th>Recipe Name:</th>
                                        <td colSpan="3">{recipeName}</td>
                                    </tr>
                                    <tr>
                                        <th>Categories:</th>
                                        <td>{categories}</td>
                                        <th>Ingredients:</th>
                                        <td>{ingredients}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </BodyTemplate>
        )
    }
}

export default ViewRecipe;