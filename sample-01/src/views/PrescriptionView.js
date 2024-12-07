import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PrescriptionForm from "../components/PrescriptionForm";

const PrescriptionView = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrescriptions = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch("http://localhost:3001/api/prescriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      } else {
        console.error("Erreur de récupération :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur API :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Mes Prescriptions</h1>
      {prescriptions.length === 0 ? (
        <p>Pas de prescription trouvée.</p>
      ) : (
        <ul>
          {prescriptions.map((prescription) => (
            <li key={prescription.id}>
              <h3>{prescription.medication_name}</h3>
              <p><strong>Quantité :</strong> {prescription.dosage_quantity}</p>
              <p><strong>Fréquence :</strong> {prescription.dosage_frequency}</p>
              <p><strong>Durée :</strong> {prescription.dosage_duration}</p>
              <p><strong>Date de début :</strong> {prescription.start_date}</p>
              <p><strong>Date de fin :</strong> {prescription.end_date || "Non spécifiée"}</p>
              <p><strong>Notes :</strong> {prescription.notes || "Aucune note"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrescriptionView;
