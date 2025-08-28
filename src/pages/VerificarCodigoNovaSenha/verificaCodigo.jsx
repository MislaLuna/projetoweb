import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/verificacodigosenhanova.css';

const VerifyCodePage = () => {
  const [code, setCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/usuarios/verificar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo: code }),
      });

      if (!response.ok) {
        const text = await response.text();
        return alert(`Código inválido: ${text}`);
      }

      navigate('/crianovasenha', { state: { email, token: code } });
    } catch (err) {
      alert('Erro ao verificar código.');
    }
  };

  return (
    <div className="verify-code-page">
      {/* Formulário */}
      <div className="verify-code-form">
        <h2>Verificar Código</h2>

        <div className="email-info">
          Digite o código de 6 dígitos enviado para o e-mail: <strong>{email}</strong>
        </div>

        <form onSubmit={handleVerify}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Código de verificação"
              maxLength="6"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verificar</button>
        </form>
      </div>

      {/* Imagem */}
      <div className="verify-code-image">
        <img src="src/pages/img/codigo.png" alt="Ilustração código" />
      </div>
    </div>
  );
};

export default VerifyCodePage;
