import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/gestaotarefa.css';
import logo from '../img/image.png';

function Relatorios() {
  const location = useLocation();
  const [usuarios, setUsuarios] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios.get(`${import.meta.env.VITE_API_URL}/relatorios`, config)
      .then(res => setUsuarios(res.data))
      .catch(err => console.error("Erro ao carregar relatórios:", err));
  }, []);

  return (
    <div className="configuration-page">
      <aside className="sidebar">
        <div className="logo">
          <Link to="/equipe">
            <img src={logo} alt="Logo TaskNavigation" />
          </Link>
        </div>
        <ul className="menu">
          <li><Link to="/home2" className={location.pathname === '/home2' ? 'active' : ''}><i className="bi bi-house-door-fill"></i><span className="menu-text">Início</span></Link></li>
          <li><Link to="/equipe" className={location.pathname === '/equipe' ? 'active' : ''}><i className="bi bi-people"></i><span className="menu-text">Equipe</span></Link></li>
          <li><Link to="/gestaotarefas" className={location.pathname === '/gestaotarefas' ? 'active' : ''}><i className="bi bi-list-task"></i><span className="menu-text">Tarefas</span></Link></li>
          <li><Link to="/gestaoprojeto" className={location.pathname === '/gestaoprojeto' ? 'active' : ''}><i className="bi bi-folder2-open"></i><span className="menu-text">Projetos</span></Link></li>
          <li><Link to="/gestaousuario" className={location.pathname === '/gestaousuario' ? 'active' : ''}><i className="bi bi-people-fill"></i><span className="menu-text">Usuários</span></Link></li>
          <li><Link to="/gestaodepartamento" className={location.pathname === '/gestaodepartamento' ? 'active' : ''}><i className="bi bi-building"></i><span className="menu-text">Departamentos</span></Link></li>
          <li><Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}><i className="bi bi-speedometer2"></i><span className="menu-text">Dashboard</span></Link></li>
          <li><Link to="/relatorios" className={location.pathname === '/relatorios' ? 'active' : ''}><i className="bi bi-graph-up"></i><span className="menu-text">Relatórios</span></Link></li>
          <li><Link to="/configuracao" className={location.pathname === '/configuracao' ? 'active' : ''}><i className="bi bi-gear-fill"></i><span className="menu-text">Configurações</span></Link></li>
        </ul>
      </aside>

      <main className="main">
        <div className="hero">
          <h1>Relatórios de Usuários</h1>
          <p>Visualize todos os usuários, seus projetos e tarefas</p>
        </div>

        <div className="config-container">
          {usuarios.length > 0 ? usuarios.map(usuario => (
            <div key={usuario.id} className="report-card mb-3 p-3 border rounded">
              <h4>{usuario.nome} ({usuario.email})</h4>

              <strong>Projetos:</strong>
              <ul>
                {usuario.projetos?.length > 0 ? usuario.projetos.map(p => (
                  <li key={p.idProjeto}>{p.nome}</li>
                )) : <li>--- Nenhum projeto ---</li>}
              </ul>

              <strong>Tarefas:</strong>
              <ul>
                {usuario.tarefas?.length > 0 ? usuario.tarefas.map(t => (
                  <li key={t.idTarefa}>{t.nome} - <span style={{color: t.status === 'Concluída' ? 'green' : 'orange'}}>{t.status}</span></li>
                )) : <li>--- Nenhuma tarefa ---</li>}
              </ul>
            </div>
          )) : (
            <p style={{ textAlign: 'center' }}>Nenhum usuário encontrado.</p>
          )}
        </div>

        <footer className="footer-container">
          <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
          <p>Este sistema foi desenvolvido para facilitar a gestão de projetos e tarefas.</p>
        </footer>
      </main>
    </div>
  );
}

export default Relatorios;
