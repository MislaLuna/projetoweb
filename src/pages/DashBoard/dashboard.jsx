import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
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
    const token = localStorage.getItem('token');
    const idUsuarioLogado = localStorage.getItem('idUsuario');

    if (!idUsuarioLogado) {
      console.warn("Nenhum usuário logado encontrado.");
      return; // sai sem tentar fazer fetch
    }

    try {
      // Pegar usuário logado e descobrir equipe
      const usuarioRes = await axios.get(`http://localhost:8080/usuarios/${idUsuarioLogado}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const equipeId = usuarioRes.data?.equipe?.id;
      if (!equipeId) {
        console.warn("Usuário logado não possui equipe vinculada.");
        return;
      }

      // Buscar usuários da equipe e todas as tarefas
      const [usuariosRes, tarefasRes] = await Promise.all([
        axios.get(`http://localhost:8080/usuarios/equipe/${equipeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:8080/tarefas', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const usuarios = usuariosRes.data;
      const tarefas = tarefasRes.data.filter(t => t.usuario?.equipe?.id === equipeId);

      const usuariosAtivos = usuarios.filter(u => u.statusUsuario === 'ATIVO').length;
      const tarefasFinalizadas = tarefas.filter(t => t.status === 'FINALIZADA').length;
      const tarefasCriadas = tarefas.length;

      setStats({ usuariosAtivos, tarefasFinalizadas, tarefasCriadas });
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
    }
  };

  fetchDashboardStats();
}, []);

  return (
    <div className="dashboardPage">
      <aside className="dashboardSidebar">
        <div className="dashboardLogo">
          <Link to="/equipe"><img src={logo} alt="Logo TaskNavigation" /></Link>
        </div>
        <ul className="dashboardMenu">
          <li><Link to="/home2" className={isActive('/home2')}><i className="bi bi-house-door-fill"></i><span> Início</span></Link></li>
          <li><Link to="/equipe" className={isActive('/equipe')}><i className="bi bi-people"></i><span>Equipe</span></Link></li>
          <li><Link to="/gestaotarefas" className={isActive('/gestaotarefas')}><i className="bi bi-list-task"></i><span>Tarefas</span></Link></li>
          <li><Link to="/gestaoprojeto" className={isActive('/gestaoprojeto')}><i className="bi bi-folder2-open"></i><span>Projetos</span></Link></li>
          <li><Link to="/gestaodepartamento" className={isActive('/gestaodepartamento')}><i className="bi bi-building"></i><span>Departamentos</span></Link></li>
          <li><Link to="/gestaousuario" className={isActive('/gestaousuario')}><i className="bi bi-person-badge-fill"></i><span>Usuários</span></Link></li>
          <li><Link to="/dashboard" className={isActive('/dashboard')}><i className="bi bi-speedometer2"></i> <span>DashBoard</span></Link></li>
          <li><Link to="/relatorios" className={isActive('/relatorios')}><i className="bi bi-bar-chart-fill"></i><span>Relatórios</span></Link></li>
          <li><Link to="/configuracao" className={isActive('/configuracoes')}><i className="bi bi-gear-fill"></i><span>Configurações</span></Link></li>
        </ul>
      </aside>

      <main className="dashboardMain">
        <div className="dashboardHero">
          <h1>DashBoard</h1>
          <p>Visão geral de métricas importantes.</p>
        </div>

        <section className="dashboardFeatures">
          <div className="dashboardFeature">
            <i className="bi bi-people-fill fs-2 mb-2 text-primary"></i>
            <h3>Usuários Ativos</h3>
            <p>{stats.usuariosAtivos}</p>
          </div>
          <div className="dashboardFeature">
            <i className="bi bi-check2-circle fs-2 mb-2 text-success"></i>
            <h3>Tarefas Finalizadas</h3>
            <p>{stats.tarefasFinalizadas}</p>
          </div>
          <div className="dashboardFeature">
            <i className="bi bi-list-check fs-2 mb-2 text-warning"></i>
            <h3>Tarefas Criadas</h3>
            <p>{stats.tarefasCriadas}</p>
          </div>
        </section>

        <footer className="dashboardFooter">
          <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
