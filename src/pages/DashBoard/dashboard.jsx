import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import '../../css/dashboard.css';
import logo from '../img/image.png';

function Dashboard() {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  const [stats, setStats] = useState({
    usuariosAtivos: 0,
    tarefasFinalizadas: 0,
    tarefasCriadas: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [usuariosRes, tarefasRes] = await Promise.all([
          axios.get('http://localhost:8080/usuarios'),
          axios.get('http://localhost:8080/tarefas'),
        ]);
    

        const usuarios = usuariosRes.data;
        const tarefas = tarefasRes.data;

        const usuariosAtivos = usuarios.filter(u => u.statusUsuario === 'ATIVO').length;
        const tarefasFinalizadas = tarefas.filter(t => t.status === 'FINALIZADA').length;
        const tarefasCriadas = tarefas.length;

        setStats({
          usuariosAtivos,
          tarefasFinalizadas,
          tarefasCriadas,
        });
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="dashboardContainer">
      <aside className="sidebar">
        <div className="logo">
          <Link to="/equipe" className="logo-link">
            <img src={logo} alt="Logo TaskNavigation" />
          </Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/equipe" className={isActive('/equipe')}>
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
            <Link to="/pagina8" className={isActive('/pagina8')}>
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
        <div className="dashboard">
          <div className="dash-2">
            <div className="hero">
              <h1>DashBoard</h1>
              <p>Visão geral de métricas importantes.</p>
            </div>

            <section className="features">
              <div className="feature">
                <i className="bi bi-people-fill fs-2 mb-2 text-primary"></i>
                <h3>Usuários Ativos</h3>
                <p>{stats.usuariosAtivos}</p>
              </div>

              <div className="feature">
                <i className="bi bi-check2-circle fs-2 mb-2 text-success"></i>
                <h3>Tarefas Finalizadas</h3>
                <p>{stats.tarefasFinalizadas}</p>
              </div>

              <div className="feature">
                <i className="bi bi-list-check fs-2 mb-2 text-warning"></i>
                <h3>Tarefas Criadas</h3>
                <p>{stats.tarefasCriadas}</p>
              </div>
            </section>
          </div>

          <footer className="footer-container">
            <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
            <p>Este painel fornece visão rápida das funcionalidades principais do sistema.</p>
            <div className="privacy-policy">
              <h4 className="policy-title">Política de Privacidade</h4>
              <div className="policy-text">
                <p>Protegemos seus dados com criptografia e boas práticas de segurança.</p>
                <p>Coletamos apenas as informações necessárias para o funcionamento da plataforma.</p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
