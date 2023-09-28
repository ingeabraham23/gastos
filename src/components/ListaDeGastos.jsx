// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import database from "../db";
import { format, startOfWeek, endOfWeek } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ListaDeGastos() {
  const [gastos, setGastos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroFecha, setFiltroFecha] = useState(null); // Cambiado a null
  const [filtroSemana, setFiltroSemana] = useState(null); // Cambiado a null

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

    if (filtroFecha !== null) {
      gastosFiltrados = gastosFiltrados.filter(
        (gasto) => format(gasto.fecha, "dd/MM/yyyy") === format(filtroFecha, "dd/MM/yyyy")
      );
    }

    if (filtroSemana !== null) {
      const inicioSemana = startOfWeek(filtroSemana, { weekStartsOn: 1 }); // 1 = lunes
      const finSemana = endOfWeek(filtroSemana, { weekStartsOn: 1 }); // 1 = lunes

      gastosFiltrados = gastosFiltrados.filter(
        (gasto) =>
          gasto.fecha >= inicioSemana && gasto.fecha <= finSemana
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
        <label>Filtrar por Fecha:</label>
        <DatePicker
          selected={filtroFecha}
          onChange={(date) => setFiltroFecha(date)}
          dateFormat="dd/MM/yyyy" // Personaliza el formato de la fecha
          isClearable // Agrega un botón para borrar la fecha
        />
      </div>
      <div>
        <label>Filtrar por Semana:</label>
        <DatePicker
          selected={filtroSemana}
          onChange={(date) => setFiltroSemana(date)}
          dateFormat="dd/MM/yyyy" // Personaliza el formato de la fecha
          isClearable // Agrega un botón para borrar la fecha
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {filtrarGastos().map((gasto) => (
            <tr key={gasto.id}>
              <td>{format(gasto.fecha, "dd/MM/yyyy")}</td>
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
