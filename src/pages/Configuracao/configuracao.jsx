import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/configuracao.css'; 
import logo from '../img/image.png';

function ConfigurationPage() {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  const [theme, setTheme] = useState('Claro');
  const [notifications] = useState([
    { id: 1, message: 'Emily atualizou uma tarefa' },
    { id: 2, message: 'Misla finalizou uma tarefa' },
  ]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className="configuration-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <Link to="/home2" className="logo-link">
            <img src={logo} alt="Logo TaskNavigation" />
          </Link>
        </div>
        <ul className="menu">
          <li><Link to="/equipe" className={isActive('/equipe')}><i className="bi bi-house-door-fill"></i><span className="menu-text">Início</span></Link></li>
          <li><Link to="/gestaotarefas" className={isActive('/gestaotarefas')}><i className="bi bi-list-task"></i><span className="menu-text">Gestão de tarefas</span></Link></li>
          <li><Link to="/gestaodepartamento" className={isActive('/gestaodepartamento')}><i className="bi bi-building"></i><span className="menu-text">Gestão de departamentos</span></Link></li>
          <li><Link to="/pagina8" className={isActive('/gestaousuario')}><i className="bi bi-person-badge-fill"></i><span className="menu-text">Gestão de usuários</span></Link></li>
          <li><Link to="/dashboard" className={isActive('/dashboard')}><i className="bi bi-speedometer2"></i><span className="menu-text">DashBoard</span></Link></li>
          <li><Link to="/relatorios" className={isActive('/relatorios')}><i className="bi bi-bar-chart-fill"></i><span className="menu-text">Relatórios</span></Link></li>
          <li><Link to="/configuracao" className={isActive('/configuracao')}><i className="bi bi-gear-fill"></i><span className="menu-text">Configurações</span></Link></li>
        </ul>
      </aside>

      {/* Main */}
  <main className="main">
  <div className="dashboard">
    {/* Título fora da div colorida */}
    <div className="hero">
      <h1>Configurações</h1>
      <p>Gerencie preferências, notificações e personalização</p>
    </div>

    {/* 🔹 Container que pode mudar a cor de fundo */}
    <div className="config-container">
      {/* Tema */}
      <section className="theme-section mb-5">
        <h3>Tema</h3>
        <div className="theme-options">
          <label>
            <input
              type="radio"
              name="theme"
              value="Claro"
              checked={theme === 'Claro'}
              onChange={handleThemeChange}
            /> Claro
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="Escuro"
              checked={theme === 'Escuro'}
              onChange={handleThemeChange}
            /> Escuro
          </label>
        </div>
      </section>

      {/* Notificações */}
      <section className="notifications-section">
        <h3>Notificações</h3>
        <ul className="notification-list">
          {notifications.map((n) => (
            <li key={n.id}>{n.message}</li>
          ))}
        </ul>
      </section>
    </div> {/* fim do container colorido */}
  </div>
</main>


    </div>
  );
}

export default ConfigurationPage;
