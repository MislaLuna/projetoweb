import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/gestaotarefa.css';
import logo from '../img/image.png';

function GestaoProjetos() {
  const location = useLocation();
  const [usuarios, setUsuarios] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // Campos do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  // Token JWT
  const token = localStorage.getItem('token');

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Carregar usuários
    axios.get(`${import.meta.env.VITE_API_URL}/usuarios`, config)
      .then(res => setUsuarios(res.data))
      .catch(err => console.error("Erro ao carregar usuários:", err));

    // Carregar projetos
    carregarProjetos();
  }, []);

  const carregarProjetos = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/projetos`, config);
      setProjetos(res.data || []);
      console.log("Projetos carregados:", res.data);
    } catch (err) {
      console.error("Erro ao carregar projetos:", err);
    }
  };

  const resetForm = () => {
    setNome('');
    setDescricao('');
    setPrazo('');
    setUsuarioId('');
    setIdEditando(null);
    setModoEdicao(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuarioId || isNaN(Number(usuarioId))) {
      alert("Selecione um usuário válido antes de salvar o projeto!");
      return;
    }

    const payload = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      prazo: prazo || null,
      usuario: { id: Number(usuarioId) }
    };

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (modoEdicao && idEditando !== null) {
        await axios.put(`${import.meta.env.VITE_API_URL}/projetos/${idEditando}`, { ...payload, idProjeto: idEditando }, config);
        console.log("Projeto atualizado:", payload);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/projetos`, payload, config);
        console.log("Projeto criado:", payload);
      }

      await carregarProjetos();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
        alert(`Erro ao salvar projeto: ${error.response.data?.mensagem || error.response.data || 'Verifique os dados enviados.'}`);
      } else {
        alert("Erro ao salvar projeto. Tente novamente mais tarde.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/projetos/${id}`, config);
      if (res.status === 204 || res.status === 200) {
        setProjetos(prev => prev.filter(p => p.idProjeto !== id));
        console.log(`Projeto ${id} deletado`);
      }
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
    }
  };

  const handleEdit = (projeto) => {
    setShowForm(true);
    setModoEdicao(true);
    setIdEditando(projeto.idProjeto);
    setNome(projeto.nome);
    setDescricao(projeto.descricao);
    setPrazo(projeto.prazo);
    setUsuarioId(projeto.usuario?.id?.toString() || '');
  };

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
          <li><Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}><i className="bi bi-speedometer2"></i><span className="menu-text">DashBoard</span></Link></li>
          <li><Link to="/relatorios" className={location.pathname === '/relatorios' ? 'active' : ''}><i className="bi bi-graph-up"></i><span className="menu-text">Relatórios</span></Link></li>
          <li><Link to="/configuracao" className={location.pathname === '/configuracao' ? 'active' : ''}><i className="bi bi-gear-fill"></i><span className="menu-text">Configurações</span></Link></li>
        </ul>
      </aside>

      <main className="main">
        <div className="hero">
          <h1>Gestão de Projetos</h1>
          <p>Visualização e gerenciamento de todos os projetos</p>
        </div>

        <div className="config-container">
          <button className="btn btn-success mb-3" onClick={() => { resetForm(); setShowForm(true); }}>Criar novo projeto</button>

          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Usuário</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Prazo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {projetos.length > 0 ? projetos.map(projeto => (
                  <tr key={projeto.idProjeto}>
                    <td>{projeto.usuario?.nome || '---'}</td>
                    <td>{projeto.nome}</td>
                    <td>{projeto.descricao}</td>
                    <td>{projeto.prazo?.slice(0, 10) || '---'}</td>
                    <td className="action-buttons">
                      <button className="btn btn-primary" onClick={() => handleEdit(projeto)}><i className="bi bi-pencil-fill"></i></button>
                      <button className="btn btn-danger" onClick={() => handleDelete(projeto.idProjeto)}><i className="bi bi-trash-fill"></i></button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>Nenhum projeto encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal-form">
              <button className="close-btn" onClick={() => setShowForm(false)}>&times;</button>
              <form onSubmit={handleSubmit}>
                <h3>{modoEdicao ? 'Editar Projeto' : 'Criar Novo Projeto'}</h3>

                <select className="form-control mb-2" value={usuarioId} onChange={e => setUsuarioId(e.target.value)} required>
                  <option value="">Selecione o usuário</option>
                  {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
                </select>

                <input className="form-control mb-2" placeholder="Nome do projeto" value={nome} onChange={e => setNome(e.target.value)} required />
                <input className="form-control mb-2" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
                <input type="date" className="form-control mb-3" value={prazo ? prazo.slice(0, 10) : ''} onChange={e => setPrazo(e.target.value)} required />

                <button type="submit" className="btn btn-success w-100">{modoEdicao ? 'Atualizar' : 'Salvar'}</button>
              </form>
            </div>
          </div>
        )}

        <footer className="footer-container">
          <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
          <p>Este sistema foi desenvolvido para facilitar a gestão de projetos e tarefas.</p>
        </footer>
      </main>
    </div>
  );
}

export default GestaoProjetos;
