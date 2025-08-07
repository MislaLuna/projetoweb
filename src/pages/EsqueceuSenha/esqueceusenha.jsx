import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/login.css'; 

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
    <div className="login-container">
      <div className="login-form">
        <h2>Recuperar Senha</h2>
        <p style={{ marginBottom: '15px' }}>
          Informe seu e-mail cadastrado para receber o código de recuperação.
        </p>
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
        <div className="footer-links" style={{ marginTop: '15px' }}>
          <a href="/login" className="create-account-link">Voltar ao Login</a><br />
          <a href="/register" className="forgot-password-link">Criar uma Conta</a>
        </div>
      </div>
      <div className="login-image" style={{ flex: 1, maxWidth: '500px', padding: '150px', borderRadius: '200px' }}>
        <img
          src="src/pages/img/7f5c7cd30efc2190db8c19614d073516.png"
          alt="Imagem Recuperação"
          style={{ width: '100%', borderRadius: '10px', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
