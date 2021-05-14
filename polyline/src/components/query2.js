import React, { Component } from 'react';
import axios from 'axios';
import DataTableQuery2 from './Map/data-tableQuery2';

class query2 extends Component {

   constructor(props) {
      super(props);
      this.state = { data: [] };
    }

   componentDidMount() {
      axios.get('http://localhost:5000/api/getList2')
            .then(res => {
              this.setState({ data: res.data });
            })
            .catch(function (error) {
              console.log(error);
            })
    }

   dataTable() {
      return this.state.data.map((data, i) => {
          return <DataTableQuery2 obj={data} key={i} />;
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
                                <td>averageAmount</td>
                                <td>tpep_pickup_datetime</td>
                             
                            </tr>
                        </thead>
                        <tbody>
                    {this.state.data.map((data, i) => {
            
       
                    return (
            <tr>
              <td>
                    {data.averageAmount}
                </td>
                <td>
                    {data.date.value}
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
export default query2;
