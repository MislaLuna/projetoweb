import { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/equipe.css';
import logo from '../img/image.png';

function GestaoEquipes() {
  const [equipes, setEquipes] = useState([]);
  const [nomeEquipe, setNomeEquipe] = useState('');
  const [emailColaborador, setEmailColaborador] = useState('');
  const [equipeSelecionada, setEquipeSelecionada] = useState('');
  const [showFormEquipe, setShowFormEquipe] = useState(false);
  const [showFormColaborador, setShowFormColaborador] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Axios com JWT sempre atualizado
  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('❌ Token não encontrado no localStorage');
        return config; // segue sem token, backend retorna 401
      }
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('🔑 Token enviado no header:', token.substring(0, 15) + '...');
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Checa token ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ Você precisa estar logado!');
      navigate('/login');
      return;
    }
    buscarEquipes(); // só chama se existir token
  }, [navigate]);

  const buscarEquipes = async () => {
    try {
      const res = await axiosJWT.get('http://localhost:8080/equipes');
      setEquipes(res.data);
    } catch (err) {
      console.error('Erro ao buscar equipes:', err);
      alert('❌ Não foi possível buscar as equipes. Faça login novamente ou verifique a conexão.');
    }
  };

const handleCriarEquipe = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (!token) {
    alert('⚠️ Você precisa estar logado para criar equipes!');
    navigate('/login');
    return;
  }

  try {
    await axiosJWT.post('http://localhost:8080/equipes', { nome: nomeEquipe });
    setNomeEquipe('');
    setShowFormEquipe(false);
    buscarEquipes();
    alert('✅ Equipe criada com sucesso!');
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        alert('⚠️ Nome da equipe inválido ou já existente.');
      } else if (err.response.status === 400) {
        // Aqui você mostra a mensagem específica que veio do backend
        const mensagem = err.response.data || 'Nome da equipe inválido ou já existente.';
        alert(`❌ ${mensagem}`);
      } else {
        alert(`❌ Erro ao criar equipe: ${err.response.data}`);
      }
    } else {
      alert(`❌ Erro ao criar equipe: ${err.message}`);
    }
    console.error('Erro ao criar equipe:', err);
  }
};

  const handleAdicionarColaborador = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ Você precisa estar logado para adicionar colaboradores!');
      navigate('/login');
      return;
    }
    if (!equipeSelecionada) {
      alert('Selecione uma equipe!');
      return;
    }

    try {
      await axiosJWT.post(
        `http://localhost:8080/equipes/${equipeSelecionada}/convidar`,
        { email: emailColaborador }
      );
      setEmailColaborador('');
      setEquipeSelecionada('');
      setShowFormColaborador(false);
      alert('✅ Convite enviado com sucesso! O colaborador receberá um e-mail.');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) alert('⚠️ Não autorizado! Faça login novamente.');
        else if (err.response.status === 400) alert('⚠️ Usuário já é membro ou email inválido.');
        else alert(`❌ Erro ao enviar convite: ${err.response.data}`);
      } else {
        alert(`❌ Erro ao enviar convite: ${err.message}`);
      }
      console.error('Erro ao adicionar colaborador:', err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ Você precisa estar logado para deletar equipes!');
      navigate('/login');
      return;
    }

    try {
      await axiosJWT.delete(`http://localhost:8080/equipes/${id}`);
      setEquipes(prev => prev.filter(e => e.id !== id));
      alert('✅ Equipe deletada com sucesso!');
    } catch (err) {
      if (err.response && err.response.status === 401) alert('⚠️ Não autorizado! Faça login com um ADMIN.');
      else alert('❌ Não foi possível excluir a equipe.');
      console.error('Erro ao excluir equipe:', err);
    }
  };

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <div className="gestao-equipes-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <Link to="/equipe" className="logo-link">
            <img src={logo} alt="Logo TaskNavigation" />
          </Link>
        </div>
        <ul className="menu">
          <li><Link to="/home2" className={isActive('/home2')}><i className="bi bi-house-door-fill"></i><span className="menu-text">Início</span></Link></li>
          <li><Link to="/equipe" className={isActive('/equipe')}><i className="bi bi-people"></i><span className="menu-text">Equipe</span></Link></li>
          <li><Link to="/gestaotarefas" className={isActive('/gestaotarefas')}><i className="bi bi-list-task"></i><span className="menu-text">Tarefas</span></Link></li>
          <li><Link to="/gestaoprojeto" className={isActive('/gestaoprojeto')}><i className="bi bi-folder2-open"></i><span className="menu-text">Projetos</span></Link></li>
          <li><Link to="/gestaodepartamento" className={isActive('/gestaodepartamento')}><i className="bi bi-building"></i><span className="menu-text">Departamentos</span></Link></li>
          <li><Link to="/gestaousuario" className={isActive('/gestaousuario')}><i className="bi bi-people-fill"></i><span className="menu-text">Usuários</span></Link></li>
          <li><Link to="/dashboard" className={isActive('/dashboard')}><i className="bi bi-speedometer2"></i><span className="menu-text">Dashboard</span></Link></li>
          <li><Link to="/relatorios" className={isActive('/relatorios')}><i className="bi bi-graph-up"></i><span className="menu-text">Relatórios</span></Link></li>
          <li><Link to="/configuracao" className={isActive('/configuracao')}><i className="bi bi-gear-fill"></i><span className="menu-text">Configurações</span></Link></li>
        </ul>
      </aside>

      {/* Conteúdo Principal */}
      <main className="main">
        <div className="dashboard">
          <div className="dash-2">
            <div className="task-container">
              <div className="hero">
                <h1>Gestão de Equipes</h1>
                <p>Crie equipes e convide colaboradores</p>
              </div>

              <div className="mb-3">
                <button className="botao-criar-tarefa" onClick={() => setShowFormEquipe(true)}>Criar nova equipe</button>
                <button className="botao-criar-tarefa" onClick={() => setShowFormColaborador(true)}>Adicionar colaborador</button>
              </div>

              <div className="table-wrapper">
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Nome</th>
                      <th>Código Convite</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipes.map(eq => (
                      <tr key={eq.id}>
                        <td>{eq.nome}</td>
                        <td>{eq.codigoConvite}</td>
                        <td>
                          <button className="delete-btn" onClick={() => handleDelete(eq.id)}>
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <footer className="footer-container">
            <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
            <p>Este painel fornece visão rápida das funcionalidades principais do sistema.</p>
          </footer>
        </div>
      </main>

      {/* Modal - Criar Equipe */}
      {showFormEquipe && (
        <div className="modal-overlay">
          <div className="modal-form">
            <button className="close-btn" onClick={() => setShowFormEquipe(false)}>×</button>
            <form onSubmit={handleCriarEquipe}>
              <h3>Nova Equipe</h3>
              <input
                className="form-control mb-2"
                placeholder="Nome da Equipe"
                value={nomeEquipe}
                onChange={(e) => setNomeEquipe(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-success w-100">Salvar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal - Adicionar Colaborador */}
      {showFormColaborador && (
        <div className="modal-overlay">
          <div className="modal-form">
            <button className="close-btn" onClick={() => setShowFormColaborador(false)}>×</button>
            <form onSubmit={handleAdicionarColaborador}>
              <h3>Adicionar Colaborador</h3>
              <select
                className="form-control mb-2"
                value={equipeSelecionada}
                onChange={(e) => setEquipeSelecionada(e.target.value)}
                required
              >
                <option value="">Selecione uma equipe</option>
                {equipes.map(eq => (
                  <option key={eq.id} value={eq.id}>{eq.nome}</option>
                ))}
              </select>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email do colaborador"
                value={emailColaborador}
                onChange={(e) => setEmailColaborador(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary w-100">Enviar Convite</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestaoEquipes;
