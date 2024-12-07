import React from "react";
import { Link } from "react-router-dom";

const PrescriptionCard = ({ prescription, onDelete }) => {
  return (
    <div style={styles.container}>
      <div className="prescription-card" style={styles.cardContainer}>
        <h3>{prescription.medication_name}</h3>
        <p><strong>Quantité à prendre :</strong> {prescription.dosage_quantity}</p>
        <p><strong>Fréquence :</strong> {prescription.dosage_frequency}</p>
        <p><strong>Durée du traitement :</strong> {prescription.dosage_duration}</p>
        <p><strong>Date de début :</strong> {formatDate(prescription.start_date)}</p>
        <p><strong>Date de fin :</strong> {prescription.end_date ? formatDate(prescription.end_date) : "Non spécifiée"}</p>
        <p><strong>Notes :</strong> {prescription.notes || "Aucune note"}</p>
        <div style={styles.actionButtons}>
          <Link to={`/prescription/edit/${prescription.id}`}>
            <button 
              style={styles.editButton} 
              aria-label={`Modifier la prescription ${prescription.medication_name}`}
            >
              Modifier
            </button>
          </Link>
          <button 
            onClick={() => onDelete(prescription.id)} 
            style={styles.deleteButton} 
            aria-label={`Supprimer la prescription ${prescription.medication_name}`}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

// Fonction pour formater la date de manière plus lisible
const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString("fr-FR") : "Non spécifiée";
};

const styles = {
  container: {
    background: "linear-gradient(90deg, #654ea3, #eaafc8)", // Fond général dégradé
    minHeight: "100vh", // Couverture totale de la fenêtre
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  cardContainer: {
    border: "1px solid #ccc",
    padding: "20px",
    marginBottom: "10px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.3s ease-in-out",
  },
  actionButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  editButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  deleteButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default PrescriptionCard;
