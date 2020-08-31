import React, { Component } from 'react';
import Api from '../../service/api'
import { toast } from 'react-toastify';
import Mensagem from '../../commom/Mensagem';
import { Link } from 'react-router-dom'
import '../login/styles.css'

class Login extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            email:'',
            senha:'',    
        };

        this.hadleSubmit = this.hadleSubmit.bind(this)
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
        if( !senha ) return toast.error('A ssenha é obrigatórios.');
         
        await Api.post('/api/login',{
            email, 
            senha
        }).then(response => {
            const { id, email, token } = response.data[0]

            localStorage.setItem('token'    , token   );
            localStorage.setItem('usuario'  , email   );
            localStorage.setItem('id'       , id   );
            
            this.setState({
                email:'',
                senha:'',
            })
          
            this.props.history.push('/home');
        }).catch(e =>{
            this.setState({
                email:'',
                senha:'',
            })
            
            const { error } = e.response.data
            toast.error(error);
        });


    }

    render() {

        return (
            <body class="hold-transition login-page">
                <div class="login-box">
                    <a href="/login"><b>Gerenciador</b> Estabelecimento</a>
                </div>
                <div class="card">
                    <div class="card-body login-card-body">
                        <p class="login-box-msg">Informe usuário e senha</p>
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
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block"  onClick={ this.hadleSubmit }>Login</button>
                            </div>
                            <div className="form-group">
                                <Link to="/registro"> Registre-se</Link>
                                <br></br>
                                <Link to="/esqueci"> Esqueceu senha?</Link>
                            </div>

                        </form>
                    </div>
                </div>
                <Mensagem />
            </body>
        ) 
    }
}

export default Login;