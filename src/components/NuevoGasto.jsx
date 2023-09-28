// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import database from "../db";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Estilos de React Datepicker

function AgregarGasto() {
  const [nuevoGasto, setNuevoGasto] = useState({
    fecha: new Date(), // Inicialmente se establece en la fecha actual
    descripcion: "",
    cantidad: 1,
    precio: 0,
    categoria: "Alimentacion", // Valor por defecto
  });

  const categorias = [
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

  const agregarGasto = async () => {
    try {
      await database.gastos.add({ ...nuevoGasto });
      setNuevoGasto({
        fecha: new Date(), // Restablecer la fecha a la actual después de agregar
        descripcion: "",
        cantidad: 0,
        precio: 0,
        categoria: "Alimentacion",
      });
    } catch (error) {
      console.error("Error al agregar el gasto:", error);
    }
  };

  return (
    <div>
      <h2>Agregar Nuevo Gasto</h2>
      <div>
        <label>Fecha:</label>
        <DatePicker
          selected={nuevoGasto.fecha}
          onChange={(date) => setNuevoGasto({ ...nuevoGasto, fecha: date })}
        />
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          value={nuevoGasto.descripcion}
          onChange={(e) =>
            setNuevoGasto({ ...nuevoGasto, descripcion: e.target.value })
          }
        />
      </div>
      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          value={nuevoGasto.cantidad}
          onChange={(e) =>
            setNuevoGasto({ ...nuevoGasto, cantidad: parseFloat(e.target.value) })
          }
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          value={nuevoGasto.precio}
          onChange={(e) =>
            setNuevoGasto({ ...nuevoGasto, precio: parseFloat(e.target.value) })
          }
        />
      </div>
      <div>
        <label>Categoría:</label>
        <select
          value={nuevoGasto.categoria}
          onChange={(e) => setNuevoGasto({ ...nuevoGasto, categoria: e.target.value })}
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>
      <button onClick={agregarGasto}>Agregar Gasto</button>
    </div>
  );
}

export default AgregarGasto;
