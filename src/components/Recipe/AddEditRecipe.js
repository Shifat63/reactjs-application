import React from "react";
import BodyTemplate from "../Layout/BodyTemplate";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class AddEditRecipe extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            hostname: 'http://localhost:8080',
            categories: [],
            ingredients: [],
            recipeId: '',
            recipeName: '',
            selectedCategories: [],
            selectedIngredients: [],
            recipeNameError: '',
            categoryError: '',
            ingredientError: '',
            recipeNameErrorDisplay: 'none',
            categoryErrorDisplay: 'none',
            ingredientErrorDisplay: 'none',
            pageTitle: 'Add'
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    validate(){
        let recipeNameError = '';
        let recipeNameErrorDisplay = 'none';
        let categoryError = '';
        let categoryErrorDisplay = 'none';
        let ingredientError = '';
        let ingredientErrorDisplay = 'none';
        let flag = true;

        if(this.state.recipeName == '')
        {
            recipeNameError = 'Recipe name can not be blank';
            recipeNameErrorDisplay = 'block';
            flag = false;
        }

        if(this.state.selectedCategories.length == 0)
        {
            categoryError = 'Recipe must have at least one category';
            categoryErrorDisplay = 'block';
            flag = false;
        }

        if(this.state.selectedIngredients.length == 0)
        {
            ingredientError = 'Recipe must have at least one ingredient';
            ingredientErrorDisplay = 'block';
            flag = false;
        }

        this.setState({recipeNameError, recipeNameErrorDisplay, categoryError, categoryErrorDisplay, ingredientError, ingredientErrorDisplay});

        return flag;
    }

    onFormSubmit(event){
        event.preventDefault();
        if(this.validate())
        {
            let jsonRecipe = {
                recipeId: this.state.recipeId,
                name: this.state.recipeName,
                categories: this.state.selectedCategories,
                ingredients: this.state.selectedIngredients
            };

            const config = {
                headers: { 'content-type': 'application/json' }
            };

            Axios.post(this.state.hostname + "/api/v1/recipes", jsonRecipe, config)
                .then(response => {
                    this.props.history.push('/ViewRecipe/' + response.data.recipeId);
                })
                .catch(error => {
                    alert(error);
                });
        }
    }

    async componentDidMount() {
        const responseCategories = await Axios.get(this.state.hostname + "/api/v1/categories");
        this.setState({categories: responseCategories.data.categories});
        const responseIngredients = await Axios.get(this.state.hostname + "/api/v1/ingredients");
        this.setState({ingredients: responseIngredients.data.ingredients});
        if (this.props.id != null && this.props.id != '') {
            const response = await Axios.get(this.state.hostname + "/api/v1/recipes/" + this.props.id);
            this.setState({
                recipeId: response.data.recipeId,
                recipeName: response.data.name,
                selectedCategories: response.data.categories,
                selectedIngredients: response.data.ingredients,
                pageTitle: 'Edit'
            });
        }
    }

    render() {
        return(
            <BodyTemplate>
                <div className="container-fluid" style={{marginTop: '20px'}}>
                    <h1>{this.state.pageTitle + ' Recipe'}</h1>
                    <form onSubmit={this.onFormSubmit} >
                        <div className="pannel-group">
                            <div className="panel panel-primary">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                            <label>Recipe Name:</label>
                                            <input type="text" className="form-control"
                                                   onChange={(event) => this.setState({recipeName: event.target.value})}
                                                   value={this.state.recipeName} />
                                            <div className="alert alert-danger" style={{display: this.state.recipeNameErrorDisplay}}>
                                                {this.state.recipeNameError}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2 form-group">
                                            <label>Categories:</label>
                                        </div>
                                        <div className="col-md-10 form-group">
                                            <select className="form-control browser-default custom-select"
                                                    onChange={
                                                        (event) => {
                                                            let options = event.target.options;
                                                            let selectedOptions = [];
                                                            for (let i = 0; i < options.length; i++) {
                                                                if (options[i].selected) {
                                                                    let category = {
                                                                        categoryId: '',
                                                                        name: ''
                                                                    };
                                                                    category.categoryId = options[i].value;
                                                                    category.name = options[i].text;
                                                                    selectedOptions.push(category);
                                                                }
                                                            }
                                                            this.setState({selectedCategories: selectedOptions})
                                                        }
                                                    }
                                                    value={this.state.selectedCategories.categoryId} multiple={true}>
                                            {
                                                this.state.categories.map((category, index) => {
                                                    return(
                                                        <option key={category.categoryId} value={category.categoryId} >{category.name}</option>
                                                    )
                                                })
                                            }
                                            </select>
                                            <div className="alert alert-danger" style={{display: this.state.categoryErrorDisplay}}>
                                                {this.state.categoryError}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2 form-group">
                                            <label>Ingredients:</label>
                                        </div>
                                        <div className="col-md-10 form-group">
                                            <select className="form-control browser-default custom-select"
                                                    onChange={
                                                        (event) => {
                                                            let options = event.target.options;
                                                            let selectedOptions = [];
                                                            for (let i = 0; i < options.length; i++) {
                                                                if (options[i].selected) {
                                                                    let ingredient = {
                                                                        ingredientId: '',
                                                                        name: ''
                                                                    };
                                                                    ingredient.ingredientId = options[i].value;
                                                                    ingredient.name = options[i].text;
                                                                    selectedOptions.push(ingredient);
                                                                }
                                                            }
                                                            this.setState({selectedIngredients: selectedOptions})
                                                        }
                                                    }
                                                    value={this.state.selectedIngredients.ingredientId} multiple={true}>
                                                {
                                                    this.state.ingredients.map((ingredient, index) => {
                                                        return(
                                                            <option key={ingredient.ingredientId} value={ingredient.ingredientId} >{ingredient.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <div className="alert alert-danger" style={{display: this.state.ingredientErrorDisplay}}>
                                                {this.state.ingredientError}
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

export default withRouter(AddEditRecipe);