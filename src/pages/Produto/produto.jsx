//npm install react-hook-form
//npm install axios
//npm install json-server
//npm install -g json-server

//comandos de inicializacao
//npx json-server --watch db.json --port 3001
//npm run dev

import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const Produto = () => {

    const [usuarios, setUsuarios] = useState([])

    const [vnome,setNome] = useState('')
    const [vdesc,setDesc] = useState('')
    const [vpreco,setPreco] = useState('')

    //buscar produtos cadastrados ao carregar a tela

    useEffect(() => {
        axios.get("http://localhost:3001/produto")
        .then ((res) => {
            setUsuarios(res.data)
            console.log(res.data)
        })
        .catch(err=> console.error("Erro ao buscar o produto"));
    },[]);

    const handleSubmit = async () =>{
        try{
        const response = await axios.post("http://localhost:3001/produto",
            {nome: vnome, descricao: vdesc, precovenda: vpreco})  
            console.log(response.data)

        }catch (error){
           console.log(error) 
        }
    };

    return(
        <div className="app-container">
            <div className="main-content">
                Cadastro de Produto
            </div>

            <form>
                <div className="form-group">
                    <label>Nome do Produto</label>
                    <input type="text" placeholder="Nome do Produto" required onChange={(e)=>setNome(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Descrição do Produto</label>
                    <input type="text" placeholder="Descrição do Produto" onChange={(e)=>setDesc(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Preço</label>
                    <input type="text" placeholder="Preço Venda" onChange={(e)=>setPreco(e.target.value)}/>
                </div>

                <div className="form-group">
                  <button onClick={handleSubmit}>Cadastrar Produto</button>
                </div>
            </form>

            <div className="main-content">
                Produtos Cadastrados
            </div>

            <ul>
                {usuarios.map(produto => (
                    <li key={produto.id}> {produto.nome} - {produto.descricao} - {produto.precovenda}</li>
                ))}
            </ul>

        </div>
    );

}
export default Produto