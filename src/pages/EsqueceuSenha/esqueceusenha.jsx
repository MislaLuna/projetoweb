import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/forgot-password.css'; // CSS exclusivo da página

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert('Por favor, preencha seu e-mail.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/usuarios/enviar-codigo-recuperacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Erro: ${errorText}`);
        return;
      }

      alert('Se este e-mail estiver cadastrado, você receberá o código de recuperação.');
      navigate('/verificaCodigo', { state: { email: email.trim() } });
    } catch (error) {
      console.error('Erro ao solicitar recuperação:', error);
      alert('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Recuperar Senha</h2>
        <p>Informe seu e-mail cadastrado para receber o código de recuperação.</p>
        <form onSubmit={handleForgotPassword}>
          <div className="input-group">
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Enviar Código</button>
        </form>
        <div className="footer-links">
          <a href="/login">Voltar ao Login</a>
          <a href="/register">Criar uma Conta</a>
        </div>
      </div>
      <div className="forgot-password-image">
        <img src="src/pages/img/recuperacao.png" alt="Recuperação" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
