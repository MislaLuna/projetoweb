import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/login.css';
 
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
        body: JSON.stringify({ nome, email, senha, origem: 'web' }),
      });
 
      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        const error = await response.text();
        alert(`Erro ao cadastrar: ${error}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro de conexão. Tente novamente.');
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Criar Conta</h2>
        <form onSubmit={handleCadastro}>
          <div className="input-group">
            <i className="bi bi-person" />
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="bi bi-envelope" />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="bi bi-lock" />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="bi bi-lock-fill" />
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};
 
export default RegisterPage;