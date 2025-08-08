import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import '../../css/configuracao.css';

import logo from '../img/image.png';

function ConfigurationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  const [theme, setTheme] = useState('Claro');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Emily atualizou uma tarefa' },
    { id: 2, message: 'Misla finalizou uma tarefa' },
  ]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className="configuration-page">
      <aside className="sidebar">
        <div className="logo">
          <Link to="/home2" className="logo-link">
            <img src={logo} alt="Logo TaskNavigation" />
          </Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/home2" className={isActive('/home2')}>
              <i className="bi bi-house-door-fill"></i> <span className="menu-text">Início</span>
            </Link>
          </li>
          <li>
            <Link to="/gestaotarefas" className={isActive('/gestaotarefas')}>
              <i className="bi bi-list-task"></i> <span className="menu-text">Gestão de tarefas</span>
            </Link>
          </li>
          <li>
            <Link to="/gestaodepartamento" className={isActive('/gestaodepartamento')}>
              <i className="bi bi-building"></i> <span className="menu-text">Gestão de departamentos</span>
            </Link>
          </li>
          <li>
            <Link to="/pagina8" className={isActive('/gestaousuario')}>
              <i className="bi bi-person-badge-fill"></i> <span className="menu-text">Gestão de usuários</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={isActive('/dashboard')}>
              <i className="bi bi-speedometer2"></i> <span className="menu-text">DashBoard</span>
            </Link>
          </li>
          <li>
            <Link to="/relatorios" className={isActive('/relatorios')}>
              <i className="bi bi-bar-chart-fill"></i> <span className="menu-text">Relatórios</span>
            </Link>
          </li>
          <li>
            <Link to="/configuracao" className={isActive('/configuracoes')}>
              <i className="bi bi-gear-fill"></i> <span className="menu-text">Configurações</span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="main">
        <div className="configuration-container">
          <section className="theme-section">
            <h3>Tema</h3>
            <div className="theme-options">
              <label>
                <input
                  type="radio"
                  name="theme"
                  value="Claro"
                  checked={theme === 'Claro'}
                  onChange={handleThemeChange}
                />
                Claro
              </label>
              <label>
                <input
                  type="radio"
                  name="theme"
                  value="Escuro"
                  checked={theme === 'Escuro'}
                  onChange={handleThemeChange}
                />
                Escuro
              </label>
            </div>
          </section>

          <section className="notifications-section">
            <h3>Notificações</h3>
            <ul className="notification-list">
              {notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
              ))}
            </ul>
          </section>

          {/* Adicione outras seções de configuração aqui */}
        </div>
      </main>
    </div>
  );
}

export default ConfigurationPage;
