import React, { Component } from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
 

class Content extends Component {

    constructor(props){
        super(props); 
    }

    render() {
    
    return  <div className="wrapper">
                <NavBar/>                
                <div className="content-wrapper">
                    { this.props.children }
                </div>
                
                <Footer/>

            </div>             
    }
}

export default Content;