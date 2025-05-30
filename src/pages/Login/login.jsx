import React, { useState, useEffect } from 'react'; // Importando useState e useEffect
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/login.css'; // Caso seu CSS esteja separado
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

const LoginPage = () => {
    const navigate = useNavigate(); // Hook para navegação
    const [data, setData] = useState([]); // Estado para armazenar dados da API
    const [username, setUsername] = useState(''); // Estado para o nome de usuário
    const [password, setPassword] = useState(''); // Estado para a senha

    // Efeito para buscar dados da API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080'); // URL da API
                if (!response.ok) {
                    throw new Error('Erro na rede');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []); // Executa apenas uma vez ao montar o componente

    // Função para lidar com o login
 const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    if (username && password) {
        try {
            const response = await fetch('http://localhost:8080/usuarios', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }

            const result = await response.json();
            // Supondo que a API retorne um token ou uma confirmação
            console.log('Login bem-sucedido:', result);
            navigate('/inicio'); // Redireciona para a página inicial
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Login falhou! Verifique suas credenciais.');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
};
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <div className="input-group">
                            <i className="bi bi-person" />
                            <input
                                type="text"
                                id="username"
                                placeholder="Digite seu usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Atualiza o estado
                                required // Campo obrigatório
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <i className="bi bi-lock" />
                            <input
                                type="password"
                                id="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
                                required // Campo obrigatório
                            />
                        </div>
                    </div>
                    <div className="footer-links">
                        <a href="#" className="forgot-password-link">Esqueci a senha?</a>
                        <a href="/contanova" className="forgot-password-link">Criar Conta</a>
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
            <div className="login-image">
                <img src="src/pages/img/mulher-usando-um-tablet-isolado-na-parede-branca_53419-9802.avif" alt="Imagem de Login" />
            </div>
        </div>
    );
};

export default LoginPage;
