  import React, { useEffect, useState } from 'react';
  import { useLocation, Link } from 'react-router-dom';
  import axios from 'axios';
  import '../../css/gestaotarefa.css';
  import logo from '../img/image.png';

  function GestaoTarefas() {
    const location = useLocation();
    const [usuarios, setUsuarios] = useState([]);
    const [tarefas, setTarefas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [idEditando, setIdEditando] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prazo, setPrazo] = useState('');
    const [status, setStatus] = useState('Pendente');
    const [prioridade, setPrioridade] = useState('Média');
    const [usuarioId, setUsuarioId] = useState('');

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_URL}/usuarios`)
        .then(res => setUsuarios(res.data))
        .catch(err => console.error(err));

      axios.get(`${import.meta.env.VITE_API_URL}/tarefas`)
        .then(res => setTarefas(res.data))
        .catch(err => console.error(err));
    }, []);

    const resetForm = () => {
      setTitulo('');
      setDescricao('');
      setPrazo('');
      setStatus('Pendente');
      setPrioridade('Média');
      setUsuarioId('');
      setIdEditando(null);
      setModoEdicao(false);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = { titulo, descricao, prazo, status, prioridade, usuario: { id: Number(usuarioId) }, projeto: null };

      try {
        if (modoEdicao && idEditando !== null) {
          await axios.put(`${import.meta.env.VITE_API_URL}/tarefas/${idEditando}`, { ...payload, idTarefa: idEditando });
        } else {
          await axios.post(`${import.meta.env.VITE_API_URL}/tarefas`, payload);
        }
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tarefas`);
        setTarefas(res.data);
        resetForm();
        setShowForm(false);
      } catch (error) {
        console.error(error);
      }
    };

    const handleDelete = async (id) => {
      try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/tarefas/${id}`);
        if (res.status === 204 || res.status === 200) {
          setTarefas(prev => prev.filter(t => t.idTarefa !== id));
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleEdit = (tarefa) => {
      setShowForm(true);
      setModoEdicao(true);
      setIdEditando(tarefa.idTarefa);
      setTitulo(tarefa.titulo);
      setDescricao(tarefa.descricao);
      setPrazo(tarefa.prazo);
      setStatus(tarefa.status);
      setPrioridade(tarefa.prioridade);
      setUsuarioId(tarefa.usuario?.id?.toString() || '');
    };

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
      <li>
        <Link to="/home2" className={location.pathname === '/home2' ? 'active' : ''}>
          <i className="bi bi-house-door-fill"></i> 
          <span className="menu-text">Início</span>
        </Link>
      </li>

      <li>
        <Link to="/equipe" className={location.pathname === '/equipe' ? 'active' : ''}>
          <i className="bi bi-people"></i> 
          <span className="menu-text">Equipe</span>
        </Link>
      </li>

      <li>
        <Link to="/gestaotarefas" className={location.pathname === '/gestaotarefas' ? 'active' : ''}>
          <i className="bi bi-list-task"></i> 
          <span className="menu-text">Tarefas</span>
        </Link>
      </li>

      <li>
        <Link to="/gestaodepartamento" className={location.pathname === '/gestaodepartamento' ? 'active' : ''}>
          <i className="bi bi-building"></i> 
          <span className="menu-text">Departamentos</span>
        </Link>
      </li>

      <li>
        <Link to="/gestaousuario" className={location.pathname === '/gestaousuario' ? 'active' : ''}>
          <i className="bi bi-people-fill"></i> 
          <span className="menu-text">Usuários</span>
        </Link>
      </li>

      <li>
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
          <i className="bi bi-speedometer2"></i> 
          <span className="menu-text">DashBoard</span>
        </Link>
      </li>

      <li>
        <Link to="/relatorios" className={location.pathname === '/relatorios' ? 'active' : ''}>
          <i className="bi bi-graph-up"></i> 
          <span className="menu-text">Relatórios</span>
        </Link>
      </li>

      <li>
        <Link to="/configuracao" className={location.pathname === '/configuracao' ? 'active' : ''}>
          <i className="bi bi-gear-fill"></i> 
          <span className="menu-text">Configurações</span>
        </Link>
      </li>
    </ul>
  </aside>


        {/* Main */}
        <main className="main">
          <div className="hero">
            <h1>Gestão de Tarefas</h1>
            <p>Visualização e gerenciamento de todas as tarefas</p>
          </div>

          <div className="config-container">
            <button className="btn btn-success mb-3" onClick={() => { resetForm(); setShowForm(true); }}>Criar nova tarefa</button>

            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Usuário</th>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Prioridade</th>
                    <th>Prazo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tarefas.map(tarefa => (
                    <tr key={tarefa.idTarefa}>
                      <td>{tarefa.usuario?.nome || '---'}</td>
                      <td>{tarefa.titulo}</td>
                      <td>{tarefa.descricao}</td>
                      <td><span className={`badge ${tarefa.status === 'Concluída' ? 'bg-success' : 'bg-warning text-dark'}`}>{tarefa.status}</span></td>
                      <td><span className={`badge ${tarefa.prioridade === 'Alta' ? 'bg-danger' : tarefa.prioridade === 'Média' ? 'bg-primary' : 'bg-secondary'}`}>{tarefa.prioridade}</span></td>
                      <td>{tarefa.prazo?.slice(0, 10)}</td>
                      <td className="action-buttons">
                        <button className="btn btn-primary" onClick={() => handleEdit(tarefa)}><i className="bi bi-pencil-fill"></i></button>
                        <button className="btn btn-danger" onClick={() => handleDelete(tarefa.idTarefa)}><i className="bi bi-trash-fill"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal com blur */}
    {showForm && (
    <div className="modal-overlay">
      <div className="modal-form">
        <button className="close-btn" onClick={() => setShowForm(false)}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h3>{modoEdicao ? 'Editar Tarefa' : 'Criar Nova Tarefa'}</h3>
          <select className="form-control mb-2" value={usuarioId} onChange={e => setUsuarioId(e.target.value)} required>
            <option value="">Selecione o usuário</option>
            {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
          </select>
          <input className="form-control mb-2" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} required />
          <input className="form-control mb-2" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
          <input type="date" className="form-control mb-2" value={prazo ? prazo.slice(0,10) : ''} onChange={e => setPrazo(e.target.value)} required />
          <select className="form-control mb-2" value={status} onChange={e => setStatus(e.target.value)} required>
            <option value="Pendente">Pendente</option>
            <option value="Concluída">Concluída</option>
          </select>
          <select className="form-control mb-3" value={prioridade} onChange={e => setPrioridade(e.target.value)} required>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
          <button type="submit" className="btn btn-success w-100">{modoEdicao ? 'Atualizar' : 'Salvar'}</button>
        </form>
      </div>
    </div>
  )}



          <footer className="footer-container">
            <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
            <p>Este sistema foi desenvolvido para facilitar a gestão de tarefas e usuários.</p>
          </footer>
        </main>
      </div>
    );
  }

  export default GestaoTarefas;
