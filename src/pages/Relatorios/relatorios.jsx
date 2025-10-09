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
    const fetchAllData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [usuariosRes, projetosRes, tarefasRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/usuarios`, config),
          axios.get(`${import.meta.env.VITE_API_URL}/projetos`, config),
          axios.get(`${import.meta.env.VITE_API_URL}/tarefas`, config),
        ]);

        const usuariosData = usuariosRes.data;
        const projetosData = projetosRes.data;
        const tarefasData = tarefasRes.data;

        const usuariosCompletos = usuariosData.map(usuario => {
          const projetosUsuario = projetosData.filter(p => p.usuario?.id === usuario.id);
          const tarefasUsuario = tarefasData.filter(t => t.usuario?.id === usuario.id);
          return { ...usuario, projetos: projetosUsuario, tarefas: tarefasUsuario };
        });

        setUsuarios(usuariosCompletos);
      } catch (err) {
        console.error("Erro ao carregar relatórios:", err);
      }
    };

    fetchAllData();
  }, [token]);

  return (
    <div className="configuration-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <Link to="/equipe">
            <img src={logo} alt="Logo TaskNavigation" />
          </Link>
        </div>

        <ul className="menu">
          <li><Link to="/home2" className={location.pathname === '/home2' ? 'active' : ''}><i className="bi bi-house-door-fill"></i> <span>Início</span></Link></li>
          <li><Link to="/equipe" className={location.pathname === '/equipe' ? 'active' : ''}><i className="bi bi-people"></i> <span>Equipe</span></Link></li>
          <li><Link to="/gestaotarefas" className={location.pathname === '/gestaotarefas' ? 'active' : ''}><i className="bi bi-list-task"></i> <span>Tarefas</span></Link></li>
          <li><Link to="/gestaoprojeto" className={location.pathname === '/gestaoprojeto' ? 'active' : ''}><i className="bi bi-folder2-open"></i> <span>Projetos</span></Link></li>
          <li><Link to="/gestaodepartamento" className={location.pathname === '/gestaodepartamento' ? 'active' : ''}><i className="bi bi-building"></i> <span>Departamentos</span></Link></li>
          <li><Link to="/gestaousuario" className={location.pathname === '/gestaousuario' ? 'active' : ''}><i className="bi bi-people-fill"></i> <span>Usuários</span></Link></li>
          <li><Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}><i className="bi bi-speedometer2"></i> <span>Dashboard</span></Link></li>
          <li><Link to="/relatorios" className={location.pathname === '/relatorios' ? 'active' : ''}><i className="bi bi-graph-up"></i> <span>Relatórios</span></Link></li>
          <li><Link to="/configuracao" className={location.pathname === '/configuracao' ? 'active' : ''}><i className="bi bi-gear-fill"></i> <span>Configurações</span></Link></li>
        </ul>
      </aside>

      {/* Main */}
      <main className="main">
        <div className="hero">
          <h1>Relatórios</h1>
          <p>Visualização completa de usuários, seus projetos e tarefas</p>
        </div>

        <div className="config-container">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Projetos</th>
                  <th>Tarefas</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length > 0 ? (
                  usuarios.map(usuario => (
                    <tr key={usuario.id}>
                      <td>{usuario.nome}</td>
                      <td>{usuario.email}</td>
                      <td>
                        {usuario.projetos?.length > 0 ? (
                          <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                            {usuario.projetos.map(p => (
                              <li key={p.idProjeto}>{p.nome}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="empty">Nenhum projeto</span>
                        )}
                      </td>
                      <td>
                        {usuario.tarefas?.length > 0 ? (
                          <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                            {usuario.tarefas.map(t => (
                              <li key={t.idTarefa}>
                                {t.nome} —{' '}
                                <span className={t.status === "Concluída" ? "status-concluida" : "status-pendente"}>
                                  {t.status}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="empty">Nenhuma tarefa</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center' }}>Nenhum dado encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="footer-container">
          <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
          <p>Este sistema foi desenvolvido para facilitar a gestão de tarefas e projetos.</p>
        </footer>
      </main>
    </div>
  );
}

export default Relatorios;
