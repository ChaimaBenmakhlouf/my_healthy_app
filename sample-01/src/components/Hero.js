import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";  // Import du hook useAuth0

const Hero = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0(); // Hook Auth0 pour vérifier la connexion
  const navigate = useNavigate();

  const handleAddPrescriptionClick = () => {
    if (isAuthenticated) {
      navigate("/prescription/new"); // Rediriger vers le formulaire si l'utilisateur est connecté
    } else {
      loginWithRedirect(); // Rediriger vers la page de login si l'utilisateur n'est pas connecté
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Bienvenue sur My HEALTHY App</h1>
        <p className="hero-description">
          La plateforme futuriste pour le suivie de votre santé
        </p>
        <div className="hero-action">
          <button 
            className="btn-cta" 
            onClick={handleAddPrescriptionClick} // Appel de la fonction de gestion du clic
          >
            Ajouter une Prescription  <FontAwesomeIcon icon={faRocket} />
          </button>
          <button 
            className="btn-notifications" 
            onClick={() => alert("Abonnement à la notification en cours...")}
          >
            Souscrire aux notifications <FontAwesomeIcon icon={faEnvelope} />
          </button>
        </div>
      </div>
      <div className="hero-background"></div>

      <style jsx>{`
        .hero-section {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .hero-content {
          text-align: left;
          max-width: 600px;
          padding: 40px;
          z-index: 1;
          margin-right: 20px;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: bold;
          letter-spacing: 2px;
          margin-top: 20px;
          color: #654ea3; /* Couleur principale pour le titre */
          text-shadow: 0 4px 15px rgba(66, 165, 245, 0.7);
        }

        .hero-description {
          font-size: 1.2rem;
          margin-top: 20px;
          color: #eaafc8; /* Couleur secondaire pour la description */
          text-shadow: 0 2px 10px rgba(0, 255, 198, 0.7);
        }

        .hero-action {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: flex-start;
        }

        .btn-cta,
        .btn-notifications {
          padding: 12px 30px;
          background: linear-gradient(90deg, #eaafc8, #654ea3); /* Dégradé avec les couleurs */
          border: none;
          border-radius: 30px;
          color: white;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .btn-cta:hover,
        .btn-notifications:hover {
          transform: scale(1.1);
          background: linear-gradient(90deg, #654ea3, #eaafc8); /* Inverser le dégradé au survol */
        }

        .hero-background {
          flex: 1;
          background: url('./assets/3Dbackground.png') center center no-repeat;
          background-size: cover;
          height: 100%;
          filter: blur(10px);
          z-index: -1;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Hero;
