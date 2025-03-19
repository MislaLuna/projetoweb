import React from "react";
import '../Formulario/style1.css'

function Formulario(){

    return(
        <div className="app-container">
            <div className="main-content">
               Formulario
            </div>

            <form>
                <div className="form-group">
                    <label>Digite seu Nome</label>
                    <input type="text" placeholder="Digite seu Nome" required/>
                </div>

                <div className="form-group">
                    <label for="password">Senha</label>
                    <input type="password" placeholder="Digite sua Senha" required/>
                </div>

                <div className="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" placeholder="Digite o E-mail" required/>
                </div>
                <div className="form-group">
                    <label for="number">Número</label>
                    <input type="number" id="number "name="number" required/>
                </div>
                <div className="form-group">
                    <label for="tel">URL</label>
                    <input type="tel" id="tel "name="tel"/>
                </div>
                <div className="form-group">
                    <label for="url">Preço Compra</label>
                    <input type="url" id="url "name="url"/>
                </div>
                <div className="form-group">
                    <label for="search">Preço Venda</label>
                    <input type="search" id="search" name="search"/>
                </div>
                <div className="form-group">
                    <label for="date">Data</label>
                    <input type="date" id="date" name="date"/>
                </div>
                <div className="form-group">
                    <label for="time">Hora</label>
                    <input type="time" id="time" name="time"/>
                </div>
                <div className="form-group">
                    <label for="datetime-local">Data e Hora</label>
                    <input type="datetime-local" id="datetime-local" name="datetime-local"/>
                </div>
                <div className="form-group">
                    <label for="month">Mês</label>
                    <input type="month" id="month" name="month"/>
                </div>
                <div className="form-group">
                    <label for="week">Semana</label>
                    <input type="week" id="week" name="week"/>
                </div>
                <div className="form-group">
                    <label for="color">Cor</label>
                    <input type="color" id="color" name="color"/>
                </div>
                <div className="form-group">
                    <label for="range">Intervalo</label>
                    <input type="range" id="range" name="range"/>
                </div>
                <div className="form-group">
                    <label for="file">Arquivo</label>
                    <input type="file" id="file" name="file"/>
                </div>
                <div className="form-group">
                    <label for="checkbox">Checkbox</label>
                    <input type="checkbox" id="checkbox" name="checkbox1"/> Opção 1 <br/>
                    <input type="checkbox" id="checkbox" name="checkbox2"/> Opção 2 <br/>
                    <input type="checkbox" id="checkbox" name="checkbox3"/> Opção 3 <br/>
                    <input type="checkbox" id="checkbox" name="checkbox4
                    "/> Opção 4 <br/>
                </div>
                <div className="form-group">
                    <label for="radio1">Masculino</label>
                    <input type="radio" id="radio1" name="radio"/> 
                    <label for="radio2">Feminino</label>
                    <input type="radio" id="radio2" name="radio"/>
                </div>
                <div className="form-group">
                    <label for="select">Select</label>
                    <select id="select" name="select">
                    <option value="RJ">RJ</option>
                    <option value="SP">SP</option>
                    <option value="MG">MG</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="select">Descrição</label>
                    <textarea id="textarea" name="textarea"></textarea>
                </div>  
                <div className="form-group">
                    <label for="submit">Enviar</label>
                    <button id="submit" name="submit"></button>
                </div>


                                
                


            </form>
    </div>
    );
}
export default Formulario