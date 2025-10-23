import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import '../../css/configuracao.css';
import logo from '../img/image.png';

function ConfiguracoesIOS() {
  const location = useLocation();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [configuracao, setConfiguracao] = useState({ fotoPerfil: null, posicaoFoto: 1 });
  const [previewFoto, setPreviewFoto] = useState(null);

  // Cropper states
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const [mostrarPosicao, setMostrarPosicao] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  useEffect(() => {
    const usuarioLocal = JSON.parse(localStorage.getItem('usuario'));
    if (!usuarioLocal) {
      navigate('/login');
      return;
    }
    setUsuario(usuarioLocal);

    const fetchConfiguracao = async () => {
      try {
        const token = localStorage.getItem('token');
        const resConfig = await axios.get(`http://localhost:8080/configuracao/${usuarioLocal.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setConfiguracao(resConfig.data);
        setPreviewFoto(resConfig.data.fotoPerfil);
      } catch (err) {
        console.error(err);
        setConfiguracao({ fotoPerfil: null, posicaoFoto: 1 });
        setPreviewFoto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchConfiguracao();
  }, [navigate]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImageSrc(reader.result);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = useCallback((imageSrc, pixelCrop) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve, reject) => {
      image.onload = () => {
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        resolve(canvas.toDataURL('image/jpeg'));
      };
      image.onerror = (err) => reject(err);
    });
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImg);
      setPreviewFoto(croppedImg);
      setImageSrc(null); // fecha cropper
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, getCroppedImg]);

  const handlePosicaoChange = (e, value) => {
    setConfiguracao({ ...configuracao, posicaoFoto: value });
    setMostrarPosicao(true); // Mostra o botão OK
  };

  const confirmarPosicao = () => {
    setMostrarPosicao(false); // Fecha o botão OK
  };

const handleSalvar = async () => {
  if (!usuario) return;

  const dataToSend = {
    fotoPerfil: croppedImage, // base64
    posicaoFoto: configuracao.posicaoFoto,
    usuario: { id: usuario.id }
  };

  try {
    const token = localStorage.getItem('token');
    const res = await axios.put(`http://localhost:8080/configuracao/${usuario.id}`, dataToSend, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    setConfiguracao(res.data);
    setPreviewFoto(res.data.fotoPerfil);
    setCroppedImage(null);
    alert('Configuração salva com sucesso!');
  } catch (err) {
    console.error('Erro ao salvar configuração:', err);
    alert('Erro ao atualizar configuração.');
  }
};


  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p className="erro">{erro}</p>;

  return (
    <div className="configuration-page">
      <aside className="sidebar">
        <div className="logo"><Link to="/home2"><img src={logo} alt="Logo TaskNavigation" /></Link></div>
        <ul className="menu">
          <li><Link to="/home2" className={isActive('/home2')}><i className="bi bi-house-door-fill"></i><span>Início</span></Link></li>
          <li><Link to="/equipe" className={isActive('/equipe')}><i className="bi bi-people"></i><span>Equipe</span></Link></li>
          <li><Link to="/gestaotarefas" className={isActive('/gestaotarefas')}><i className="bi bi-list-task"></i><span>Tarefas</span></Link></li>
          <li><Link to="/gestaoprojeto" className={isActive('/gestaoprojeto')}><i className="bi bi-folder2-open"></i><span>Projetos</span></Link></li>
          <li><Link to="/gestaodepartamento" className={isActive('/gestaodepartamento')}><i className="bi bi-building"></i><span>Departamentos</span></Link></li>
          <li><Link to="/gestaousuario" className={isActive('/gestaousuario')}><i className="bi bi-person-badge-fill"></i><span>Usuários</span></Link></li>
          <li><Link to="/dashboard" className={isActive('/dashboard')}><i className="bi bi-speedometer2"></i><span>Dashboard</span></Link></li>
          <li><Link to="/relatorios" className={isActive('/relatorios')}><i className="bi bi-bar-chart-fill"></i><span>Relatórios</span></Link></li>
          <li><Link to="/configuracao" className={isActive('/configuracao')}><i className="bi bi-gear-fill"></i><span>Configurações</span></Link></li>
        </ul>
      </aside>

      <main className="main">
        <div className="hero">
          <h1>Configurações</h1>
          <p>Gerencie seu perfil e ajustes do sistema</p>
        </div>

        <div className="config-container">
          <div className="setting-card-ios vertical">
            {imageSrc ? (
  <div className="crop-container">
    <Cropper
      image={imageSrc}
      crop={crop}
      zoom={zoom}
      aspect={1}
      onCropChange={setCrop}
      onZoomChange={setZoom}
      onCropComplete={onCropComplete}
    />

    <Slider
      value={zoom}
      min={1}
      max={3}
      step={0.1}
      onChange={(e, value) => setZoom(value)}
    />

    {/* Botão OK para finalizar posição/crop */}
    {!croppedImage && (
      <button className="btn-ios-ok" onClick={showCroppedImage}>
        OK
      </button>
    )}
    
    {/* Mostra só depois do OK */}
    {croppedImage && (
      <div className="foto-finalizada">
        <img src={croppedImage} alt="Foto final" className="foto-preview" />
      </div>
    )}
  </div>
) : (
  <>
    <div className={`user-icon-ios foto-${configuracao.posicaoFoto}`}>
      <img src={previewFoto || '/default-avatar.png'} alt="Usuário" className="foto-preview" />
    </div>
    <input type="file" onChange={handleFotoChange} accept="image/*" />
  </>
)}

            <div className="profile-info-ios">
              <div><strong>{usuario.nome}</strong></div>
              <div>{usuario.email}</div>
            </div>
          </div>

          <div className="setting-card-ios vertical">
            <div className="text-ios"><strong>Conta</strong></div>
            <div className="subtext-ios">Gerencie sua conta e preferências</div>
            <button className="btn-ios-logout" onClick={handleLogout}>Sair</button>
          </div>

          <div className="actions-ios">
            <button className="btn-ios-save" onClick={handleSalvar}>Salvar Alterações</button>
          </div>
        </div>

        <div className="footer-container">
          <p>&copy; 2024 TaskNavigation. Todos os direitos reservados.</p>
        </div>
      </main>
    </div>
  );
}

export default ConfiguracoesIOS;
