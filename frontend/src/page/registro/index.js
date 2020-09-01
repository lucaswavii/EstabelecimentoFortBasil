import React, { Component } from 'react';
import Api from '../../service/api'
import { toast } from 'react-toastify';
import Mensagem from '../../commom/Mensagem';
import { Link } from 'react-router-dom'

class Registro extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            email:'',
            senha:'',    
        };
    }

    async componentDidMount() {
        this.setState({
            email:'',
            senha:'',
        })
    }

    hadleSubmit = async (event) => {
        event.preventDefault();

        const { email, senha } = this.state
        
        if( !email ) return toast.error('O email é obrigatórios.');
        if( !senha ) return toast.error('A senha é obrigatórios.');
         
        await Api.post('/api/registro', {
            email, 
            senha,
            ativo:true
        }).then(response => {
            
            this.setState({
                email:'',
                senha:'',
                ativo:''
            })
            toast.success('Usuário Registrado com sucesso!')
        }).catch( e => {
            const { error } = e.response.data;
            toast.error(error);
        })

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
                        <p class="login-box-msg">Registre-se com e-mail e senha</p>
                        <form id="login-form" className="form" onSubmit={ this.hadleSubmit}>
                            <div class="input-group mb-3">
                                <input type="mail" name="email" id="email" placeholder="Informe seu e-mail" className="form-control" required value={ this.state.email } onChange={ e => this.setState({ email: e.target.value })}/>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                            <input type="password" name="password" id="password" placeholder="Informe sua senha" className="form-control" required value={ this.state.senha } onChange={ e => this.setState({ senha: e.target.value })}/>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <button type="submit" class="btn btn-success btn-block"  onClick={ this.hadleSubmit }>Registrar</button>
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

export default Registro;