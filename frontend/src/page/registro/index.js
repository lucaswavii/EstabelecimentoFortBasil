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
            <body> 
                <div id="login">
                    <h3 className="text-center text-white pt-5">Gestão Estabelecimento</h3>
                    <div className="container">
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12">
                                    <form id="login-form" className="form" onSubmit={ this.hadleSubmit }>
                                        <h3 className="text-center text-info">Registro de Usuário</h3>
                                        <div className="form-group">
                                            <label for="username" className="text-info">E-mail:</label><br></br>
                                            <input type="mail" name="email" id="email" placeholder="Informe seu e-mail" className="form-control" required value={ this.state.email } onChange={ e => this.setState({ email: e.target.value })}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="password" className="text-info">Senha:</label><br></br>
                                            <input type="password" name="password" id="password" placeholder="Informe sua senha" className="form-control" required value={ this.state.senha } onChange={ e => this.setState({ senha: e.target.value })}/>
                                        </div>
                                        <div className="form-group">
                                            <Link onClick={ this.hadleBack }> Retornar Login</Link>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" name="submit" className="btn btn-info btn-md" onClick={ this.hadleSubmit }>Registrar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Mensagem />
            </body>
        ) 
    }
}

export default Registro;