// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import database from "../db";
//import { format, parseISO } from "date-fns";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ListaDeGastos.css";

function ListaDeGastos() {
  const [gastos, setGastos] = useState([]);
  const [filtroDia, setFiltroDia] = useState("");
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroAño, setFiltroAño] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");

  const categorias = [
    "Todas",
    "Alimentacion",
    "Cuentas y pagos",
    "Casa",
    "Educacion",
    "Transporte",
    "Ropa",
    "Salud e higiene",
    "Diversion",
    "Otros",
  ];

  useEffect(() => {
    loadGastos();
  }, []);

  const loadGastos = async () => {
    try {
      const gastosFromDB = await database.gastos.toArray();
      setGastos(gastosFromDB);
    } catch (error) {
      console.error("Error al cargar los gastos:", error);
    }
  };

  const filtrarGastos = () => {
    let gastosFiltrados = [...gastos];

    if (filtroCategoria !== "Todas") {
      gastosFiltrados = gastosFiltrados.filter(
        (gasto) => gasto.categoria === filtroCategoria
      );
    }

    if (filtroDia !== "") {
      gastosFiltrados = gastosFiltrados.filter(
        (gasto) => gasto.dia === filtroDia
      );
    }

    if (filtroMes !== "") {
      gastosFiltrados = gastosFiltrados.filter(
        (gasto) => gasto.mes === filtroMes
      );
    }

    if (filtroAño !== "") {
      gastosFiltrados = gastosFiltrados.filter(
        (gasto) => gasto.año === filtroAño
      );
    }

    return gastosFiltrados;
  };

  return (
    <div>
      <h2>Lista de Gastos</h2>
      <div>
        <label>Filtrar por Categoría:</label>
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Filtrar por Día:</label>
        <input
          type="text"
          value={filtroDia}
          onChange={(e) => setFiltroDia(e.target.value)}
        />
      </div>
      <div>
        <label>Filtrar por Mes:</label>
        <input
          type="text"
          value={filtroMes}
          onChange={(e) => setFiltroMes(e.target.value)}
        />
      </div>
      <div>
        <label>Filtrar por Año:</label>
        <input
          type="text"
          value={filtroAño}
          onChange={(e) => setFiltroAño(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            {/* <th>Fecha</th> */}
            <th>Día</th>
            <th>Mes</th>
            <th>Año</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {filtrarGastos().map((gasto) => (
            <tr key={gasto.id}>
              {/* <td>{format(parseISO(gasto.fecha), "dd/MM/yyyy")}</td> */}
              <td>{gasto.dia}</td>
              <td>{gasto.mes}</td>
              <td>{gasto.año}</td>

              <td>{gasto.descripcion}</td>
              <td>{gasto.cantidad}</td>
              <td>{gasto.precio}</td>
              <td>{gasto.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaDeGastos;
