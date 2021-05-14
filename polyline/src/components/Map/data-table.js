import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.tpep_pickup_datetime.value}
                </td>
                <td>
                    {this.props.obj.passenger_count}
                </td>
                <td>
                    {this.props.obj.PULocationID}
                </td>
                 <td>
                    {this.props.obj.DOLocationID}
                </td>
            </tr>
        );
    }
}

export default DataTable;