import React from "react";
import BodyTemplate from "../Layout/BodyTemplate";
import {Link} from "react-router-dom";
import Axios from "axios";

class ListRecipe extends React.Component{

    state = {
        hostname: 'http://localhost:8080',
        recipes : []
    }

    async componentDidMount() {
        const response = await Axios.get(this.state.hostname + "/api/v1/recipes");
        this.setState({recipes : response.data.recipes});
    }

    render() {
        return(
            <BodyTemplate>
                <div className="panel-heading">
                    <h1 className="panel-title">Recipe List</h1>
                </div>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-hover ">
                            <thead className="thead-inverse">
                            <tr>
                                <th>Serial No.</th>
                                <th>Name</th>
                                <th>View</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.recipes.map((recipe, index) => {
                                        return(
                                            <tr key={recipe.recipeId}>
                                                <td>{index + 1}</td>
                                                <td>{recipe.name}</td>
                                                <td><Link to={"/ViewRecipe/" + recipe.recipeId} >View</Link></td>
                                                <td><Link to={"/EditRecipe/" + recipe.recipeId} >Edit</Link></td>
                                                <td><Link to={"/DeleteRecipe/" + recipe.recipeId} >Delete</Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </BodyTemplate>
        )
    }
}

export default ListRecipe;