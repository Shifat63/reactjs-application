import React from "react";
import BodyTemplate from "../Layout/BodyTemplate";
import Axios from "axios";

class ViewCategory extends React.Component{
    state = {
        hostname: 'http://localhost:8080',
        category : null
    }

    async componentDidMount() {
        const response = await Axios.get(this.state.hostname + "/api/v1/categories/" + this.props.id);
        this.setState({category : response.data});
    }

    render() {
        var categoryName = '';
        if(this.state.category != null) {
            categoryName = this.state.category.name;
        }
        return(
            <BodyTemplate>
                <div className="container-fluid" style={{marginTop: '20px'}}>
                    <h1>View Category</h1>
                    <div className="pannel-group">
                        <div className="panel panel-primary">
                            <div className="panel-body">
                                <table id="categoryDetails" className="table table-hover">
                                    <tr>
                                        <th>Category Name:</th>
                                        <td colSpan="3">{categoryName}</td>
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

export default ViewCategory;