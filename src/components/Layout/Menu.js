import React from "react";
import {Link} from "react-router-dom";

class Menu extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">Recipe app</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <Link className="nav-link dropdown-toggle active" data-toggle="dropdown" to="#">Recipe</Link>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="/AllRecipes">View All</Link>
                                        <Link className="dropdown-item" to="/AddRecipe">Add</Link>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <Link className="nav-link dropdown-toggle active" data-toggle="dropdown" to="#">Category</Link>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="/AllCategories">View All</Link>
                                        <Link className="dropdown-item" to="/AddCategory">Add</Link>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <Link className="nav-link dropdown-toggle active" data-toggle="dropdown" to="#">Ingredient</Link>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="/AllIngredients">View All</Link>
                                        <Link className="dropdown-item" to="/AddIngredient">Add</Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Menu;