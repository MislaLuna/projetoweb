import React, { useEffect, useState } from 'react';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import '../../css/tooplate-gotto-job.css';
import logo from '../img/image.png';
import aboutImage from '../img/time-management-6933890_640.png';
import socialImage from '../img/mountains-7421828_1280.png';
import footerLogo from '../img/Black White Yellow Simple Initial Name Logo (5).png';
import 'bootstrap-icons/font/bootstrap-icons.css';


// API //
const HomePage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080'); // Corrigido
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    // Definindo as categorias
    const categories = [
        { title: 'Home', icon: 'house', link: 'login.jsx' },
        { title: 'Dashboard', icon: 'speedometer', link: 'login.jsx' },
        { title: 'Gestão de Usuário', icon: 'person', link: 'login.jsx' },
        { title: 'Gestão de Tarefas', icon: 'check2-square', link: 'login.jsx' },
        { title: 'Relatórios', icon: 'file-earmark-bar-graph', link: 'login.jsx' },
    ];

    return (
        <div className='bodyInicio'>
            

            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="projetoweb/src/pages/Home/inicio.jsx">
                        <img src={logo} className="img-fluid logo-image" alt="logo" />
                        <div className="d-flex flex-column">
                            <strong className="logo-text">TaskNavigation</strong>
                            <b><small className="logo-slogan">Gerenciador de Tarefas</small></b>
                        </div>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav align-items-center ms-lg-5">
                            <li className="nav-item ms-lg-auto">
                                <a className="nav-link" href="/contanova">Cadastrar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link custom-btn btn" href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>
                <section className="hero-section d-flex justify-content-center align-items-center">
                    <div className="section-overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-12 mb-5 mb-lg-0">
                                <div className="hero-section-text mt-5">
                                    <h6 className="text-white">Você está procurando um bom Gerenciador para sua Empresa?</h6>
                                    <h1 className="hero-title text-white mt-4 mb-4">TaskNavigation<br />a melhor plataforma de gerenciamento de tarefas</h1>
                                    <a href="#categories-section" className="custom-btn custom-border-btn btn">Variedades</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="categories-section section-padding" id="categories-section">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-12 col-12 text-center">
                                <h2 className="mb-5">Procurar por <span>Variedades</span></h2>
                            </div>
                            {categories.map((category, index) => (
                                <div className="col-lg-2 col-md-4 col-6" key={index}>
                                    <div className="categories-block">
                                        <a href="/login" className="d-flex flex-column justify-content-center align-items-center h-100">
                                            <i className={`categories-icon bi-${category.icon}`}></i>
                                            <small className="categories-block-title">{category.title}</small>
                                            <div className="categories-block-number d-flex flex-column justify-content-center align-items-center">
                                                <span className="categories-block-number-text">{index + 1}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-12">
                                <div className="about-image-wrap custom-border-radius-start">
                                    <img src={aboutImage} className="about-image custom-border-radius-start img-fluid" alt="image" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="custom-text-block">
                                    <h2 className="text-white mb-2">Introdução TaskNavigation</h2>
                                    <p className="text-white">Este site foi desenvolvido para administradores de empresas que desejam gerenciar funcionários e usuários de forma eficiente. Com ele, você terá acesso a diversas ferramentas essenciais, incluindo:</p>
                                    <ul>
                                        <li>✔ Dashboard com métricas detalhadas</li>
                                        <li>✔ Gestão de usuários e permissões</li>
                                        <li>✔ Gerenciamento de departamentos e equipes</li>
                                        <li>✔ Monitoramento de tarefas e projetos</li>
                                    </ul>
                                    <p className="text-white">Faça seu login agora e descubra todas as funcionalidades que vão otimizar a administração da sua empresa! 🚀</p>
                                </div>
                                
                            </div>
                            <div className="col-lg-3 col-12">
                                <div className="instagram-block">
                                    <img src={socialImage} className="about-image custom-border-radius-end img-fluid" alt="grupo" />
                                    <div className="instagram-block-text">
                                        <a href="https://instagram.com/" className="custom-btn btn">
                                            <i className="categories-icon bi-instagram me-1"></i>
                                            @TaskNavigation
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                </section>

                <section className="cta-section">
                    <div className="section-overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-10">
                                <h2 className="text-white mb-2">A eficácia na gestão de tarefas é essencial para o sucesso das empresas.</h2>
                                <p className="text-white">O sistema de um gerenciador de tarefas online se integra ao processo de negócios, automatizando e otimizando diversas etapas.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>







            <footer className="site-footer" style={{ minHeight: '200px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12 mb-3">
                            <div className="d-flex align-items-center mb-4">
                                <img src={footerLogo} className="img-fluid logo-image" alt="logo" />
                            </div>
                            <div className="footer-icons">
                                <p className="mb-2">
                                    <i className="custom-icon bi-globe me-1"></i>
                                    <a href="" className="site-footer-link">www.tasknavigation.com</a>
                                </p>
                                <p>
                                    <i className="custom-icon bi-envelope me-1"></i>
                                    <a href="mailto:info@yourgmail.com" className="site-footer-link">info@tasknavigation.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-footer-bottom" style={{ padding: '60px 0' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-12 d-flex align-items-center flex-column">
                                <p className="footer-text"><strong>Copyright © Task Navigation xxx</strong></p>
                                <p className="footer-text">O TaskNavigation é um sistema de gestão de tarefas desenvolvido para otimizar a organização e eficiência administrativa.</p>
                            </div>
                            <div className="col-lg-4 col-12 d-flex align-items-center flex-column">
                                <p className="footer-text"><strong>Política de Privacidade</strong></p>
                                <p className="footer-text">Coletamos e armazenamos dados pessoais apenas para fornecer nossos serviços de maneira eficiente.</p>
                            </div>
                            <div className="col-lg-4 col-12 mt-2 mt-lg-0">
                                <ul className="social-icon">
                                    <li className="social-icon-item">
                                        <a href="#" className="social-icon-link bi-instagram"></a>
                                    </li>
                                    <li className="social-icon-item">
                                        <a href="#" className="social-icon-link bi bi-envelope"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
