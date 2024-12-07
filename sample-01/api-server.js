const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { auth } = require("express-oauth2-jwt-bearer");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;

// Configuration Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erreur : SUPABASE_URL ou SUPABASE_ANON_KEY manquant dans .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Vérification de la configuration OAuth2
const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
  appOrigin: process.env.APP_ORIGIN || `http://localhost:${appPort}`,
};

if (!authConfig.domain || !authConfig.audience) {
  console.error("Erreur : AUTH0_DOMAIN ou AUTH0_AUDIENCE manquant dans les variables d'environnement");
  process.exit(1);
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: authConfig.appOrigin }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// JWT Middleware
const checkJwt = auth({
  audience: authConfig.audience,
  issuerBaseURL: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

// Configurer les notifications push
webpush.setVapidDetails(
  "mailto:chaimabprocontact@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Routes

// Route de test
app.get("/api/external", checkJwt, (req, res) => {
  res.send({ msg: "Votre token a été validé avec succès !" });
});

// Route pour ajouter un utilisateur
app.post("/api/users", checkJwt, async (req, res) => {
  const { firstname, lastname, age, poids, taille, rhesus, allergies } = req.body;

  if (!firstname || !lastname || !age || !poids || !taille) {
    return res.status(400).json({ error: "Certains champs obligatoires sont manquants." });
  }

  try {
    const userId = req.auth.payload.sub; // Récupérer l'ID utilisateur d'Auth0
    const { data, error } = await supabase
      .from("users")
      .insert([{ user_id: userId, firstname, lastname, age, poids, taille, rhesus, allergies }])
      .select();
    if (error) throw error;
    res.status(201).json({ message: "Utilisateur ajouté avec succès", data });
  } catch (err) {
    console.error("Erreur Supabase:", err);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur." });
  }
});

// Route pour récupérer les informations d'un utilisateur
app.get("/api/users/:user_id", checkJwt, async (req, res) => {
  const { user_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (error || !data) {
      console.error("Erreur Supabase:", error);
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Erreur lors de la récupération des données utilisateur:", err);
    res.status(500).json({ error: "Erreur lors de la récupération des données utilisateur." });
  }
});

// Route pour ajouter une prescription
app.post("/api/prescriptions", checkJwt, async (req, res) => {
  const {
    user_id,
    medication_name,
    dosage_quantity,
    dosage_frequency,
    dosage_duration,
    start_date,
    end_date,
    notes,
  } = req.body;

  if (!user_id || !medication_name || !start_date || !end_date) {
    return res.status(400).json({ error: "Certains champs obligatoires sont manquants." });
  }

  try {
    const { data, error } = await supabase
      .from("prescriptions")
      .insert([{ user_id, medication_name, dosage_quantity, dosage_frequency, dosage_duration, start_date, end_date, notes }])
      .select();
    if (error) throw error;
    res.status(201).json({ message: "Prescription ajoutée avec succès", data });
  } catch (err) {
    console.error("Erreur Supabase:", err);
    res.status(500).json({ error: "Erreur lors de l'ajout de la prescription." });
  }
});

// Gestion des erreurs non gérées
app.use((err, req, res, next) => {
  console.error("Erreur non gérée :", err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

// Lancement du serveur
app.listen(port, () =>
  console.log(`API Server listening on port ${port}`)
);
