import React from 'react';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import '../../css/home2.css'; // Usando o mesmo CSS da página de tarefas
import logo from '../img/image.png';

function Home2() {
  return (
    <div className="gestaoTarefasContainer">
      <aside className="sidebar">
        <div className="logo">
          <a href="/home2" className="logo-link">
            <img src={logo} alt="Logo TaskNavigation" />
          </a>
        </div>
        <ul className="menu">
          <li><a href="/home2"><i className="bi bi-house-door-fill"></i> <span className="menu-text">Início</span></a></li>
          <li><a href="/gestaotarefas"><i className="bi bi-list-task"></i> <span className="menu-text">Gestão de tarefas</span></a></li>
          <li><a href="#"><i className="bi bi-building"></i> <span className="menu-text">Gestão de departamentos</span></a></li>
          <li><a href="#"><i className="bi bi-people-fill"></i> <span className="menu-text">Gestão de usuários</span></a></li>
          <li><a href="#"><i className="bi bi-speedometer2"></i> <span className="menu-text">DashBoard</span></a></li>
          <li><a href="#"><i className="bi bi-graph-up"></i> <span className="menu-text">Relatórios</span></a></li>
          <li><a href="#"><i className="bi bi-gear-fill"></i> <span className="menu-text">Configurações</span></a></li>
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
              <div className="feature">
                <i className="bi bi-list-task"></i>
                <h3>Gestão de Tarefas</h3>
                <p>Atribua, acompanhe e conclua tarefas com facilidade.</p>
              </div>
              <div className="feature">
                <i className="bi bi-people-fill"></i>
                <h3>Gestão de Usuários</h3>
                <p>Adicione, edite e monitore seus funcionários.</p>
              </div>
              <div className="feature">
                <i className="bi bi-graph-up"></i>
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
