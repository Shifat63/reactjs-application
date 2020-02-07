import React from "react";
import BodyTemplate from "../Layout/BodyTemplate";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class AddEditIngredient extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hostname: 'http://localhost:8080',
            ingredientId: '',
            ingredientName: '',
            ingredientNameError: '',
            ingredientNameErrorDisplay: 'none',
            pageTitle: 'Add'
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    validate(){
        let ingredientNameError = '';
        let ingredientNameErrorDisplay = 'none';
        let flag = true;

        if(this.state.ingredientName == '')
        {
            ingredientNameError = 'Ingredient name can not be blank';
            ingredientNameErrorDisplay = 'block';
            flag = false;
        }

        this.setState({ingredientNameError, ingredientNameErrorDisplay});

        return flag;
    }

    onFormSubmit(event){
        event.preventDefault();
        if(this.validate())
        {
            let jsonIngredient = {
                ingredientId: this.state.ingredientId,
                name: this.state.ingredientName
            };

            const config = {
                headers: { 'content-type': 'application/json' }
            };

            Axios.post(this.state.hostname + "/api/v1/ingredients", jsonIngredient, config)
                .then(response => {
                    this.props.history.push('/ViewIngredient/' + response.data.ingredientId);
                })
                .catch(error => {
                    alert(error);
                });
        }
    }

    async componentDidMount() {
        if (this.props.id != null && this.props.id != '') {
            const response = await Axios.get(this.state.hostname + "/api/v1/ingredients/" + this.props.id);
            this.setState({
                ingredientId: response.data.ingredientId,
                ingredientName: response.data.name,
                pageTitle: 'Edit'
            });
        }
    }

    render() {
        return(
            <BodyTemplate>
                <div className="container-fluid" style={{marginTop: '20px'}}>
                    <h1>{this.state.pageTitle + ' Ingredient'}</h1>
                    <form onSubmit={this.onFormSubmit} >
                        <div className="pannel-group">
                            <div className="panel panel-primary">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                            <label>Ingredient Name:</label>
                                            <input type="text" className="form-control"
                                                   onChange={(event) => this.setState({ingredientName: event.target.value})}
                                                   value={this.state.ingredientName} />
                                            <div className="alert alert-danger" style={{display: this.state.ingredientNameErrorDisplay}}>
                                                {this.state.ingredientNameError}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit
                            </button>
                        </div>
                    </form>
                </div>
            </BodyTemplate>
        )
    }
}

export default withRouter(AddEditIngredient);