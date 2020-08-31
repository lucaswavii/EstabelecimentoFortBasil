import React, { Component } from "react";
import { toast } from 'react-toastify';

class Home extends Component { 
    
    constructor(props){
        super(props);
    }

    async componentDidMount() {
    }

    render() {
       
        return  (
                <div className="content-wrapper">
                    <section className="content-header">        
                    </section>
                    <section className="content">
                    </section>
                </div>
        );
    
    }
}

export default Home;