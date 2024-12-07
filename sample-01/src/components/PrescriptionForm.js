import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const PrescriptionForm = ({ initialData, onSubmit }) => {
  const { getAccessTokenSilently } = useAuth0();

  const [formData, setFormData] = useState({
    medication_name: "",
    dosage_quantity: "",
    dosage_frequency: "",
    dosage_duration: "",
    start_date: "",
    end_date: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        medication_name: initialData.medication_name,
        dosage_quantity: initialData.dosage_quantity,
        dosage_frequency: initialData.dosage_frequency,
        dosage_duration: initialData.dosage_duration,
        start_date: initialData.start_date.slice(0, 10),
        end_date: initialData.end_date ? initialData.end_date.slice(0, 10) : "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch("http://localhost:3001/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Prescription ajoutée avec succès !");
        onSubmit(); // Appel callback pour actualiser les données
      } else {
        const error = await response.json();
        alert(`Erreur : ${error.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une prescription</h2>
      <div>
        <label>Nom du médicament :</label>
        <input
          type="text"
          name="medication_name"
          value={formData.medication_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Quantité :</label>
        <input
          type="number"
          name="dosage_quantity"
          value={formData.dosage_quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fréquence :</label>
        <input
          type="text"
          name="dosage_frequency"
          value={formData.dosage_frequency}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Durée :</label>
        <input
          type="text"
          name="dosage_duration"
          value={formData.dosage_duration}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date de début :</label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date de fin :</label>
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Notes :</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default PrescriptionForm;
