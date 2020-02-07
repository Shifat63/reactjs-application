import React from "react";
import BodyTemplate from "../Layout/BodyTemplate";
import {Link} from "react-router-dom";
import Axios from "axios";

class ListCategory extends React.Component{

    state = {
        hostname: 'http://localhost:8080',
        categories : []
    }

    async componentDidMount() {
        const response = await Axios.get(this.state.hostname + "/api/v1/categories");
        this.setState({categories : response.data.categories});
    }

    render() {
        return(
            <BodyTemplate>
                <div className="panel-heading">
                    <h1 className="panel-title">Category List</h1>
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
                                this.state.categories.map((category, index) => {
                                    return(
                                        <tr key={category.categoryId}>
                                            <td>{index + 1}</td>
                                            <td>{category.name}</td>
                                            <td><Link to={"/ViewCategory/" + category.categoryId} >View</Link></td>
                                            <td><Link to={"/EditCategory/" + category.categoryId} >Edit</Link></td>
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

export default ListCategory;