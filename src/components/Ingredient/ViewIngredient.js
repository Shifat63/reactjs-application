import React from "react";
import BodyTemplate from "../Layout/BodyTemplate";
import Axios from "axios";

class ViewIngredient extends React.Component{
    state = {
        hostname: 'http://localhost:8080',
        ingredient : null
    }

    async componentDidMount() {
        const response = await Axios.get(this.state.hostname + "/api/v1/ingredients/" + this.props.id);
        this.setState({ingredient : response.data});
    }

    render() {
        var ingredientName = '';
        if(this.state.ingredient != null) {
            ingredientName = this.state.ingredient.name;
        }
        return(
            <BodyTemplate>
                <div className="container-fluid" style={{marginTop: '20px'}}>
                    <h1>View Ingredient</h1>
                    <div className="pannel-group">
                        <div className="panel panel-primary">
                            <div className="panel-body">
                                <table id="ingredientDetails" className="table table-hover">
                                    <tr>
                                        <th>Ingredient Name:</th>
                                        <td colSpan="3">{ingredientName}</td>
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

export default ViewIngredient;