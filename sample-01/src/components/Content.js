import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical, faCalendarAlt, faFileMedical, faUser, faHeartbeat, faComments } from "@fortawesome/free-solid-svg-icons";

const contentData = [
  {
    title: "Consulter vos analyses",
    link: "/analyses",
    icon: faFileMedical,
    description: "Accédez à vos derniers résultats d'analyses médicales en toute sécurité.",
  },
  {
    title: "Planifier un rendez-vous",
    link: "/appointments",
    icon: faCalendarAlt,
    description: "Prenez rendez-vous avec votre médecin directement depuis l'application.",
  },
  {
    title: "Mettre à jour votre profil",
    link: "/profile",
    icon: faUser,
    description: "Mettez à jour vos informations personnelles et gérez vos préférences.",
  },
  {
    title: "Suivre vos prescriptions",
    link: "/prescriptions",
    icon: faNotesMedical,
    description: "Gardez une trace de vos prescriptions et consultez vos ordonnances.",
  },
];

class Content extends Component {
  render() {
    return (
      <div>
        <div className="next-steps my-5" style={{ padding: "40px" }}>
          <h2
            className="my-5 text-center"
            style={{
              color: "#eaafc8",
              textShadow: "0px 4px 10px rgba(234,175,200,0.7)",
            }}
          >
            Vos prochaines actions
          </h2>
          <Row className="d-flex justify-content-between">
            {contentData.map((col, i) => (
              <Col key={i} md={5} className="mb-4">
                <div
                  style={{
                    background: "rgba(0, 0, 50, 0.8)",
                    borderRadius: "15px",
                    padding: "20px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    color: "white",
                  }}
                >
                  <h6 className="mb-3">
                    <a
                      href={col.link}
                      className="text-decoration-none"
                      style={{
                        color: "#654ea3",
                        textShadow: "0px 3px 5px rgba(101,78,163,0.7)",
                      }}
                    >
                      <FontAwesomeIcon icon={col.icon} className="mr-2" />
                      {col.title}
                    </a>
                  </h6>
                  <p className="text-muted">{col.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Hero Features Section */}
        <div className="hero-middle" style={{ padding: "60px 20px", background: "#f9f9f9" }}>
          <h1 className="hero-title" style={{ color: "#654ea3", textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}>
            Votre partenaire santé au quotidien
          </h1>
          <div className="hero-features" style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "30px" }}>
            <div className="feature" style={{ textAlign: "center", maxWidth: "250px" }}>
              <FontAwesomeIcon icon={faCalendarAlt} className="feature-icon" style={{ fontSize: "2rem", color: "#654ea3", marginBottom: "10px" }} />
              <h3 style={{ color: "#654ea3", marginBottom: "10px" }}>Accédez aux soins plus facilement</h3>
              <p style={{ fontSize: "1rem", color: "#666" }}>Réservez des consultations vidéo ou en présentiel, et recevez des rappels pour ne jamais les manquer.</p>
            </div>
            <div className="feature" style={{ textAlign: "center", maxWidth: "250px" }}>
              <FontAwesomeIcon icon={faComments} className="feature-icon" style={{ fontSize: "2rem", color: "#654ea3", marginBottom: "10px" }} />
              <h3 style={{ color: "#654ea3", marginBottom: "10px" }}>Bénéficiez de soins personnalisés</h3>
              <p style={{ fontSize: "1rem", color: "#666" }}>Échangez avec vos soignants par message, obtenez des conseils préventifs et recevez des soins quand vous en avez besoin.</p>
            </div>
            <div className="feature" style={{ textAlign: "center", maxWidth: "250px" }}>
              <FontAwesomeIcon icon={faHeartbeat} className="feature-icon" style={{ fontSize: "2rem", color: "#654ea3", marginBottom: "10px" }} />
              <h3 style={{ color: "#654ea3", marginBottom: "10px" }}>Gérez votre santé</h3>
              <p style={{ fontSize: "1rem", color: "#666" }}>Rassemblez facilement toutes vos informations de santé et celles de vos proches.</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div
          className="newsletter-section text-center"
          style={{
            background: "linear-gradient(90deg, #654ea3, #eaafc8)",
            padding: "60px 20px",
            color: "white",
            marginTop: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#eaafc8",
              textShadow: "0px 4px 10px rgba(234,175,200,0.7)",
              marginBottom: "20px",
            }}
          >
            Abonnez-vous à notre newsletter
          </h2>
          <p
            style={{
              fontSize: "1rem",
              margin: "0 auto",
              maxWidth: "600px",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: "1.6",
            }}
          >
            Restez informé des dernières actualités et fonctionnalités ! Recevez
            nos notifications et conseils directement dans votre boîte mail.
          </p>
          <div style={{ marginTop: "30px" }}>
            <button
              className="btn-newsletter"
              style={{
                padding: "12px 30px",
                background: "#eaafc8",
                border: "none",
                borderRadius: "30px",
                color: "#1e1e2f",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => alert("Inscription à la newsletter !")}
            >
              S'abonner
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
