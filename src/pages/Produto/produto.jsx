//npm install react-hook-form
import React from "react";

function Produto(){

    return(
        <div className="app-container">
            <div className="main-content">
                Cadastro de Produto
            </div>

            <form>
                <div className="form-group">
                    <label>Nome do Produto</label>
                    <input type="text" placeholder="Nome do Produto" required/>
                </div>
                <div className="form-group">
                    <label>Tipo do Produto</label>
                    <input type="text" placeholder="Tipo do Produto" required/>
                </div>
                <div className="form-group">
                    <label>Descrição do Produto</label>
                    <input type="text" placeholder="Descrição do Produto" required/>
                </div>
                <div className="form-group">
                    <label>Preço Compra</label>
                    <input type="text" placeholder="Preço Compra" required/>
                </div>  
                <div className="form-group">
                    <label>Preço Venda</label>
                    <input type="text" placeholder="Preço Venda" required/>
                </div>
                <div className="form-group">
                    <label>Quantidade Estoque</label>
                    <input type="text" placeholder="Quantidade Estoque" required/>
                </div>  

                <div className="form-group">
                    <button type="submit">Cadastrar Produto</button>
                </div>




        
            </form>
        </div>
    );

}
export default Produto