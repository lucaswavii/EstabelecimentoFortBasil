import React, { Component } from 'react'
import api from '../../service/api';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { cnpjMask } from '../../commom/Mask'
import Processa from '../../commom/Processando'


class Usuario extends Component {

    constructor(props){
        
        super(props);

        this.state = {
            isProcessa:false,
            isForm:'',
            id:'',
            email:'',
            senha:'',
            ativo:'',
            registros:''
        }

        this.hadleUpdate = this.hadleUpdate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    async componentDidMount() {
        const token    = localStorage.getItem('token');
        const user     = localStorage.getItem('id');
        
        this.setState({ isProcessa:true });

        await api.get(`/api/usuario/${user}`, {
            headers: {
                'x-access-token':token,
            }
        }).then(response => {           
            this.setState({isForm:false, isProcessa:false, registros : response.data });
        })
    }

    handleSave = async(event) =>  {
        event.preventDefault();
        
        this.setState({ isProcessa:true });

        const token         = localStorage.getItem('token');
        const { id, email, senha, ativo } = this.state;

        if( !senha ) { this.setState({ isProcessa:false }); return toast.error('Informe o senha.') }
        
        if ( id ) {
            
            await api.put(`/api/usuario/${ id }`, { email, senha }, {
                headers: {
                    'x-access-token':token,
                }
            }).then(async response => {           
                
                await api.get(`/api/usuario/${ id }`, {
                    headers: {
                        'x-access-token':token,
                    }
                }).then(response => {
                    toast.success("Usuario Registrado com sucesso!")           
                    this.setState({isForm:false, isProcessa:false,  registros : response.data });
                })

            }).catch(e => {
                toast.error('Ocorreu um erro' + e )
            });
        } else {
            toast.error('O usuário não tem permissão.')
        }

    }

    hadleUpdate = async (event, value) => { 
        event.preventDefault();

        this.setState({ isProcessa:true });
        
        const id            = localStorage.getItem('id');
        const token         = localStorage.getItem('token');

        await api.get(`/api/usuario/${value}`, {
            headers: {
                'x-access-token':token,
            }
        }).then(async response => {           
           const { id, email, senha } = response.data[0]
           this.setState({
                isForm:true,
                isProcessa:false,
                id:id,
                email:email,
                senha:'',
            });
        }).catch(e => {
            this.setState({ isProcessa:false });
            toast.error('Ocorreu um erro' + e )
        })

    }

    handleCancel = async(event) =>  {
        event.preventDefault();
        this.setState({
            isForm:false,
            id:'',
            email:'',
            senha:'',
            ativo:'',
        });
    }

    render() {

        
        return ( 
            <div className="wrapper">
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title"><i className="fas fa-address-book"></i> CADASTRO USUÁRIO</h3>

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
                                <ul class="nav nav-tabs" id="custom-content-below-tab" role="tablist">
                                    
                                    <li class="nav-item">
                                        <a class={ !this.state.isForm ? "nav-link active" :  "nav-link" } id="custom-content-listagem" data-toggle="pill" href="#" role="tab" aria-controls="custom-content-below-home" aria-selected={  !this.state.isForm ? "true" : "false"}>Listagem</a>
                                    </li>
                                    
                                    <li class="nav-item">
                                        <a class={ this.state.isForm ? "nav-link active" :  "nav-link" } id="custom-content-below-profile-tab" data-toggle="pill" href="#" role="tab" aria-controls="custom-content-below-profile" aria-selected={ this.state.isForm ? "true" : "false"}>Registro</a>
                                    </li>
                                </ul>
                                <div class="tab-content" id="custom-content-below-tabContent">
                                    <div class={ !this.state.isForm ? "tab-pane fade show active" : "tab-pane fade" } id="custom-content-below-home" role="tabpanel" aria-labelledby={ !this.state.isForm ?"custom-content-listagem" : "#" }>
                                        <DataTable
                                            title="Lista"
                                            columns={
                                                [
                                                    {
                                                        name: 'Email',
                                                        selector: 'email',
                                                        sortable: true,
                                                    },                                                    
                                                    {
                                                        name: 'Editar',
                                                        selector: 'Editar',
                                                        cell: row =>   <div class="btn-group">
                                                                        <button id="editar"   className="btn btn-default" onClick={ e => this.hadleUpdate( e, row.id ) }><i class="fa fa-edit"></i></button>
                                                                        <button id="excluir"  className="btn btn-danger disabled"><i class="fas fa-trash-alt"></i></button>                                                           
                                                                    
                                                                    </div>,
                                                        button: true,
                                                    }
                                                ]
                                            }
                                            dense
                                            data={ this.state.registros }
                                            pagination
                                        />
                                    </div>
                                    <div class={ this.state.isForm ? "tab-pane fade show active" : "tab-pane fade" } id="custom-content-below-profile" role="tabpanel" aria-labelledby="custom-content-below-profile-tab">
                                        <form onSubmit={ this.handleSave }>
                                            <div class="row">
                                                <div class="col-sm-2">
                                                    <div class="form-group">
                                                        <label>Id</label>
                                                        <input type="text" class="form-control" placeholder="ID da registro" value={ this.state.id } readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row"> 
                                                
                                                <div class="col-sm-6">                                                
                                                    <div className="form-group">
                                                        <label>E-mail</label>
                                                        <input type="text" className="form-control" name="email" maxLength='160' placeholder="E-mail do usuário" value={ this.state.email} onChange={ e => this.setState({ email: e.target.value })} disabled/>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">                                                
                                                    <div className="form-group">
                                                        <label>Senha</label>
                                                        <input type="password" className="form-control" name="senha" maxLength='160' placeholder="Senhal do usuário" value={ this.state.senha} onChange={ e => this.setState({ senha: e.target.value })} required />
                                                    </div>
                                                </div>
                                                
                                            </div>                                           
                                            
                                            <button type="submit" className="btn btn-success pull-right">Salvar</button>
                                            <button type="button" className="btn btn-danger pull-right" onClick={ this.handleCancel }>Cancelar</button>
                                        </form>
                                    </div>
                                </div>                               
                            </div>
                            <Processa isCarrega={ this.state.isProcessa } />
                        </div>
                    </section>
                    <section className="content">
                    </section>
                </div>
            </div>
        )
    }
}

export default Usuario;