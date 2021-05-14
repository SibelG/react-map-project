import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './Map/data-table';

 class query1 extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
    
        axios.get('http://localhost:5000/api/getList1')
            .then(res => {
                this.setState({ data: res.data });
                console.log(res)
                console.log(res.tpep_pickup_datetime)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    dataTable() {
        return this.state.data.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    render() {
        const {data}=this.state;
        return (
            <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>tpep_pickup_datetime</td>
                                <td>passenger_count</td>
                                <td>PULocationID</td>
                                <td>DOLocationID</td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map((data, i) => {
            
       
                    return (
            <tr>
                <td>
                    {data.tpep_pickup_datetime.value}
                </td>
                <td>
                    {data.passenger_count}
                </td>
                <td>
                    {data.PULocationID}
                </td>
                 <td>
                    {data.DOLocationID}
                </td>
            </tr>

        );
         })}
                    
                  
             
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default query1;