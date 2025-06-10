import React, { useEffect, useState } from 'react';
import '../../css/bootstrap.min.css';
import '../../css/bootstrap-icons.css';
import '../../css/owl.carousel.min.css';
import '../../css/owl.theme.default.min.css';
import '../../css/tooplate-gotto-job.css';



const categories = [
    { title: 'Home', icon: 'house', link: '/login' },
    { title: 'Dashboard', icon: 'speedometer', link: '/login' },
    { title: 'Gestão de Usuário', icon: 'person', link: '/login' },
    { title: 'Gestão de Tarefas', icon: 'check2-square', link: '/login' },
    { title: 'Relatórios', icon: 'file-earmark-bar-graph', link: '/login' },
];

const Navbar = () => (
    <nav className="navbar navbar-expand-lg">
        <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="/">
                <img src={logo} alt="logo" className="img-fluid logo-image" />
                <div className="d-flex flex-column ms-2">
                    <strong className="logo-text">TaskNavigation</strong>
                    <small className="logo-slogan"><b>Gerenciador de Tarefas</b></small>
                </div>
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/contanova">Cadastrar</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link custom-btn btn" href="/login">Login</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

const CategoriesSection = () => (
    <section className="categories-section section-padding" id="categories-section">
        <div className="container text-center">
            <h2 className="mb-5">
                Procurar por <span>Variedades</span>
            </h2>
            <div className="row justify-content-center">
                {categories.map(({ title, icon, link }, i) => (
                    <div className="col-lg-2 col-md-4 col-6" key={i}>
                        <div className="categories-block">
                            <a href={link} className="d-flex flex-column justify-content-center align-items-center h-100">
                                <i className={`categories-icon bi-${icon}`}></i>
                                <small className="categories-block-title">{title}</small>
                                <div className="categories-block-number d-flex justify-content-center align-items-center">
                                    <span className="categories-block-number-text">{i + 1}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const AboutSection = () => (
    <section className="about-section">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-3 col-12">
                    <div className="about-image-wrap custom-border-radius-start">
                        <img src={aboutImage} alt="time management" className="img-fluid custom-border-radius-start about-image" />
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="custom-text-block">
                        <h2 className="text-white mb-2">Introdução TaskNavigation</h2>
                        <p className="text-white">
                            Este site foi desenvolvido para administradores de empresas que desejam gerenciar funcionários e usuários de forma eficiente. Com ele, você terá acesso a diversas ferramentas essenciais, incluindo:
                        </p>
                        <ul className="text-white">
                            <li>✔ Dashboard com métricas detalhadas</li>
                            <li>✔ Gestão de usuários e permissões</li>
                            <li>✔ Gerenciamento de departamentos e equipes</li>
                            <li>✔ Monitoramento de tarefas e projetos</li>
                        </ul>
                        <p className="text-white">
                            Faça seu login agora e descubra todas as funcionalidades que vão otimizar a administração da sua empresa! 🚀
                        </p>
                    </div>
                </div>
                <div className="col-lg-3 col-12">
                    <div className="instagram-block">
                        <img src={socialImage} alt="grupo" className="img-fluid custom-border-radius-end about-image" />
                        <div className="instagram-block-text mt-2">
                            <a href="https://instagram.com/" className="custom-btn btn">
                                <i className="bi-instagram me-1"></i>
                                @TaskNavigation
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const CtaSection = () => (
    <section className="cta-section">
        <div className="section-overlay"></div>
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-10">
                    <h2 className="text-white mb-2">
                        A eficácia na gestão de tarefas é essencial para o sucesso das empresas.
                    </h2>
                    <p className="text-white">
                        O sistema de um gerenciador de tarefas online se integra ao processo de negócios, automatizando e otimizando diversas etapas.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="site-footer" style={{ minHeight: '200px' }}>
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-12 mb-3">
                    <div className="d-flex align-items-center mb-4">
                        <img src={footerLogo} alt="logo" className="img-fluid logo-image" />
                    </div>
                    <div className="footer-icons">
                        <p className="mb-2">
                            <i className="bi-globe me-1"></i>
                            <a href="#" className="site-footer-link">www.tasknavigation.com</a>
                        </p>
                        <p>
                            <i className="bi-envelope me-1"></i>
                            <a href="mailto:info@tasknavigation.com" className="site-footer-link">info@tasknavigation.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="site-footer-bottom py-5">
            <div className="container">
                <div className="row text-center text-lg-start">
                    <div className="col-lg-4 col-12 mb-3 mb-lg-0">
                        <p className="footer-text"><strong>Copyright © Task Navigation xxx</strong></p>
                        <p className="footer-text">O TaskNavigation é um sistema de gestão de tarefas desenvolvido para otimizar a organização e eficiência administrativa.</p>
                    </div>
                    <div className="col-lg-4 col-12 mb-3 mb-lg-0">
                        <p className="footer-text"><strong>Política de Privacidade</strong></p>
                        <p className="footer-text">Coletamos e armazenamos dados pessoais apenas para fornecer nossos serviços de maneira eficiente.</p>
                    </div>
                    <div className="col-lg-4 col-12 d-flex justify-content-center justify-content-lg-end align-items-center">
                        <ul className="social-icon list-unstyled d-flex gap-3 mb-0">
                            <li><a href="#" className="bi-instagram social-icon-link"></a></li>
                            <li><a href="#" className="bi-envelope social-icon-link"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

const Home2 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bodyInicio">
            <Navbar />
            <main>
                <section className="hero-section d-flex justify-content-center align-items-center position-relative">
                    <div className="section-overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-12 mb-5 mb-lg-0">
                                <div className="hero-section-text mt-5">
                                    <h6 className="text-white">Você está procurando um bom Gerenciador para sua Empresa?</h6>
                                    <h1 className="hero-title text-white mt-4 mb-4">
                                        TaskNavigation<br />
                                        a melhor plataforma de gerenciamento de tarefas
                                    </h1>
                                    <a href="#categories-section" className="custom-btn custom-border-btn btn">Variedades</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <CategoriesSection />

                <AboutSection />

                <CtaSection />
            </main>
            <Footer />
        </div>
    );
};

export default Home2;
