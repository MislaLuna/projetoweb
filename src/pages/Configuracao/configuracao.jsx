import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/configuracao.css';
import logo from '../img/image.png';

function ConfiguracoesIOS() {
  const location = useLocation();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({ nome: '', email: '', foto: '' });
  const [novaFoto, setNovaFoto] = useState(null);
  const [loading, setLoading] = useState(true);

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    axios.get('http://localhost:8080/usuario/logado', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUsuario(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [navigate]);

  const handleFotoChange = (e) => setNovaFoto(e.target.files[0]);

  const handleSalvar = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('nome', usuario.nome);
    formData.append('email', usuario.email);
    if (novaFoto) formData.append('foto', novaFoto);

    try {
      const res = await axios.put('http://localhost:8080/usuario/atualizar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUsuario(res.data);
      setNovaFoto(null);
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar perfil.');
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8080/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Erro no logout:', err);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="configuration-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo"><Link to="/home2"><img src={logo} alt="Logo TaskNavigation" /></Link></div>
        <ul className="menu">
          <li><Link to="/home2" className={isActive('/home2') ? 'active' : ''}><i className="bi bi-house-door-fill"></i><span>Início</span></Link></li>
          <li><Link to="/equipe" className={isActive('/equipe') ? 'active' : ''}><i className="bi bi-people"></i><span>Equipe</span></Link></li>
          <li><Link to="/gestaotarefas" className={isActive('/gestaotarefas') ? 'active' : ''}><i className="bi bi-list-task"></i><span>Tarefas</span></Link></li>
          <li><Link to="/gestaoprojeto" className={isActive('/gestaoprojeto') ? 'active' : ''}><i className="bi bi-folder2-open"></i><span>Projetos</span></Link></li>
          <li><Link to="/gestaodepartamento" className={isActive('/gestaodepartamento') ? 'active' : ''}><i className="bi bi-building"></i><span>Departamentos</span></Link></li>
          <li><Link to="/gestaousuario" className={isActive('/gestaousuario') ? 'active' : ''}><i className="bi bi-person-badge-fill"></i><span>Usuários</span></Link></li>
          <li><Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}><i className="bi bi-speedometer2"></i><span>Dashboard</span></Link></li>
          <li><Link to="/relatorios" className={isActive('/relatorios') ? 'active' : ''}><i className="bi bi-bar-chart-fill"></i><span>Relatórios</span></Link></li>
          <li><Link to="/configuracao" className={isActive('/configuracao') ? 'active' : ''}><i className="bi bi-gear-fill"></i><span>Configurações</span></Link></li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="main">
        <div className="hero">
          <h1>Configurações</h1>
          <p>Gerencie seu perfil e ajustes do sistema</p>
        </div>

        <div className="config-container">
          {/* Perfil */}
          <div className="setting-card-ios vertical">
            <div className="user-icon-ios">
              <img src={usuario.foto || '/default-avatar.png'} alt="Usuário" />
            </div>
            <input type="file" onChange={handleFotoChange} />
            <div className="profile-info-ios">
              <div><strong>{usuario.nome}</strong></div>
              <div>{usuario.email}</div>
            </div>
          </div>

          {/* Conta */}
          <div className="setting-card-ios vertical">
            <div className="text-ios"><strong>Conta</strong></div>
            <div className="subtext-ios">Gerencie sua conta e preferências</div>
            <button className="btn-ios-logout" onClick={handleLogout}>Sair</button>
          </div>

          {/* Ações */}
          <div className="actions-ios">
            <button className="btn-ios-save" onClick={handleSalvar}>Salvar Alterações</button>
          </div>
        </div>

        <div className="footer-container">
          <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
        </div>
      </main>
    </div>
  );
}

export default ConfiguracoesIOS;
