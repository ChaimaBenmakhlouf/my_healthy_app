import React, { useState } from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faTrash, faFilePdf, faPowerOff } from '@fortawesome/free-solid-svg-icons';


import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import { toast } from 'react-toastify';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
    });    

  const [hasData, setHasData] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-user-info?email='+user.email);
      const data = await response.json();
      setHasData(data != null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasData(false); // Handle error case
    }
  };

  // Nouvelle méthode pour supprimer les données utilisateur
  const deleteUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/delete-user-data?email=${user.email}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Déconnexion après suppression des données
        logoutWithRedirect();
        alert('Vos données ont été supprimées avec succès.');
      } else {
        alert('Erreur lors de la suppression des données.');
      }
    } catch (error) {
      console.error("Erreur lors de la suppression des données:", error);
      alert('Une erreur est survenue.');
    }
  };
  
  // Trigger user save on authentication
  if (isAuthenticated) {
    console.log(user.email)
    fetchData();
  }

  return (
    <div className="nav-container">
      <Navbar color="light" light expand="md" style={{
          backgroundColor: "#f8f9fa", // Légère couleur de fond pour la navbar
          padding: "10px 20px",
          alignItems: "center",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Ajout d'une légère ombre
        }} container={false}>
        <Container>
          <NavbarBrand style={{
            fontFamily: "Sixtyfour Convergence, sans-serif",
            fontSize: "1.7rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            marginRight: "auto", // Aligne le logo à gauche
            color: "#3E4677", // Couleur de texte principale pour le logo
          }} className="logo"  MyHealthy/>
          <NavbarToggler onClick={toggle} style={{ border: "none" }}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto d-flex align-items-center" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                  style={{
                    color: "#3E4677", // Couleur des liens de navigation
                    fontWeight: "500",
                    margin: "0 15px",
                    textDecoration: "none",
                  }}
                >
                   <FontAwesomeIcon icon={faHome} className="me-2" /> {/* Icône maison */}
                   Accueil
                </NavLink>
              </NavItem>
              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/prescriptions"
                    exact
                    activeClassName="router-link-exact-active"
                    style={{
                      color: "#3E4677", // Couleur des liens de navigation
                      fontWeight: "500",
                      margin: "0 15px",
                      textDecoration: "none",
                    }}
                  >
                    Prescriptions
                  </NavLink>
                </NavItem>
              )}

              
              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/forms"
                    exact
                    activeClassName="router-link-exact-active"
                    style={{
                      color: "#3E4677", // Couleur des liens de navigation
                      fontWeight: "500",
                      margin: "0 15px",
                      textDecoration: "none",
                    }}
                  >
                    {hasData && ("Dashboard")}
                    {!hasData && ("Formulaires")}
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    style={{
                      background: "linear-gradient(145deg, #654ea3, #eaafc8)", // Dégradé entre les couleurs demandées
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px", // Un peu plus d'espace pour rendre le bouton plus visible
                      fontSize: "14px",
                      borderRadius: "5px",
                      boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.1), -4px -4px 6px rgba(255, 255, 255, 0.3)", // Ombre pour un effet glossy
                      transition: "all 0.3s ease-in-out", // Transition douce pour les effets au survol
                    }}
                    onClick={() => loginWithRedirect()}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.05)"; // Légère augmentation de la taille au survol
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)"; // Restauration de la taille normale
                    }}
                  >
                    Se connecter
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="nav-user-profile rounded-circle"
                    width="40"
                    style={{ border: "2px solid #3E4677", marginLeft: "15px" }} // Bordure autour de l'image du profil
                  />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsDeleteDataBtn"
                    
                      style={{ color: "#e53935" }}
                      onClick={() => {
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.')) {
                          deleteUserData();
                        }
                      }}
                    >
                      <FontAwesomeIcon icon="trash" className="mr-3" /> Supprimer mes données
                    </DropdownItem>
                    <DropdownItem
                    onClick={() => alert("Export PDF triggered!")}
                    style={{ color: "#66bb6a" }} // Couleur verte pour l'export
                  >
                    <FontAwesomeIcon icon={faFilePdf} className="me-2" />
                    Exporter mes données
                  </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {/* {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )} */}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;