import React, { Component } from 'react'

export default class Marker extends Component {
  render () {
    return (
      <div style={{width: '3.2rem', background: '#00a1e1', color: '#ffffff', padding: '0.3rem',align:'center'}}>
        {this.props.text}
      </div>
    )
  }
}
