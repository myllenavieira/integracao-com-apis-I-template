import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";

const usuariosLocal = [
  {
    id: 1,
    name: "Muri"
  },
  {
    id: 2,
    name: "Paulinha"
  },
  {
    id: 3,
    name: "Marcelo"
  },
  {
    id: 4,
    name: "Rodrigo"
  },
]

function App() {
  const [usuarios, setUsuarios] = useState(usuariosLocal)

  const getAllUsers = () => {
    const url = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";
    const config = { headers: { Authorization: "myllena-vieira-barbosa" } }

    axios
      .get(url, config)
      .then((response) => { setUsuarios(response.data) })
      .catch((error) => { console.log(error) })
  }
  useEffect(() => { getAllUsers() }, [usuarios])


  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario />
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} usuario={usuario} />
      })}
    </>
  )
}

export default App;
