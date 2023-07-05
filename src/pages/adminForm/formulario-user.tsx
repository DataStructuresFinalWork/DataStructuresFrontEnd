import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import { IUsers } from "../../interfaces/IUsers";

const FormularioUser = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http.get<IUsers>(`users/${parametros.id}`).then((resposta) => {
        setNomeUSer(resposta.data.nome);
      });
    }
  }, [parametros]);

  const [nomeUser, setNomeUSer] = useState("");
  const [idadeUser, setIdadeUser] = useState("");

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http.put(`/${parametros.id}`, {
        nome: nomeUser,
        idade: parseInt(idadeUser, 10)
      })
      .then(()=> {
        alert("Usuário atualizado com sucesso!");
      });
    } else {
      http
        .post('/', {
          nome: nomeUser,
          idade: parseInt(idadeUser, 10)
        })
        .then(() => {
          alert("Usuário cadastrado com sucesso!");
        });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1, paddingTop: 10 }}>
      <Typography component="h1" variant="h6">
        Formulário de Cadastro de Usuarios
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeUser}
          onChange={(evento) => setNomeUSer(evento.target.value)}
          label="Nome do Usuario"
          variant="standard"
          fullWidth
          required
          sx={{padding: 1}}
        />
        <TextField
          value={idadeUser}
          onChange={(evento) => setIdadeUser(evento.target.value)}
          label="Idade do usuário"
          variant="standard"
          fullWidth
          required
          sx={{padding: 1}}
        />
        <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioUser;
