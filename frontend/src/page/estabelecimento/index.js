import React, { Component } from 'react'
import api from '../../service/api';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { cnpjMask } from '../../commom/Mask'
import Processa from '../../commom/Processando'


class Estabelecimento extends Component {

    constructor(props){
        
        super(props);

        this.state = {
            isProcessa:false,
            isForm:'',
            filtro:'',
            id:'',
            cnpj:'',
            razao:'',
            fantasia:'',
            cep:'',
            endereco:'',
            numero:'',
            complemento:'',
            uf:'',
            cidade:'',
            bairro:'',
            fone:'',
            email:'',
            ativo:'',
            ativoDefault:'',
            cadastrador:'',
            registros:''
        }

        this.handleNew      = this.handleNew.bind(this);
        this.hadleUpdate    = this.hadleUpdate.bind(this);
        this.handleDelete   = this.handleDelete.bind(this);
        this.handleCancel   = this.handleCancel.bind(this);
        this.handleFiltro   = this.handleFiltro.bind(this)
    }

    async componentDidMount() {
        const token    = localStorage.getItem('token');
        
        this.setState({ isProcessa:true });

        await api.get('/api/estabelecimento', {
            headers: {
                'x-access-token':token,
            }
        }).then(response => {           
            this.setState({isForm:false, isProcessa:false, registros : response.data });
        })
    }

    handleNew = async(event) =>  {
        
        event.preventDefault();

        this.setState({
            isForm:true,
            id:'',
            cnpj:'',
            razao:'',
            fantasia:'',
            cep:'',
            endereco:'',
            numero:'',
            complemento:'',
            uf:'',
            cidade:'',
            bairro:'',
            fone:'',
            email:'',
            ativo:'',
            ativoDefault:[{value:true, label:'Ativo'}],
            situacoes:[{value:true, label:'Ativo'}, {value:false, label:'Inativo'}]
        });
    }

    handleSave = async(event) =>  {
        event.preventDefault();
        
        this.setState({ isProcessa:true });

        const token         = localStorage.getItem('token');
        const cadastrador   = localStorage.getItem('id');
        const { id, cnpj, razao, fantasia, cep, endereco, numero, complemento, uf, cidade, bairro, fone, email, ativo } = this.state;

        if( !cnpj ) { this.setState({ isProcessa:false }); return toast.error('Informe o cnpj.') }
        if( !razao ) { this.setState({ isProcessa:false }); return toast.error('Informe o razão.') }
        if( !fantasia ) { this.setState({ isProcessa:false }); return toast.error('Informe o cnpj.') }
        if( cnpj.length != 18 ){ this.setState({ isProcessa:false }); return toast.error('Informe um CNPJ com 18 números.') }
        
        if ( id ) {
            
            await api.put(`/api/estabelecimento/${ id }`, { cnpj, razao, fantasia, cep, endereco, numero, complemento, uf, cidade, bairro, fone, email, ativo, cadastrador }, {
                headers: {
                    'x-access-token':token,
                }
            }).then(async response => {           
                
                await api.get('/api/estabelecimento', {
                    headers: {
                        'x-access-token':token,
                    }
                }).then(response => {
                    toast.success("Estabelecimento Registrado com sucesso!")           
                    this.setState({isForm:false, isProcessa:false,  registros : response.data });
                })

            }).catch(e => {
                toast.error('Ocorreu um erro' + e )
            });
        } else {
            await api.post('/api/estabelecimento', {id, cnpj, razao, fantasia, cep, endereco, numero, complemento, uf, cidade, bairro, fone, email, ativo, cadastrador }, {
                headers: {
                    'x-access-token':token,
                }
            }).then(async response => {           
                
                await api.get('/api/estabelecimento', {
                    headers: {
                        'x-access-token':token,
                    }
                }).then(response => {
                    toast.success("Estabelecimento Registrado com sucesso!")           
                    this.setState({isForm:false, isProcessa:false,  registros : response.data });
                })

            }).catch(e => {
                toast.error('Ocorreu um erro' + e )
            });
        }

    }

