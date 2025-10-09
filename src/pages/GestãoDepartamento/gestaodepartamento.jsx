import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "../../css/gestaotarefa.css";
import logo from "../img/image.png";

function Departamentos() {
  const location = useLocation();
  const [departamentos, setDepartamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novoDepartamento, setNovoDepartamento] = useState({ nome: "", descricao: "" });

  useEffect(() => {
    const buscarDepartamentos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/departamentos");
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar departamentos:", error);
      }
    };
    buscarDepartamentos();
  }, []);

  const handleAddDepartamento = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/departamentos", novoDepartamento);
      setShowModal(false);
      setNovoDepartamento({ nome: "", descricao: "" });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao adicionar departamento:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este departamento?")) {
      try {
        await axios.delete(`http://localhost:8080/departamentos/${id}`);
        setDepartamentos(departamentos.filter((d) => d.id !== id));
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  return (
    <div className="configuration-page">
      {/* Sidebar igual à página GestaoTarefas */}
      <aside className="sidebar">
        <div className="logo">
          <Link to="/home2"><img src={logo} alt="Logo TaskNavigation" /></Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/home2" className={location.pathname === "/home2" ? "active" : ""}>
              <i className="bi bi-house-door-fill"></i><span className="menu-text">Início</span>
            </Link>
          </li>
          <li>
            <Link to="/equipe" className={location.pathname === "/equipe" ? "active" : ""}>
              <i className="bi bi-people"></i><span className="menu-text">Equipe</span>
            </Link>
          </li>
          <li>
            <Link to="/gestaotarefas" className={location.pathname === "/gestaotarefas" ? "active" : ""}>
              <i className="bi bi-list-task"></i><span className="menu-text">Tarefas</span>
            </Link>
          </li>
          <li>
            <Link to="/gestaoprojeto" className={location.pathname === "/gestaoprojeto" ? "active" : ""}>
              <i className="bi bi-folder2-open"></i><span className="menu-text">Projetos</span>
            </Link>
          </li>
          <li>
            <Link to="/gestaodepartamento" className={location.pathname === "/gestaodepartamento" ? "active" : ""}>
              <i className="bi bi-building"></i><span className="menu-text">Departamentos</span>
            </Link>
          </li>
          <li>
            <Link to="/gestaousuario" className={location.pathname === "/gestaousuario" ? "active" : ""}>
              <i className="bi bi-people-fill"></i><span className="menu-text">Usuários</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
              <i className="bi bi-speedometer2"></i><span className="menu-text">DashBoard</span>
            </Link>
          </li>
          <li>
            <Link to="/relatorios" className={location.pathname === "/relatorios" ? "active" : ""}>
              <i className="bi bi-graph-up"></i><span className="menu-text">Relatórios</span>
            </Link>
          </li>
          <li>
            <Link to="/configuracao" className={location.pathname === "/configuracao" ? "active" : ""}>
              <i className="bi bi-gear-fill"></i><span className="menu-text">Configurações</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main className="main">
        <section className="hero">
          <h1>Departamentos</h1>
          <p>Gerencie os setores da sua empresa de forma simples e organizada.</p>
        </section>

        <div className="config-container">
          <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>
            ➕ Adicionar Departamento
          </button>

          <div className="table-responsive mt-4">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {departamentos.length > 0 ? (
                  departamentos.map((dep) => (
                    <tr key={dep.id}>
                      <td>{dep.nome}</td>
                      <td>{dep.descricao}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(dep.id)}>
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">Nenhum departamento encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <form className="modal-form" onSubmit={handleAddDepartamento}>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>✕</button>
              <h3>Adicionar Departamento</h3>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nome do departamento"
                value={novoDepartamento.nome}
                onChange={(e) => setNovoDepartamento({ ...novoDepartamento, nome: e.target.value })}
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Descrição"
                value={novoDepartamento.descricao}
                onChange={(e) => setNovoDepartamento({ ...novoDepartamento, descricao: e.target.value })}
              />
              <button type="submit" className="btn btn-success w-100">Salvar</button>
            </form>
          </div>
        )}

        <footer className="footer-container">
          <p>© 2025 TaskNavigation — Todos os direitos reservados</p>
        </footer>
      </main>
    </div>
  );
}

export default Departamentos;
