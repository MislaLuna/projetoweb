import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import '../../css/home2.css'; // Seu CSS
import logo from '../img/image.png';

function Home2() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <div className="home2Container">
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
            <Link to="/pagina8" className={isActive('/pagina8')}>
              <i className="bi bi-person-badge-fill"></i> <span className="menu-text">Gestão de usuários</span>
            </Link>
          </li>
          <li>
            <Link to="/pagina6" className={isActive('/pagina6')}>
              <i className="bi bi-speedometer2"></i> <span className="menu-text">DashBoard</span>
            </Link>
          </li>
          <li>
            <Link to="/relatorios" className={isActive('/relatorios')}>
              <i className="bi bi-bar-chart-fill"></i> <span className="menu-text">Relatórios</span>
            </Link>
          </li>
          <li>
            <Link to="/configuracoes" className={isActive('/configuracoes')}>
              <i className="bi bi-gear-fill"></i> <span className="menu-text">Configurações</span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="main">
        <div className="dashboard">
          <div className="dash-2">
            <div className="hero">
              <h1>Bem-vindo ao TN-ADM</h1>
              <p>Gerencie suas tarefas e equipe de forma eficiente.</p>
            </div>

            <section className="features">
              <div
                className="feature"
                onClick={() => navigate('/gestaotarefas')}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-check2-square fs-2 mb-2 text-primary"></i>
                <h3>Gestão de Tarefas</h3>
                <p>Atribua, acompanhe e conclua tarefas com facilidade.</p>
              </div>

              <div
                className="feature"
                onClick={() => navigate('/pagina8')}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-person-badge-fill fs-2 mb-2 text-success"></i>
                <h3>Gestão de Usuários</h3>
                <p>Adicione, edite e monitore seus funcionários.</p>
              </div>

              <div
                className="feature"
                onClick={() => navigate('/relatorios')}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-bar-chart-fill fs-2 mb-2 text-warning"></i>
                <h3>Relatórios</h3>
                <p>Gere relatórios detalhados sobre o desempenho da equipe.</p>
              </div>
            </section>
          </div>

          <footer className="footer-container">
            <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
            <p>
              O TaskNavigation é um sistema de gestão de tarefas desenvolvido para otimizar a organização e eficiência administrativa.
            </p>
            <div className="privacy-policy">
              <h4 className="policy-title">Política de Privacidade</h4>
              <div className="policy-text">
                <p>Coletamos e armazenamos dados pessoais apenas para fornecer nossos serviços de maneira eficiente.</p>
                <p>Utilizamos tecnologias de segurança para proteger suas informações.</p>
                <p>Entre em contato conosco para dúvidas sobre seus dados.</p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Home2;
