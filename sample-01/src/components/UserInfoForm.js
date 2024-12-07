import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserInfoForm = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState(null); // Données utilisateur
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(
          `http://localhost:3001/api/users/${encodeURIComponent(user.sub)}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.sub, getAccessTokenSilently]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      age: parseInt(formData.get("age"), 10),
      poids: parseFloat(formData.get("poids")),
      taille: parseFloat(formData.get("taille")),
      rhesus: formData.get("rhesus"),
      allergies: formData.get("allergies"),
    };

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error submitting user data:", error);
      setError(error.message);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return userData ? (
    <div>
      <h2>Mon Profil</h2>
      <p><strong>Nom : </strong>{userData.firstname} {userData.lastname}</p>
      <p><strong>Âge : </strong>{userData.age} ans</p>
      <p><strong>Poids : </strong>{userData.poids} kg</p>
      <p><strong>Taille : </strong>{userData.taille} cm</p>
      <p><strong>Rhesus : </strong>{userData.rhesus}</p>
      <p><strong>Allergies : </strong>{userData.allergies || "Aucune"}</p>
    </div>
  ) : (
    <form onSubmit={handleFormSubmit}>
      <h2>Formulaire d'inscription</h2>
      <input type="text" name="firstname" placeholder="Prénom" required />
      <input type="text" name="lastname" placeholder="Nom" required />
      <input type="number" name="age" placeholder="Âge" required />
      <input type="number" name="poids" placeholder="Poids (kg)" required />
      <input type="number" name="taille" placeholder="Taille (cm)" required />
      <select name="rhesus" required>
        <option value="">Sélectionnez le Rhesus</option>
        <option value="positive">Positif</option>
        <option value="negative">Négatif</option>
      </select>
      <input type="text" name="allergies" placeholder="Allergies (séparées par des virgules)" />
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default UserInfoForm;