    hadleUpdate = async (event, value) => { 
        event.preventDefault();

        this.setState({ isProcessa:true });
        
        const token         = localStorage.getItem('token');

        await api.get(`/api/estabelecimento/${value}`, {
            headers: {
                'x-access-token':token,
            }
        }).then(async response => {           
          
           this.setState({
                isForm:true,
                isProcessa:false,
                id:response.data.id,
                cnpj:response.data.cnpj,
                razao:response.data.razao,
                fantasia:response.data.fantasia,
                cep:response.data.cep,
                endereco:response.data.endereco,
                numero:response.data.numero,
                complemento:response.data.complemento,
                uf:response.data.uf,
                cidade:response.data.cidade,
                bairro:response.data.bairro,
                fone:response.data.fone,
                email:response.data.email,
                ativo:response.data.ativo,
                ativoDefault:response.data.ativo == 0 ? [{value:false, label:'Inativo'}] : [{value:true, label:'Ativo'}],
                situacoes:[{value:true, label:'Ativo'}, {value:false, label:'Inativo'}]
            });
        }).catch(e => {
            this.setState({ isProcessa:false });
            toast.error('Ocorreu um erro' + e )
        })

    }

    handleDelete = async( event, value ) =>  {
        event.preventDefault();
        const token         = localStorage.getItem('token');

        if(window.confirm('Deseja realmente excluir o registro?')) {
            this.setState({ isProcessa:true });
            await api.delete(`/api/estabelecimento/${value}`, {
                headers: {
                    'x-access-token':token,
                }
            }).then(async response => {           
            
                
                await api.get('/api/estabelecimento', {
                    headers: {
                        'x-access-token':token,
                    }
                }).then(response => {
                    toast.success("Estabelecimento Excluído com sucesso!")           
                    this.setState({isForm:false, isProcessa:false,  registros : response.data });
                })
            }).catch(e => {
                this.setState({ isProcessa:false });
                toast.error('Ocorreu um erro' + e )
            })
        }
    }

    handleCancel = async(event) =>  {
        event.preventDefault();
        this.setState({
            isForm:false,
            id:'',
            cnpj:'',
            razao:'',
            fantasia:'',
            cep:'',
            endereco:'',
            numero:'',
            complemento:'',
            uf:'',
            cidade:'',
            bairro:'',
            fone:'',
            email:'',
            ativo:'',
            situacoes:[{value:true, label:'Ativo'}, {value:false, label:'Inativo'}]
        });
    }

    handleFiltro = async(event) =>  {
        const { registros, filtro } = this.state;

        const token    = localStorage.getItem('token');

        if( filtro ) {
            
            const filtragem = registros.filter(item =>    item.cnpj  && item.cnpj.toLowerCase().includes(filtro.toLowerCase())  || 
            item.fantasia && item.fantasia.toLowerCase().includes(filtro.toLowerCase()) ||
            item.razao && item.razao.toLowerCase().includes(filtro.toLowerCase()) );

            this.setState({ registros: filtragem });
        } else {
            await api.get('/api/estabelecimento', {
                headers: {
                    'x-access-token':token,
                }
            }).then(response => {           
                this.setState({isForm:false, isProcessa:false, registros : response.data });
            })  
        }
    }

    render() {

        const headSubMenu = <div className="col-4">
                                <div className="input-group input-group-sm">
                                    <input type="text" name="pesquisa" className="form-control float-right" placeholder="Pesquisar" value={ this.state.filtro } onChange={ e => this.setState({ filtro: e.target.value }) } />
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-default" onClick={this.handleFiltro }><i className="fas fa-search"></i></button>
                                    </div>
                                </div>
                            </div>

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
                                                        name: 'Cnpj',
                                                        selector: 'cnpj',
                                                        sortable: true,
                                                    },
                                                    {
                                                        name: 'Razão',
                                                        selector: 'razao',
                                                        sortable: true,
                                                    },
                                                    {
                                                        name: 'Fantasia',
                                                        selector: 'fantasia',
                                                        sortable: true,
                                                    },
                                                    {
                                                        name: 'Fone',
                                                        selector: 'fone',
                                                        sortable: true,
                                                    },
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
                                                                        <button id="excluir"  className="btn btn-danger" onClick={ e => this.handleDelete(e, row.id )}><i class="fas fa-trash-alt"></i></button>                                                           
                                                                    
