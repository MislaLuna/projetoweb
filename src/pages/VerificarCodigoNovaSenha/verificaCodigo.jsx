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
        body: JSON.stringify({ email, token: code }),
      });

      if (!response.ok) {
        const text = await response.text();
        return alert(`Código inválido: ${text}`);
      }

      // Navega para redefinir senha, passando email e token para confirmar
      navigate('/redefinir-senha', { state: { email, token: code } });
    } catch (err) {
      alert('Erro ao verificar código.');
    }
  };

  return (
    <div className="verify-code-page">
      <div className="verify-code-container">
        <div className="verify-code-form">
          <h2>Verificar Código</h2>
          <p style={{ marginBottom: '15px' }}>
            Digite o código de 6 dígitos enviado para o seu e-mail:
          </p>
          <form onSubmit={handleVerify}>
            <div className="verify-code-input-group">
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
      </div>
    </div>
  );
};

export default VerifyCodePage;
