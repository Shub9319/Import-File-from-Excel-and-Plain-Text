import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div style={{border:'1px solid grey',background:'lightgrey',height:'150px'}}>
                <div style={{verticalAlign:'top',textAlign:"center"}}>
                <h2>FISER-V</h2>
                <p>FISERV + Accenture solutions</p>
                </div>
            </div>
        );
    }
}

export default Header;