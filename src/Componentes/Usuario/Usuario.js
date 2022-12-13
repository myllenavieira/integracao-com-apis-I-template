import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios"

const User = styled.div`
  border: black 1px solid;
  margin-top: 10px;
  width: 350px;
`
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  const getUsersById = (id) => {
    /* const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`
    const config = { headers: { Authorization: "myllena-vieira-barbosa" } } */

    axios
      .get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`, { headers: { Authorization: "myllena-vieira-barbosa" } })
      .then((res) => setUsuario(res.data))
      .catch((err) => { console.log(err) })
  }

  useEffect(() => {
    getUsersById(props.usuario.id)
  }, [])

  const editUser = (id) => {

    const body = {
      "name": nome,
      "email": email
    }
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`
    const config = { headers: { Authorization: "myllena-vieira-barbosa" } }

    axios.put(url, body, config)
      .then((res) => {
        alert("Usuário editado com sucesso")
        setEditar(!editar)
      }).catch((err) => {
        console.log(err)
      })
  }

  const deleteUsers = (id) => {

    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id} `
    const config = { headers: { Authorization: "myllena-vieira-barbosa" } }

    axios
      .delete(url, config)
      .then((res) => {
        alert("usuario Deletado com sucesso")
      })
      .catch((err) => {
        alert(err.response.data.message)

      })
  }

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => { editUser(props.usuario.id) }}>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={() => { deleteUsers(props.usuario.id) }}>Excluir</button>
    </User>
  );
}

export default Usuario;
