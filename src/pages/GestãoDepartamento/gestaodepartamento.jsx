import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/gestaotarefa.css'; // Reutilizando o CSS principal
import logo from '../img/image.png';

function GestaoDepartamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation(); // Hook para obter a localização atual

  useEffect(() => {
    buscarDepartamentos();
  }, []);

  const buscarDepartamentos = async () => {
    try {
      const res = await axios.get('http://localhost:8080/departamentos');
      setDepartamentos(res.data);
    } catch (err) {
      console.error('Erro ao buscar departamentos:', err);
    }
  };

  const resetForm = () => {
    setNome('');
    setDescricao('');
    setIdEditando(null);
    setModoEdicao(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { nome, descricao };
    try {
      if (modoEdicao) {
        await axios.put(`http://localhost:8080/departamentos/${idEditando}`, { id: idEditando, ...payload });
      } else {
        await axios.post('http://localhost:8080/departamentos', payload);
      }
      await buscarDepartamentos();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error('Erro ao salvar departamento:', err);
    }
  };

  const handleEdit = (dep) => {
    setNome(dep.nome);
    setDescricao(dep.descricao);
    setIdEditando(dep.id);
    setModoEdicao(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/departamentos/${id}`);
      setDepartamentos(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error('Erro ao excluir:', err);
    }
  };

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <div className="gestaoTarefasContainer">
      <aside className="sidebar">
        <div className="logo">
          <Link to="/home2" className="logo-link">
            <img src={logo} alt="Logo TaskNavigation" />
          </Link>
        </div>
        <ul className="menu">
          <li><Link to="/home2" className={isActive('/home2')}><i className="bi bi-house-door-fill"></i> <span className="menu-text">Início</span></Link></li>
          <li><Link to="/gestaotarefas" className={isActive('/gestaotarefas')}><i className="bi bi-list-task"></i> <span className="menu-text">Gestão de tarefas</span></Link></li>
          <li><Link to="/gestaodepartamento" className={isActive('/gestaodepartamento')}><i className="bi bi-building"></i> <span className="menu-text">Gestão de departamentos</span></Link></li>
          <li><Link to="/pagina8" className={isActive('/pagina8')}><i className="bi bi-people-fill"></i> <span className="menu-text">Gestão de usuários</span></Link></li>
          <li><Link to="/dashboard" className={isActive('/dashboard')}><i className="bi bi-speedometer2"></i> <span className="menu-text">DashBoard</span></Link></li>
          <li><Link to="#" className={isActive('/relatorios')}><i className="bi bi-graph-up"></i> <span className="menu-text">Relatórios</span></Link></li>
          <li><Link to="/configuracao" className={isActive('/configuracao')}><i className="bi bi-gear-fill"></i> <span className="menu-text">Configurações</span></Link></li>
        </ul>
      </aside>

      <main className="main">
        <div className="dashboard">
          <div className="dash-2">
            <div className="task-container">
              <div className="hero">
                <h1>Gestão de Departamentos</h1>
                <p>Gerencie os setores e divisões da sua organização</p>
              </div>

              <div className="table-wrapper">
                <button
                  className="botao-criar-tarefa mb-3"
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                >
                  Criar novo departamento
                </button>

                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departamentos.map(dep => (
                      <tr key={dep.id}>
                        <td>{dep.nome}</td>
                        <td>{dep.descricao}</td>
                        <td>
                          <button className="edit-btn me-2" onClick={() => handleEdit(dep)}>
                            <i className="bi bi-pencil-fill"></i>
                          </button>
                          <button className="delete-btn" onClick={() => handleDelete(dep.id)}>
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

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-form">
            <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
            <form onSubmit={handleSubmit}>
              <h3>{modoEdicao ? 'Editar Departamento' : 'Novo Departamento'}</h3>

              <input
                className="form-control mb-2"
                placeholder="Nome do Departamento"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
              />
              <textarea
                className="form-control mb-3"
                placeholder="Descrição"
                rows="3"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                required
              />

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

export default GestaoDepartamentos;
