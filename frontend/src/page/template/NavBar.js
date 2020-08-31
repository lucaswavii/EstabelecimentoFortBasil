import React, { Component } from 'react'
import Mensagem from '../../commom/Mensagem'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistory  } from 'react-router-dom';
import Icon from '../../assets/task-done-flat.png';
import Avatar from '../../assets/avatar5.png';
//
class NavBar extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            usuario:''
        }
    }

    async componentDidMount() {
        const usuario  = localStorage.getItem('usuario');
       
        this.setState({ usuario: usuario });
    }

    handleLogout = async (event) => {
        localStorage.clear();
        window.location.href = "\login"   
        
    }


    render() {
                
        return  <nav class="main-header navbar navbar-expand-md navbar-dark navbar-navy">
                    <div class="container">
                        <button class="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse order-3" id="navbarCollapse">
                            <ul class="navbar-nav">
                                <li class="nav-item dropdown">
                                    <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link dropdown-toggle">
                                        <img src={ Icon } alt="AdminLTE Logo" class="brand-image img-circle elevation-3"/>
                                        <span class="brand-text font-weight-light">Iniciar</span>
                                    </a>
                                    <ul aria-labelledby="dropdownSubMenu1" class="dropdown-menu border-0 shadow">
                                        <li><Link to="/index" class="dropdown-item"><i class="fas fa-home"></i> Home</Link></li>
                                        <li><Link to="/estabelecimento" class="dropdown-item"><i class="fab fa-houzz"></i> Estabelecimento</Link></li>
                                        <li class="dropdown-divider"></li>
                                        <Link to="/usuario" class="dropdown-item"><i class="fas fa-user-shield nav-icon"></i> Usuário</Link>
                                        <li class="dropdown-divider"></li>
                                        <Link class="dropdown-item" onClick={ this.handleLogout }><i class="fas fa-sign-out-alt"></i> Sair</Link>
                                        
                                    </ul>            
                                </li>          
                            </ul>
                            <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                                <li class="nav-item dropdown user-menu">
                                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
                                        <img src={ Avatar } class="user-image img-circle elevation-2" alt="User Image"/>
                                        <span class="d-none d-md-inline">{ this.state.usuario }</span>
                                    </a>
                                </li> 
                                <li class="nav-item">
                                    <a href="#" class="nav-link" onClick={ this.handleLogout }><i class="fas fa-sign-out-alt"></i> Sair</a>
                                </li>
                            </ul>
                        </div>      
                    </div>
                    <Mensagem />
                </nav>
    }
}

export default NavBar;