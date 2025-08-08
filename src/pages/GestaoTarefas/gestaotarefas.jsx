import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import '../../css/gestaotarefa.css';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import logo from '../img/image.png';

function GestaoTarefas() {
  const location = useLocation();

  // Estados
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

  // Busca usuários e tarefas no backend
  useEffect(() => {
    axios.get('http://localhost:8080/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Erro ao buscar usuários:', err));

    axios.get('http://localhost:8080/tarefas')
      .then(res => setTarefas(res.data))
      .catch(err => console.error('Erro ao buscar tarefas:', err));
  }, []);

  // Reseta o formulário
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

  // Submete o formulário (cria ou atualiza)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      titulo,
      descricao,
      prazo,
      status,
      prioridade,
      usuario: { id: Number(usuarioId) },
      projeto: null,
    };

    try {
      if (modoEdicao && idEditando !== null) {
        await axios.put(`http://localhost:8080/tarefas/${idEditando}`, {
          ...payload,
          idTarefa: idEditando,
        });
      } else {
        await axios.post('http://localhost:8080/tarefas', payload);
      }

      const res = await axios.get('http://localhost:8080/tarefas');
      setTarefas(res.data);
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  // Deleta tarefa
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/tarefas/${id}`);
      if (res.status === 204 || res.status === 200) {
        setTarefas(prev => prev.filter(t => t.idTarefa !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  // Preenche formulário para edição
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
    <div className="gestaoTarefasContainer">
      {/* Sidebar com navegação */}
      <aside className="sidebar">
        <div className="logo">
          <Link to="/home2" className="logo-link">
            <img src={logo} alt="Logo TaskNavigation" />
          </Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/home2" className={location.pathname === '/home2' ? 'active' : ''}>
              <i className="bi bi-house-door-fill"></i> <span className="menu-text">Início</span>
            </Link>
          </li>
          <li>
            <Link to="/gestaotarefas" className={location.pathname === '/gestaotarefas' ? 'active' : ''}>
              <i className="bi bi-list-task"></i> <span className="menu-text">Gestão de tarefas</span>
            </Link>
          </li>
          <li>
            <Link to="/gestaodepartamento" className={location.pathname === '/gestaodepartamento' ? 'active' : ''}>
              <i className="bi bi-building"></i> <span className="menu-text">Gestão de departamentos</span>
            </Link>
          </li>
          <li>
            <Link to="/pagina8" className={location.pathname === '/pagina8' ? 'active' : ''}>
              <i className="bi bi-people-fill"></i> <span className="menu-text">Gestão de usuários</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={location.pathname === '/pagina6' ? 'active' : ''}>
              <i className="bi bi-speedometer2"></i> <span className="menu-text">DashBoard</span>
            </Link>
          </li>
          <li>
            <Link to="/relatorios" className={location.pathname === '/relatorios' ? 'active' : ''}>
              <i className="bi bi-graph-up"></i> <span className="menu-text">Relatórios</span>
            </Link>
          </li>
          <li>
            <Link to="/configuracao" className={location.pathname === '/configuracoes' ? 'active' : ''}>
              <i className="bi bi-gear-fill"></i> <span className="menu-text">Configurações</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main className="main">
        <div className="dashboard">
          <div className="dash-2">
            <div className="task-container">
              <div className="hero">
                <h1>Gestão de Tarefas</h1>
                <p style={{ color: '#240046' }}>Visualização e gerenciamento de todas as tarefas</p>
              </div>

              <div className="table-wrapper">
                <button
                  onClick={() => { resetForm(); setShowForm(true); }}
                  className="botao-criar-tarefa mb-3"
                >
                  Criar nova tarefa
                </button>

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
                        <td>
                          <span className={`badge ${tarefa.status === 'Concluída' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {tarefa.status}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${
                            tarefa.prioridade === 'Alta' ? 'bg-danger' :
                            tarefa.prioridade === 'Média' ? 'bg-primary' :
                            'bg-secondary'
                          }`}>
                            {tarefa.prioridade}
                          </span>
                        </td>
                        <td>{tarefa.prazo?.slice(0, 10)}</td>
                        <td>
                          <button className="edit-btn me-1" onClick={() => handleEdit(tarefa)}>
                            <i className="bi bi-pencil-fill"></i>
                          </button>
                          <button className="delete-btn" onClick={() => handleDelete(tarefa.idTarefa)}>
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
            <p>Este sistema foi desenvolvido para facilitar a gestão de tarefas e usuários.</p>
            <div className="privacy-policy">
              <h4 className="policy-title">Política de Privacidade</h4>
              <div className="policy-text">
                <p>Coletamos e armazenamos dados pessoais apenas para fornecer nossos serviços.</p>
                <p>Utilizamos tecnologias de segurança para proteger suas informações.</p>
                <p>Entre em contato conosco para dúvidas sobre seus dados.</p>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Modal de formulário para criar/editar */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-form">
            <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
            <form onSubmit={handleSubmit}>
              <h3>{modoEdicao ? 'Editar Tarefa' : 'Criar Nova Tarefa'}</h3>

              <select
                className="form-control mb-2"
                value={usuarioId}
                onChange={e => setUsuarioId(e.target.value)}
                required
              >
                <option value="">Selecione o usuário</option>
                {usuarios.map(u => (
                  <option key={u.id} value={u.id}>{u.nome}</option>
                ))}
              </select>

              <input
                className="form-control mb-2"
                placeholder="Título"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                required
              />
              <input
                className="form-control mb-2"
                placeholder="Descrição"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                required
              />
              <input
                type="date"
                className="form-control mb-2"
                value={prazo ? prazo.slice(0, 10) : ''}
                onChange={e => setPrazo(e.target.value)}
                required
              />

              <select
                className="form-control mb-2"
                value={status}
                onChange={e => setStatus(e.target.value)}
                required
              >
                <option value="Pendente">Pendente</option>
                <option value="Concluída">Concluída</option>
              </select>

              <select
                className="form-control mb-3"
                value={prioridade}
                onChange={e => setPrioridade(e.target.value)}
                required
              >
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>

              <button type="submit" className="btn btn-success w-100">
                {modoEdicao ? 'Atualizar' : 'Salvar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestaoTarefas;
