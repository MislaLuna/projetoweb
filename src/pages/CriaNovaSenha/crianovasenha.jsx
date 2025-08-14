import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/criarnovasenha.css';

const ResetPasswordPage = () => {
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;

  const handleReset = async (e) => {
    e.preventDefault();

    if (senha !== confirmar) {
      alert('As senhas não coincidem.');
      return;
    }

    if (!email) {
      alert('Dados inválidos. Por favor, refaça o processo.');
      navigate('/recuperar-senha');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/usuarios/recuperar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, novaSenha: senha }),
      });

      if (!response.ok) {
        const msg = await response.text();
        alert(`Erro: ${msg}`);
        return;
      }

      alert('Senha redefinida com sucesso.');
      navigate('/login');
    } catch (err) {
      alert('Erro ao redefinir senha.');
      console.error(err);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-form">
          <h2>Redefinir Senha</h2>

          {email && (
            <div className="email-info">
              Digite a nova senha para o usuário: <strong>{email}</strong>
            </div>
          )}

          <form onSubmit={handleReset}>
            <div className="input-group">
              <input
                type="password"
                placeholder="Nova senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button type="submit">Redefinir Senha</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
