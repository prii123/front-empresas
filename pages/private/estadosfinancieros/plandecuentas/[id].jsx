import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import LayoutPrivate from "../../../../components/Layoutprivate";
import Nav_Estados_Financieros from "../../../../components/Empresas/estadosFinancieros/Nav_Estados_Financieros";
import libs from '../../../../libs/util'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {useAuth} from '../../../../libs/auth'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const ClasePucStyle = ({ codigo, nombre }) => {
  return (
    <>
      <Box
        sx={{ width: "59vw" }} //p: 2, border: "1px dashed grey",
      >
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography align="left" variant="h6">
                {codigo}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography align="left" variant="h6">
                {nombre}
              </Typography>
            </Grid>
          </Grid>
        </Item>
      </Box>
    </>
  );
};

const plandecuentas = () => {
  const [estadosFinancieros, setEstadosFinancieros] = useState([]);
  const [statusPage, setStatusPage] = useState(false);
  const router = useRouter();
  const { getAuthHeaders } = useAuth();

  //CLASES INICIALES
  const claseInicial = [
    {
      clase: "1",
      nombre: "activo",
      empresaId: router.query.id,
    },
    {
      clase: "2",
      nombre: "pasivo",
      empresaId: router.query.id,
    },
    {
      clase: "3",
      nombre: "patrimonio",
      empresaId: router.query.id,
    },
    {
      clase: "4",
      nombre: "ingresos",
      empresaId: router.query.id,
    },
    {
      clase: "5",
      nombre: "gastos",
      empresaId: router.query.id,
    },
    {
      clase: "6",
      nombre: "costos",
      empresaId: router.query.id,
    },
    {
      clase: "7",
      nombre: "costos de produccion",
      empresaId: router.query.id,
    },
  ];

  const crearClases = async () => {
    claseInicial.map(async (clase) => {
      await axios({
        method: "post",
        url: libs.location() + "api/crearclases",
        headers: getAuthHeaders(),
        data: clase,
      });
    });

    router.reload(`/private/estadosfinancieros/agregargrupos/${router.query.id}`);
  };

  const getdata = async () => {
    const req = await axios({
      method: "post",
      url: libs.location() + "api/listarclases",
      headers: getAuthHeaders(),
      data: {
        dataId: router.query.id,
      },
    });
    // console.log(req.data.lista);
    setEstadosFinancieros(req.data.lista);
    // setTimeout(() => {
      // console.log(req.data.lista.length)
      if(req.data?.lista.length > 0){
        setStatusPage(true);
      }
    // },[1000]);
  };

  const eliminarTodoPuc = async () => {
    const req = await axios({
      method: "delete",
      url: libs.location() + "api/borrarclases",
      headers: getAuthHeaders(),
      data: {
        empresaId: router.query.id,
      },
    });
    router.push(`/private/estadosfinancieros/estadodesituacionfinanciera/${router.query.id}`);
  }
  const eliminarCuentasAuxiliares = async () => {
    const req = await axios({
      method: "delete",
      url: libs.location() + "api/borrarauxiliares",
      headers: getAuthHeaders(),
      data: {
        empresaId: router.query.id,
      },
    });
    router.push(`/private/estadosfinancieros/estadodesituacionfinanciera/${router.query.id}`);
  }

  useEffect(async() => {
    getdata();
  }, []);

  return (
    <LayoutPrivate nav={<Nav_Estados_Financieros />}>
      <div>
        {statusPage == false ? (
          <>
            <div>No tienes cargado ningun plan de cuentas.</div>
            <button onClick={crearClases}>crear</button>
          </>
        ) : (
          <>
            <Box sx={{ with: "100vw" }}>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={eliminarTodoPuc}>Eiminar todo</Button>
                <Button onClick={eliminarCuentasAuxiliares}>Eliminar Auxiliares</Button>
              </ButtonGroup>
              <ul>
                {estadosFinancieros.map((estado, key) => {
                  return (
                    <>
                      <ClasePucStyle
                      key={key}
                        codigo={estado.clase}
                        nombre={estado.nombre}
                      />
                      <>
                        {estado.grupos.map((grup, key1) => {
                          return (
                            <>
                              <ClasePucStyle
                              key={key1}
                                codigo={grup.grupo}
                                nombre={grup.nombre}
                              />

                              <>
                                {grup.cuentas.map((cuenta, key2) => {
                                  return (
                                    <>
                                      <ClasePucStyle
                                      key={key2}
                                        codigo={cuenta.cuentas}
                                        nombre={cuenta.nombre}
                                      />
                                      <>
                                        {cuenta.subcuentas.map((subcuenta, key3) => {
                                          return (
                                            <>
                                              <ClasePucStyle
                                              key={key3}
                                                codigo={subcuenta.subcuentas}
                                                nombre={subcuenta.nombre}
                                              />
                                            </>
                                          );
                                        })}
                                      </>
                                    </>
                                    // aquii
                                  );
                                })}
                              </>
                            </>
                          );
                        })}
                      </>
                    </>
                  );
                })}
              </ul>
            </Box>
          </>
        )}
      </div>
    </LayoutPrivate>
  );
};

export default plandecuentas;
