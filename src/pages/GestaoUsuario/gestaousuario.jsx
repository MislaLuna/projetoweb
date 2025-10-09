import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import '../../css/gestaotarefa.css';
import logo from '../img/image.png';

function GestaoUsuarios() {
  const location = useLocation();
  const [usuarios, setUsuarios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [departamentoId, setDepartamentoId] = useState('');

  useEffect(() => {
    buscarUsuarios();
    // buscarDepartamentos(); // 🔒 Desativado temporariamente — aguardando criação da tabela e classes no backend
  }, []);

  const buscarUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:8080/usuarios');
      setUsuarios(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔒 Função temporariamente comentada até existir a tabela e endpoint de departamentos
  /*
  const buscarDepartamentos = async () => {
    try {
      const res = await axios.get('http://localhost:8080/departamentos');
      setDepartamentos(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  */

  const resetForm = () => {
    setNome('');
    setEmail('');
    setDepartamentoId('');
    setIdEditando(null);
    setModoEdicao(false);
  };

  const handleEdit = (user) => {
    setNome(user.nome);
    setEmail(user.email);
    setDepartamentoId(user.departamento?.id || '');
    setIdEditando(user.id);
    setModoEdicao(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { nome, email, departamento: { id: Number(departamentoId) } };

    try {
      if (modoEdicao && idEditando !== null) {
        await axios.put(`http://localhost:8080/usuarios/${idEditando}`, payload);
      } else {
        await axios.post('http://localhost:8080/usuarios', payload);
      }
      await buscarUsuarios();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Função PATCH para ativar/desativar usuário
  const handleToggleAtivo = async (user) => {
    try {
      await axios.patch(`http://localhost:8080/usuarios/${user.id}/ativo`, { ativo: !user.ativo });
      setUsuarios(prev => prev.map(u => u.id === user.id ? { ...u, ativo: !u.ativo } : u));
    } catch (err) {
      console.error(err);
    }
  };

  const isActive = (path) => (location.pathname === path ? 'active' : '');

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
          <li><Link to="/home2" className={isActive('/home2')}><i className="bi bi-house-door-fill"></i> <span>Início</span></Link></li>
          <li><Link to="/equipe" className={isActive('/equipe')}><i className="bi bi-people"></i> <span>Equipe</span></Link></li>
          <li><Link to="/gestaotarefas" className={isActive('/gestaotarefas')}><i className="bi bi-list-task"></i> <span>Tarefas</span></Link></li>
          <li><Link to="/gestaoprojeto" className={isActive('/gestaoprojeto')}><i className="bi bi-folder2-open"></i> <span>Projetos</span></Link></li>
          <li><Link to="/gestaodepartamento" className={isActive('/gestaodepartamento')}><i className="bi bi-building"></i> <span>Departamentos</span></Link></li>
          <li><Link to="/gestaousuario" className={isActive('/gestaousuario')}><i className="bi bi-people-fill"></i> <span>Usuários</span></Link></li>
          <li><Link to="/dashboard" className={isActive('/dashboard')}><i className="bi bi-speedometer2"></i> <span>DashBoard</span></Link></li>
          <li><Link to="/relatorios" className={isActive('/relatorios')}><i className="bi bi-graph-up"></i> <span>Relatórios</span></Link></li>
          <li><Link to="/configuracao" className={isActive('/configuracao')}><i className="bi bi-gear-fill"></i> <span>Configurações</span></Link></li>
        </ul>
      </aside>

      {/* Main */}
      <main className="main">
        <div className="hero">
          <h1>Gestão de Usuários</h1>
          <p>Visualização e gerenciamento de usuários e seus departamentos</p>
        </div>

        <div className="config-container">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Departamento</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(user => (
                  <tr key={user.id}>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>{user.departamento?.nome || '---'}</td>
                    <td>{user.ativo ? 'Ativo' : 'Desativado'}</td>
                    <td className="action-buttons">
                      <button className="btn btn-primary me-2" onClick={() => handleEdit(user)}>
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button className={`btn ${user.ativo ? 'btn-danger' : 'btn-success'}`} onClick={() => handleToggleAtivo(user)}>
                        {user.ativo ? 'Desativar' : 'Ativar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-form">
              <button className="close-btn" onClick={() => setShowForm(false)}>&times;</button>
              <form onSubmit={handleSubmit}>
                <h3>{modoEdicao ? 'Editar Usuário' : 'Novo Usuário'}</h3>
                <input className="form-control mb-2" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
                <input className="form-control mb-2" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
                <select className="form-control mb-3" value={departamentoId} onChange={e => setDepartamentoId(e.target.value)} required>
                  <option value="">Selecione o departamento</option>
                  {departamentos.map(dep => <option key={dep.id} value={dep.id}>{dep.nome}</option>)}
                </select>
                <button type="submit" className="btn btn-success w-100">{modoEdicao ? 'Atualizar' : 'Salvar'}</button>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="footer-container">
          <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
          <p>Este sistema foi desenvolvido para facilitar a gestão de tarefas e usuários.</p>
        </footer>
      </main>
    </div>
  );
}

export default GestaoUsuarios;
  