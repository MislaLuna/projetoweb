import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/configuracao.css';
import logo from '../img/image.png';

function ConfiguracoesIOS() {
  const location = useLocation();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({ nome: '', email: '', foto: '' });
  const [novaFoto, setNovaFoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modoAvião, setModoAvião] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="config-ios-page">

      {/* Sidebar exclusiva */}
      <aside className="sidebar-ios">
        <div className="logo-sidebar-ios">
          <Link to="/home2">
            <img src={logo} alt="Logo TaskNavigation" />
          </Link>
        </div>
        <ul className="menu-sidebar-ios">
          <li><Link to="/home2" className={isActive('/home2')}><i className="bi bi-house-door-fill"></i>Início</Link></li>
          <li><Link to="/equipe" className={isActive('/equipe')}><i className="bi bi-people"></i>Equipe</Link></li>
          <li><Link to="/gestaotarefas" className={isActive('/gestaotarefas')}><i className="bi bi-list-task"></i>Tarefas</Link></li>
          <li><Link to="/gestaoprojeto" className={isActive('/gestaoprojeto')}><i className="bi bi-folder2-open"></i>Projetos</Link></li>
          <li><Link to="/gestaodepartamento" className={isActive('/gestaodepartamento')}><i className="bi bi-building"></i>Departamentos</Link></li>
          <li><Link to="/gestaousuario" className={isActive('/gestaousuario')}><i className="bi bi-person-badge-fill"></i>Usuários</Link></li>
          <li><Link to="/dashboard" className={isActive('/dashboard')}><i className="bi bi-speedometer2"></i>Dashboard</Link></li>
          <li><Link to="/relatorios" className={isActive('/relatorios')}><i className="bi bi-bar-chart-fill"></i>Relatórios</Link></li>
          <li><Link to="/configuracao" className={isActive('/configuracao')}><i className="bi bi-gear-fill"></i>Configurações</Link></li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-ios">

        {/* Top Status Bar estilo iPhone */}
        <div className="status-bar-ios">
          <span className="hora">09:41</span>
          <div className="status-icons">
            <i className="bi bi-wifi"></i>
            <i className="bi bi-signal"></i>
            <i className="bi bi-battery-half"></i>
          </div>
        </div>

        {/* Cabeçalho e perfil */}
        <header className="header-ios">
          <h1>Ajustes</h1>
          <div className="profile-card-ios">
            <div className="user-icon-ios">
              <img src={usuario.foto || '/default-avatar.png'} alt="Usuário" />
            </div>
            <div className="profile-info-ios">
              <span className="login-link-ios">Iniciar sessão no iPhone</span>
              <span className="subtext-ios">Configure o iCloud, a App Store e mais.</span>
            </div>
          </div>
        </header>

        {/* Seções de Configuração */}
        <section className="settings-ios">
          <div className="setting-card-ios">
            <div className="icon-ios airplane"><i className="bi bi-airplane"></i></div>
            <div className="text-ios">Modo Avião</div>
            <div className="switch-ios">
              <input type="checkbox" checked={modoAvião} onChange={() => setModoAvião(!modoAvião)} />
            </div>
          </div>

          <div className="setting-card-ios">
            <div className="icon-ios wifi"><i className="bi bi-wifi"></i></div>
            <div className="text-ios">Wi-Fi</div>
            <div className="subtext-ios">Wi-Fi</div>
          </div>

          <div className="setting-card-ios">
            <div className="icon-ios bluetooth"><i className="bi bi-bluetooth"></i></div>
            <div className="text-ios">Bluetooth</div>
            <div className="subtext-ios">Ativado</div>
          </div>

          <div className="setting-card-ios">
            <div className="icon-ios celular"><i className="bi bi-phone"></i></div>
            <div className="text-ios">Celular</div>
            <div className="arrow-ios">›</div>
          </div>
        </section>

        {/* Botões de ação */}
        <section className="actions-ios">
          <button className="btn-ios-save" onClick={handleSalvar}>Salvar Alterações</button>
          <button className="btn-ios-logout" onClick={handleLogout}>Sair</button>
        </section>

        {/* Footer */}
        <footer className="footer-ios">
          &copy; 2024 TaskNavigation. Todos os direitos reservados.
        </footer>
      </main>
    </div>
  );
}

export default ConfiguracoesIOS;
