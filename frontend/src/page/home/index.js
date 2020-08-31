import React,{ Component } from 'react';
import '../home/styles.css';

class Home extends Component {

    constructor(props){
        super(props);
    }

    async componentDidMount() {}

    render() {

        return (
            <div id="login">
                <h3 className="text-center text-white pt-5">Gestão Estabelecimento</h3>
                <div className="container">
                    <div className="form-group">
                        <button type="submit" name="submit" className="btn btn-info btn-md">Estabelecimento</button>
                        <button type="submit" name="submit" className="btn btn-info btn-md">Usuários</button>
                        <button type="submit" name="submit" className="btn btn-info btn-md">Sair</button>
                 
                    </div>


                </div>
            </div>
                
        )
    } 
}

export default Home;