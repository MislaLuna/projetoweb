import React, { useRef, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../img/image.png';
import '../../css/home2.css';


function Home2() {
  const location = useLocation();
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      colorClass: 'green',
      icon: 'bi bi-list-task',
      title: 'Gerencie Tarefas',
      text: 'Acompanhe, organize e atribua tarefas de forma prática para sua equipe.'
    },
    {
      colorClass: 'blue',
      icon: 'bi bi-people-fill',
      title: 'Equipe',
      text: 'Visualize todos os membros, funções e colabore com mais eficiência.'
    },
    {
      colorClass: 'yellow',
      icon: 'bi bi-speedometer2',
      title: 'Dashboards',
      text: 'Obtenha relatórios e métricas detalhadas do desempenho da equipe.'
    },
    {
      colorClass: 'purple',
      icon: 'bi bi-graph-up',
      title: 'Relatórios',
      text: 'Gere insights e análises de produtividade de forma rápida e visual.'
    }
  ];

  // Rotação automática
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Scroll para slide específico
  const scrollToSlide = (index) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const slideWidth = carousel.firstChild.offsetWidth;
      carousel.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth',
      });
      setCurrentSlide(index);
    }
  };

  // Rotação automática (mantendo para o autoplay)
  const handleNext = () => {
    const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    scrollToSlide(newIndex);
  };

  // Atualiza slide ativo ao arrastar
  const handleScroll = () => {
    const carousel = carouselRef.current;
    const slideWidth = carousel.firstChild.offsetWidth;
    const index = Math.round(carousel.scrollLeft / slideWidth);
    setCurrentSlide(index);
  };

  return (
    <div className="home2Container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <Link to="/home2">
            <img src={logo} alt="Logo TaskNavigation" />
          </Link>
        </div>
        <ul className="menu">
          {[
            { path: '/home2', icon: 'bi bi-house-door-fill', label: 'Início' },
            { path: '/equipe', icon: 'bi bi-people', label: 'Equipe' },
            { path: '/gestaotarefas', icon: 'bi bi-list-task', label: 'Tarefas' },
            { path: '/gestaodepartamento', icon: 'bi bi-building', label: 'Departamentos' },
            { path: '/gestaousuario', icon: 'bi bi-people-fill', label: 'Usuários' },
            { path: '/dashboard', icon: 'bi bi-speedometer2', label: 'Dashboard' },
            { path: '/relatorios', icon: 'bi bi-graph-up', label: 'Relatórios' },
            { path: '/configuracao', icon: 'bi bi-gear-fill', label: 'Configurações' }
          ].map((item, idx) => (
            <li key={idx}>
              <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                <i className={item.icon}></i> <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
     <main className="main">
  <div className="hero-features-wrapper">
    <div className="hero">
  <h1>Simplifique sua rotina, conecte sua equipe e alcance resultados de forma mais eficiente.</h1>
  <p>
    Com o TaskNavigation, você organiza tarefas, acompanha projetos e toma decisões estratégicas com clareza e agilidade
    <span className="hero-badge">— tudo em um só lugar.</span>
  </p>
</div>

    {/* Carrossel */}
    <div className="carousel-wrapper">
      <div
        className="carousel-scroll"
        ref={carouselRef}
        onScroll={handleScroll}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`feature ${slide.colorClass} ${idx === currentSlide ? 'active' : ''}`}
          >
            <i className={slide.icon}></i>
            <h3>{slide.title}</h3>
            <p>{slide.text}</p>
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className="indicators">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => scrollToSlide(idx)}
          ></span>
        ))}
      </div>
    </div>
  </div>

  {/* Footer */}
  <footer className="footer-container">
  <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
  <p>Este painel fornece visão rápida das funcionalidades principais do sistema.</p>

  <div className="privacy-policy">
    <h4 className="policy-title">Política de Privacidade</h4>
    <div className="policy-text">
      <p>Protegemos seus dados com criptografia e boas práticas de segurança.</p>
      <p>Coletamos apenas as informações necessárias para o funcionamento da plataforma.</p>
    </div>
  </div>
</footer>
</main>

    </div>
  );
}

export default Home2;
   