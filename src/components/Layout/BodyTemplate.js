import React from "react";

class BodyTemplate extends React.Component{
    render() {
        return(
            <div className="container-fluid" style={{marginTop: '20px'}}>
                <div className="col-md-12">
                    <div className="panel panel-primary">
                        <div className="container-fluid">
                            <div className="container xd-container">
                                {this.props.children}
                                <br/>
                                <br/>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            &copy; Shifat63
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BodyTemplate;