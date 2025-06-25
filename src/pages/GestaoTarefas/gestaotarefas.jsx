import React from 'react';
import '../../css/gestaotarefa.css';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import logo from '../img/image.png';


function GestaoTarefas() {
  return (
    <div className="gestaoTarefasContainer">
      {/* Sidebar fixa */}
      <aside className="sidebar">
        <div className="logo">
          <a href="/home2" className="logo-link">
            <img src={logo} alt="Logo TaskNavigation" />
          </a>
        </div>
        <ul className="menu">
          <li><a href="/home2"><i className="fas fa-home"></i> Início</a></li>
          <li><a href="/gestaotarefas"><i className="fas fa-tasks"></i> Gestão de tarefas</a></li>
          <li><a href="#"><i className="fas fa-building"></i> Gestão de departamentos</a></li>
          <li><a href="/pagina8"><i className="fas fa-users"></i> Gestão de usuários</a></li>
          <li><a href="/pagina6"><i className="fas fa-tachometer-alt"></i> DashBoard</a></li>
          <li><a href="#"><i className="fas fa-chart-line"></i> Relatórios</a></li>
          <li><a href="#"><i className="fas fa-cog"></i> Configurações</a></li>
        </ul>
      </aside>

      {/* Conteúdo principal com margem esquerda para o sidebar */}
      <main className="main">
        <div className="dashboard">
          <div className="dash-2">
            <div className="task-container">
              <div className="hero">
                <h1>Gestão de Tarefas</h1>
                <p>Visualização e gerenciamento de todas as tarefas</p>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Tarefa</th>
                      <th>Descrição</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { nome: 'João Silva' },
                      { nome: 'Milena Sousa' },
                      { nome: 'Adrina Santana' },
                      { nome: 'Victor Pinha' },
                      { nome: 'Samuel Oliveira' },
                      { nome: 'Erico Ericano' },
                      { nome: 'Erico Ericano' },
                      { nome: 'Erico Ericano' }
                    ].map((pessoa, index) => (
                      <tr key={index}>
                        <td>{pessoa.nome}</td>
                        <td>Relatório de vendas</td>
                        <td>Gerar relatório semanal de vendas</td>
                        <td>
                          <select>
                            <option value="pendente">Pendente</option>
                            <option value="concluida">Concluída</option>
                          </select>
                        </td>
                        <td>
                          <button className="edit-btn"><i className="fas fa-edit"></i></button>
                          <button className="delete-btn"><i className="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Rodapé dentro do dashboard */}
          <footer className="footer-container">
            <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
            <p>
              O TaskNavigation é um sistema de gestão de tarefas desenvolvido para otimizar a organização e eficiência administrativa.
              Este software e sua interface web, incluindo mas não se limitando ao design, layout, funcionalidades, código-fonte e
              documentação, são de propriedade exclusiva da equipe de desenvolvimento do TaskNavigation.
            </p>

            <div className="privacy-policy">
              <h4 className="policy-title">Política de Privacidade</h4>
              <div className="policy-text">
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
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default GestaoTarefas;
