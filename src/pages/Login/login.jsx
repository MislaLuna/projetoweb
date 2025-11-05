import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/login-exclusive.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    console.log("DEBUG - Email enviado:", trimmedEmail);
    console.log("DEBUG - Senha enviada:", trimmedPassword);

    try { 
      const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: trimmedEmail, 
          senha: trimmedPassword,
          isWebLogin: true  
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("DEBUG - Erro no login:", errorText);
        throw new Error(errorText || 'Erro ao fazer login');
      }

      const user = await response.json();

      if (user.token) {
        localStorage.setItem('token', user.token);
        console.log('DEBUG - Token armazenado:', user.token);
      } else {
        throw new Error('Token não encontrado no login.');
      }

      if (user.usuario) {
        localStorage.setItem('usuario', JSON.stringify(user.usuario));
      } else {
        localStorage.setItem('usuario', JSON.stringify(user));
      }

      // ✅ redireciona após login bem-sucedido
      navigate('/home2');

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-page-exclusive">
      <div className="login-container-exclusive">
        <div className="login-form-exclusive">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group-exclusive">
              <i className="bi bi-envelope"></i>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group-exclusive">
              <i className="bi bi-lock"></i>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="footer-links-exclusive">
              <a href="/contanova">Criar Conta</a>
              <a href="/esqueceusenha">Esqueci minha senha</a>
            </div>
            <button type="submit">Entrar</button>
          </form>
        </div>

        <div className="login-image-exclusive">
          <img 
            src="/src/pages/img/Design sem nome (3).png" 
            alt="Imagem de Login" 
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
