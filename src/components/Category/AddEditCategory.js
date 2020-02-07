import React from "react";
import BodyTemplate from "../Layout/BodyTemplate";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class AddEditCategory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hostname: 'http://localhost:8080',
            categoryId: '',
            categoryName: '',
            categoryNameError: '',
            categoryNameErrorDisplay: 'none',
            pageTitle: 'Add'
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    validate(){
        let categoryNameError = '';
        let categoryNameErrorDisplay = 'none';
        let flag = true;

        if(this.state.categoryName == '')
        {
            categoryNameError = 'Category name can not be blank';
            categoryNameErrorDisplay = 'block';
            flag = false;
        }

        this.setState({categoryNameError, categoryNameErrorDisplay});

        return flag;
    }

    onFormSubmit(event){
        event.preventDefault();
        if(this.validate())
        {
            let jsonCategory = {
                categoryId: this.state.categoryId,
                name: this.state.categoryName
            };

            const config = {
                headers: { 'content-type': 'application/json' }
            };

            Axios.post(this.state.hostname + "/api/v1/categories", jsonCategory, config)
                .then(response => {
                    this.props.history.push('/ViewCategory/' + response.data.categoryId);
                })
                .catch(error => {
                    alert(error);
                });
        }
    }

    async componentDidMount() {
        if (this.props.id != null && this.props.id != '') {
            const response = await Axios.get(this.state.hostname + "/api/v1/categories/" + this.props.id);
            this.setState({
                categoryId: response.data.categoryId,
                categoryName: response.data.name,
                pageTitle: 'Edit'
            });
        }
    }

    render() {
        return(
            <BodyTemplate>
                <div className="container-fluid" style={{marginTop: '20px'}}>
                    <h1>{this.state.pageTitle + ' Category'}</h1>
                    <form onSubmit={this.onFormSubmit} >
                        <div className="pannel-group">
                            <div className="panel panel-primary">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                            <label>Category Name:</label>
                                            <input type="text" className="form-control"
                                                   onChange={(event) => this.setState({categoryName: event.target.value})}
                                                   value={this.state.categoryName} />
                                            <div className="alert alert-danger" style={{display: this.state.categoryNameErrorDisplay}}>
                                                {this.state.categoryNameError}
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

export default withRouter(AddEditCategory);