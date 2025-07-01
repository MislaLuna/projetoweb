import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import logo from '../pages/img/image.png'; // Ajuste o caminho da logo
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/home2.css'; // Ou outro CSS para o menu

function Layout() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="home2Container">
      <aside className="sidebar">
        <div className="logo">
          <Link to="/home2" className="logo-link">
            <img src={logo} alt="Logo TaskNavigation" />
          </Link>
        </div>
        <ul className="menu">
          <li><Link to="/home2" className={isActive('/home2')}><i className="bi bi-house-door-fill"></i> Início</Link></li>
          <li><Link to="/gestaotarefas" className={isActive('/gestaotarefas')}><i className="bi bi-list-task"></i> Gestão de tarefas</Link></li>
          <li><Link to="/gestaodepartamento" className={isActive('/gestaodepartamento')}><i className="bi bi-building"></i> Gestão de departamentos</Link></li>
          <li><Link to="/pagina8" className={isActive('/pagina8')}><i className="bi bi-person-badge-fill"></i> Gestão de usuários</Link></li>
          <li><Link to="/pagina6" className={isActive('/pagina6')}><i className="bi bi-speedometer2"></i> DashBoard</Link></li>
          <li><Link to="/relatorios" className={isActive('/relatorios')}><i className="bi bi-bar-chart-fill"></i> Relatórios</Link></li>
          <li><Link to="/configuracoes" className={isActive('/configuracoes')}><i className="bi bi-gear-fill"></i> Configurações</Link></li>
        </ul>
      </aside>
      <main className="main">
        <Outlet /> {/* Aqui é onde o conteúdo das rotas filhas será renderizado */}
      </main>
    </div>
  );
}

export default Layout;
