import React from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class DeleteRecipe extends React.Component{

    state = {
        hostname: 'http://localhost:8080',
    }

    async componentDidMount() {
        console.log(this.props.id);
        if (this.props.id != null && this.props.id != '') {
            await Axios.delete(this.state.hostname + "/api/v1/recipes/" + this.props.id)
                .then(response => {
                    this.props.history.push('/AllRecipes');
                })
                .catch(error => {
                    alert(error);
                });
        }
    }

    render() {
        return(
            <div></div>
        )
    }
}

export default withRouter(DeleteRecipe);