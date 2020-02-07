import React from "react";
import BodyTemplate from "../Layout/BodyTemplate";
import {Link} from "react-router-dom";
import Axios from "axios";

class ListIngredient extends React.Component{
    state = {
        hostname: 'http://localhost:8080',
        ingredients : []
    }

    async componentDidMount() {
        const response = await Axios.get(this.state.hostname + "/api/v1/ingredients");
        this.setState({ingredients : response.data.ingredients});
    }

    render() {
        return(
            <BodyTemplate>
                <div className="panel-heading">
                    <h1 className="panel-title">Ingredient List</h1>
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
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.ingredients.map((ingredient, index) => {
                                    return(
                                        <tr key={ingredient.ingredientId}>
                                            <td>{index + 1}</td>
                                            <td>{ingredient.name}</td>
                                            <td><Link to={"/ViewIngredient/" + ingredient.ingredientId} >View</Link></td>
                                            <td><Link to={"/EditIngredient/" + ingredient.ingredientId} >Edit</Link></td>
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

export default ListIngredient;