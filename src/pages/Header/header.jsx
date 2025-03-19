import { Link } from 'react-router-dom'
import Logo from '../img/logo.jpg'


function Header(){

    return(
        <header>
                <div>
                    <img src={Logo} alt='Logo' title='Logo Pizzaria' /> 
                </div>
                <nav>
                   <a href="/" className="abas">Home</a>
                     <span className="separador"> | </span> 
                   <a href="/produto" className="abas">Produto</a>
                     <span className="separador"> | </span>
                     <a href="/formulario" className="abas">Formulário</a>
                     <span className="separador"> | </span>
                </nav>    
        </header>
    );
}
export default Header