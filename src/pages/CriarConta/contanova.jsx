import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/contanova.css';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/auth-pages.css'

const RegisterPage = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmSenha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmSenha) {
      alert('As senhas não conferem.');
      return;
    }

    try {
     const response = await fetch('http://localhost:8080/usuarios', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome,
    email,
    senha,
    origem: "web",    // opcional, se quiser diferenciar
    nivel: "ADMIN"    // 🔹 força criar como ADMIN
  }),
});

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        const error = await response.text();
        alert(`Erro ao cadastrar: ${error}`);
      }
    } catch (error) {
      alert('Erro de conexão. Tente novamente.');
    }
  };

  return (
<div className="register-page">
  <div className="register-container">

    {/* Div do formulário */}
    <div className="register-form">
      <h2>Criar Conta</h2>
      <form onSubmit={handleCadastro}>
        <div className="input-group">
          <i className="bi bi-person" />
          <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="input-group">
          <i className="bi bi-envelope" />
          <input type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <i className="bi bi-lock" />
          <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <div className="input-group">
          <i className="bi bi-lock-fill" />
          <input type="password" placeholder="Confirme sua senha" value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <div className="footer-links">
        <a href="/login">Já tenho conta</a>
      </div>
    </div>

    {/* Div da imagem */}
    <div className="register-image">
      <img src="src/pages/img/Design sem nome (4).png" alt="Ilustração segurança" />
    </div>

  </div>
</div>


  );
};

export default RegisterPage;
