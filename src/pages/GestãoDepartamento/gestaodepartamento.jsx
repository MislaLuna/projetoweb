import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  return (
    <div className="gestaoTarefasContainer">
      <aside className="sidebar">
        <div className="logo">
          <a href="/home2" className="logo-link">
            <img src={logo} alt="Logo TaskNavigation" />
          </a>
        </div>
        <ul className="menu">
          <li><a href="/home2"><i className="bi bi-house-door-fill"></i> <span className="menu-text">Início</span></a></li>
          <li><a href="/gestaotarefas"><i className="bi bi-list-task"></i> <span className="menu-text">Gestão de tarefas</span></a></li>
          <li><a href="/gestaodepartamento"><i className="bi bi-building"></i> <span className="menu-text">Gestão de departamentos</span></a></li>
          <li><a href="/pagina8"><i className="bi bi-people-fill"></i> <span className="menu-text">Gestão de usuários</span></a></li>
          <li><a href="/dashboard"><i className="bi bi-speedometer2"></i> <span className="menu-text">DashBoard</span></a></li>
          <li><a href="#"><i className="bi bi-graph-up"></i> <span className="menu-text">Relatórios</span></a></li>
          <li><a href="#"><i className="bi bi-gear-fill"></i> <span className="menu-text">Configurações</span></a></li>
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
            <p>Este módulo permite organizar os setores da empresa com eficiência.</p>
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
