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
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Sempre define Content-Type JSON
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error)
);



  // 🔹 Buscar equipes do usuário logado
  const buscarEquipes = async () => {
    try {
      const res = await axiosJWT.get('http://localhost:8080/equipes/minhas');
      const data = Array.isArray(res.data) ? res.data : res.data.equipes || [];
      const usuario = JSON.parse(localStorage.getItem('usuario'));

      // Filtra só equipes do usuário logado como criador ou participante
      const equipesDoUsuario = data.filter(eq => 
        eq.criador?.id === usuario.id || eq.usuarios?.some(u => u.id === usuario.id)
      );

      setEquipes(res.data);
    } catch (err) {
      console.error('Erro ao buscar equipes:', err);
      alert('❌ Erro ao carregar equipes.');
    }
  };

  // 🔹 Carrega equipes ao abrir a página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ Você precisa estar logado!');
      navigate('/login');
      return;
    }
    buscarEquipes();
  }, [navigate]);



  // 🔹 Criar nova equipe
const handleCriarEquipe = async (e) => {
  e.preventDefault();
  if (!nomeEquipe) return;

  try {
    await axiosJWT.post('http://localhost:8080/equipes', {
      nome: nomeEquipe,
      descricao: ""
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setNomeEquipe('');
    setShowFormEquipe(false);

    // 🔹 Atualiza a lista de equipes após criar
    buscarEquipes();

    alert('✅ Equipe criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar equipe:', err);
    alert(`❌ Erro ao criar equipe: ${err.response?.data || err.message}`);
  }
};





  // 🔹 Adicionar colaborador
  const handleAdicionarColaborador = async (e) => {
    e.preventDefault();
    if (!emailColaborador || !equipeSelecionada) {
      alert('⚠️ Preencha todos os campos!');
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
      alert('✅ Convite enviado com sucesso!');
    } catch (err) {
      console.error('Erro ao adicionar colaborador:', err);
      alert(`❌ Erro ao enviar convite: ${err.response?.data || err.message}`);
    }
  };

  // 🔹 Excluir equipe
  const handleDelete = async (id) => {
    try {
      await axiosJWT.delete(`http://localhost:8080/equipes/${id}`);
      setEquipes(prev => prev.filter(e => e.id !== id));
      alert('✅ Equipe deletada com sucesso!');
    } catch (err) {
      console.error('Erro ao excluir equipe:', err);
      alert(`❌ Não foi possível excluir a equipe: ${err.response?.data || err.message}`);
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
          <li><Link to="/home2" className={isActive('/home2')}><i className="bi bi-house-door-fill"></i> Início</Link></li>
          <li><Link to="/equipe" className={isActive('/equipe')}><i className="bi bi-people"></i> Equipe</Link></li>
          <li><Link to="/gestaotarefas" className={isActive('/gestaotarefas')}><i className="bi bi-list-task"></i> Tarefas</Link></li>
          <li><Link to="/gestaoprojeto" className={isActive('/gestaoprojeto')}><i className="bi bi-folder2-open"></i> Projetos</Link></li>
          <li><Link to="/gestaodepartamento" className={isActive('/gestaodepartamento')}><i className="bi bi-building"></i> Departamentos</Link></li>
          <li><Link to="/gestaousuario" className={isActive('/gestaousuario')}><i className="bi bi-people-fill"></i> Usuários</Link></li>
          <li><Link to="/dashboard" className={isActive('/dashboard')}><i className="bi bi-speedometer2"></i> Dashboard</Link></li>
          <li><Link to="/relatorios" className={isActive('/relatorios')}><i className="bi bi-graph-up"></i> Relatórios</Link></li>
          <li><Link to="/configuracao" className={isActive('/configuracao')}><i className="bi bi-gear-fill"></i> Configurações</Link></li>
        </ul>
      </aside>

      {/* Conteúdo */}
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
                    {equipes.length > 0 ? equipes.map(eq => (
                      <tr key={eq.id}>
                        <td>{eq.nome}</td>
                        <td>{eq.codigoConvite}</td>
                        <td>
                          <button className="delete-btn" onClick={() => handleDelete(eq.id)}>
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="3" className="text-center">Nenhuma equipe encontrada</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <footer className="footer-container">
            <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
          </footer>
        </div>
      </main>

      {/* Modal Criar Equipe */}
      {showFormEquipe && (
        <div className="modal-overlay">
          <div className="modal-form">
            <button className="close-btn" onClick={() => setShowFormEquipe(false)}>×</button>
            <form onSubmit={handleCriarEquipe}>
              <h3>Nova Equipe</h3>
              <input className="form-control mb-2" placeholder="Nome da Equipe" value={nomeEquipe} onChange={e => setNomeEquipe(e.target.value)} required />
              <button type="submit" className="btn btn-success w-100">Salvar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Adicionar Colaborador */}
      {showFormColaborador && (
        <div className="modal-overlay">
          <div className="modal-form">
            <button className="close-btn" onClick={() => setShowFormColaborador(false)}>×</button>
            <form onSubmit={handleAdicionarColaborador}>
              <h3>Adicionar Colaborador</h3>
              <select className="form-control mb-2" value={equipeSelecionada} onChange={e => setEquipeSelecionada(e.target.value)} required>
                <option value="">Selecione uma equipe</option>
                {equipes.map(eq => <option key={eq.id} value={eq.id}>{eq.nome}</option>)}
              </select>
              <input type="email" className="form-control mb-2" placeholder="Email do colaborador" value={emailColaborador} onChange={e => setEmailColaborador(e.target.value)} required />
              <button type="submit" className="btn btn-primary w-100">Enviar Convite</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestaoEquipes;
