import React from 'react';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import '../../css/home2.css'; 
import logo from '../img/image.png';

function Home2() {
  return (
    <div className="homeContainer">
<div className="sidebar">
  <div className="logo">
    <a href="/inicio" className="logo-link">
      <img 
        src={logo} 
        alt="Logo TaskNavigation" 
        style={{ width: '50%', display: 'block', margin: '0 auto' }} 
      />
    </a>
  </div>

  {/* Linha separadora */}
  <hr className="sidebar-separator" />

  <ul className="menu">
    <li><a href="/home2"><i className="bi bi-house-door-fill"></i> InícioTESTE</a></li>
    <li><a href="/gestaotarefas"><i className="bi bi-list-task"></i> Gestão de tarefas</a></li>
    <li><a href="#"><i className="bi bi-building"></i> Gestão de departamentos</a></li>
    <li><a href="#"><i className="bi bi-people-fill"></i> Gestão de usuários</a></li>
    <li><a href="#"><i className="bi bi-speedometer2"></i> DashBoard</a></li>
    <li><a href="#"><i className="bi bi-graph-up"></i> Relatórios</a></li>
    <li><a href="#"><i className="bi bi-gear-fill"></i> Configurações</a></li>
  </ul>
</div>
 

  <div className="main">
    <div className="dashboard">
      <div className="dash2">
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

      <footer className="footerContainer">
        <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
        <p>
          O TaskNavigation é um sistema de gestão de tarefas desenvolvido para otimizar a organização e eficiência administrativa.
          Este software e sua interface web, incluindo mas não se limitando ao design, layout, funcionalidades, código-fonte e 
          documentação, são de propriedade exclusiva da equipe de desenvolvimento do TaskNavigation.
        </p>

        <div className="policyText">
          <h4 className="policyTitle">Política de Privacidade</h4>
          <p>
            Coletamos e armazenamos dados pessoais apenas para fornecer nossos serviços de maneira eficiente. Nenhuma 
            informação é compartilhada com terceiros sem o seu consentimento.
          </p>
          <p>
            Utilizamos tecnologias de segurança para proteger suas informações contra acessos não autorizados. O uso da 
            plataforma implica a aceitação desta política.
          </p>
          <p>
            Para dúvidas ou solicitações sobre seus dados, entre em contato conosco pelo suporte.
          </p>
        </div>
      </footer>
    </div>
  </div>
</div>

  );
}

export default Home2;
