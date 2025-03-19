//npm install react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './pages/Header/header';
import Home from './pages/Home/home';
import Produto from './pages/Produto/produto'
import Formulario from './pages/Formulario/formulario'
//import Funcionario from './pages/Funcionario/funcionario'

function RoutesApp (){

    return(
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/produto" element={<Produto/>}/>
                    {<Route path="/formulario" element={<Formulario/>}/>}
                </Routes>
        </BrowserRouter>
    );
}
export default RoutesApp