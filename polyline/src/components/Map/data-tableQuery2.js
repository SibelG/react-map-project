import React, { Component } from 'react';

class DataTableQuery2 extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.averageAmount}
                </td>
                <td>
                    {this.props.obj.date}
                </td>
           
            </tr>
        );
    }
}

export default DataTableQuery2;