import React, { Component } from 'react';
import Api from '../../service/api'
import { toast } from 'react-toastify';
import Mensagem from '../../commom/Mensagem';
import { Link } from 'react-router-dom'

class Esqueci extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            email:'',
        };
    }

    async componentDidMount() {
        this.setState({
            email:'',
        })
    }

    hadleSubmit = async (event) => {
        event.preventDefault();

        const { email } = this.state
        
        if( !email ) return toast.error('O email é obrigatórios.');
         
        await Api.post('/api/esqueci', {
            email, 
        }).then(response => {

            this.setState({
                email:'',
            })
            toast.success(`A senha foi enviado para seu email. `)
                    
        }).catch( e => {
            const { error } = e.response.data;
            toast.error(error);
        });
    }

    hadleBack = async (event) => {
        event.preventDefault();
        this.props.history.push('/login');
    
    }

    render() {

        return (
            <body class="hold-transition login-page">
                <div class="login-box">
                    <a href="/login"><b>Gerenciador</b> Estabelecimento</a>
                </div>
                <div class="card">
                    <div class="card-body login-card-body">
                        <p class="login-box-msg">Esqueceu sua senha?</p>
                        <form id="login-form" className="form" onSubmit={ this.hadleSubmit}>
                            <div class="input-group mb-3">
                                <input type="mail" name="email" id="email" placeholder="Informe seu e-mail" className="form-control" required value={ this.state.email } onChange={ e => this.setState({ email: e.target.value })}/>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-6">
                                <button type="submit" class="btn btn-success btn-block"  onClick={ this.hadleSubmit }> Enviar</button>
                            </div>
                            <div className="form-group">
                                <Link onClick={ this.hadleBack }> Retornar Login</Link>
                            </div>

                        </form>
                    </div>
                </div>
                <Mensagem />
            </body>

            
        ) 
    }
}

export default Esqueci;