                                                                    </div>,
                                                        button: true,
                                                    }
                                                ]
                                            }
                                            dense
                                            subHeader
                                            subHeaderComponent={ headSubMenu }
                                            data={ this.state.registros }
                                            pagination
                                        />
                                        <button type="button" onClick={ this.handleNew } className="btn btn-info pull-right">Novo</button>
                                        
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
                                                <div class="col-sm-2">                                                
                                                    <div className="form-group">
                                                        <label>Cnpj</label>
                                                        <input type="text" className="form-control" name="cpf" maxLength='18' placeholder="CNPJ do estabelecimento" value={ this.state.cnpj} onChange={ e =>  this.setState({cnpj: cnpjMask(e.target.value)}) } required />
                                                    </div>
                                                </div>
                                                <div class="col-sm-5"> 
                                                    <div className="form-group">
                                                        <label>Razão</label>
                                                        <input type="text" className="form-control" name="razao" maxLength='200' placeholder="Razão do Registro" value={ this.state.razao } onChange={ e => this.setState({ razao: e.target.value})} required/>
                                                    </div>
                                                </div>
                                                <div class="col-sm-5"> 
                                                    <div className="form-group">
                                                        <label>Fantasia</label>
                                                        <input type="text" className="form-control" name="fantasia" maxLength='200' placeholder="Fantasia do Registro" value={ this.state.fantasia } onChange={ e => this.setState({ fantasia: e.target.value})} required/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="row"> 
                                                <div class="col-sm-2">                                                
                                                    <div className="form-group">
                                                        <label>Cep</label>
                                                        <input type="text" className="form-control" name="cep" maxLength='9' placeholder="Cep do estabelecimento" value={ this.state.cep} onChange={ e => this.setState({ cep: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div class="col-sm-8"> 
                                                    <div className="form-group">
                                                        <label>Endereço</label>
                                                        <input type="text" className="form-control" name="endereco" maxLength='200' placeholder="Endereço do Registro" value={ this.state.endereco } onChange={ e => this.setState({ endereco: e.target.value})}/>
                                                    </div>
                                                </div>
                                                <div class="col-sm-2"> 
                                                    <div className="form-group">
                                                        <label>Número</label>
                                                        <input type="text" className="form-control" name="numero" maxLength='30' placeholder="Número do Registro" value={ this.state.numero } onChange={ e => this.setState({ numero: e.target.value})}/>
                                                    </div>
                                                </div>                                                
                                            </div>
                                            <div class="row"> 
                                                <div class="col-sm-12">                                                
                                                    <div className="form-group">
                                                        <label>Complemento</label>
                                                        <input type="text" className="form-control" name="complemento" maxLength='30' placeholder="Complemento do registro" value={ this.state.complemento} onChange={ e => this.setState({ complemento: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row"> 
                                                <div class="col-sm-2">                                                
                                                    <div className="form-group">
                                                        <label>Uf</label>
                                                        <input type="text" className="form-control" name="cep" maxLength='2' placeholder="Uf do estabelecimento" value={ this.state.uf} onChange={ e => this.setState({ uf: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div class="col-sm-2">                                                
                                                    <div className="form-group">
                                                        <label>Cidade</label>
                                                        <input type="text" className="form-control" name="cidade" maxLength='160' placeholder="Cidade do estabelecimento" value={ this.state.cidade} onChange={ e => this.setState({ cidade: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div class="col-sm-2">                                                
                                                    <div className="form-group">
                                                        <label>Bairro</label>
                                                        <input type="text" className="form-control" name="bairro" maxLength='160' placeholder="Bairro do estabelecimento" value={ this.state.bairro} onChange={ e => this.setState({ bairro: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div class="col-sm-2">                                                
                                                    <div className="form-group">
                                                        <label>Fone</label>
                                                        <input type="text" className="form-control" name="fone" maxLength='30' placeholder="Fone do estabelecimento" value={ this.state.fone} onChange={ e => this.setState({ fone: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div class="col-sm-2">                                                
                                                    <div className="form-group">
                                                        <label>E-mail</label>
                                                        <input type="text" className="form-control" name="email" maxLength='160' placeholder="E-mail do estabelecimento" value={ this.state.email} onChange={ e => this.setState({ email: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div class="col-sm-2">                                                
                                                    <div className="form-group">
                                                        <label>Situação</label>
                                                        <Select
                                                            id="ativo"
                                                            placeholder="Selecione" 
                                                            options={ this.state.situacoes}
                                                            onChange={ e => this.setState({ativo: e.value }) }                                                    
                                                        />
                                                    
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

export default Estabelecimento;