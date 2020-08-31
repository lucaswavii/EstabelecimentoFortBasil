import React, { Component } from 'react'

class Estabelecimento extends Component {

    constructor(props){
        
        super(props);

    }

    async componentDidMount() {

    }

    render() {

        return ( 
            <div className="wrapper">
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title"><i className="fas fa-address-book"></i> CADASTRO ESTABELECIMENTO</h3>

                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="Atualizar" data-toggle="Atualizar" title="Atualizar" onClick={ () => {} }>
                                        <i className="fas fa-sync"></i>
                                    </button>
                                
                                    <button type="button" className="btn btn-tool" data-card-widget="Minimizar" data-toggle="Minimizar" title="Minimizar">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                
                                </div>
                            </div>
                            <div className="card-body">

                            </div>
                        </div>
                       

                    </section>

                </div>

            </div>
        )
    }
}

export default Estabelecimento;