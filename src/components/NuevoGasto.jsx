// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import database from "../db";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function AgregarGasto() {
  const fechaActual = new Date(); // Obtener la fecha actual

  const [nuevoGasto, setNuevoGasto] = useState({
    fecha: fechaActual, // Inicialmente se establece en la fecha actual
    dia:"",
    mes:"",
    año:"",
    descripcion: "",
    cantidad: 1,
    precio: 0,
    categoria: "Alimentacion", // Valor por defecto
  });

  const agregarGasto = async () => {
    try {
      // Obtén los valores de día, mes y año de la fecha actual o de la fecha seleccionada
      const dia = format(nuevoGasto.fecha, "dd");
      const mes = format(nuevoGasto.fecha, "MM");
      const año = format(nuevoGasto.fecha, "yyyy");
  
      // Agrega el nuevo gasto a la base de datos, incluyendo los campos de día, mes y año
      await database.gastos.add({ ...nuevoGasto, dia, mes, año });
  
      // Restablece los campos después de agregar
      setNuevoGasto({
        fecha: fechaActual, // Restablecer la fecha a la actual
        dia: "",
        mes: "",
        año: "",
        descripcion: "",
        cantidad: 1,
        precio: 0,
        categoria: "Alimentacion",
      });
    } catch (error) {
      console.error("Error al agregar el gasto:", error);
    }
  };
  
  // Función para actualizar los campos de día, mes y año cuando el usuario cambie la fecha
  const actualizarCamposFecha = (fecha) => {
    setNuevoGasto({
      ...nuevoGasto,
      fecha,
      dia: format(fecha, "dd"),
      mes: format(fecha, "MM"),
      año: format(fecha, "yyyy"),
    });
  };
  

  return (
    <div>
      <h2>Agregar Nuevo Gasto</h2>
      <div>
        <label>Fecha:</label>
        <DatePicker
          selected={nuevoGasto.fecha}
          onChange={(date) => actualizarCamposFecha(date)}
          dateFormat="dd/MM/yyyy" // Formato de fecha
        />
      </div>
      <div>
        <label>Día:</label>
        <input
          type="text"
          value={format(nuevoGasto.fecha, "dd")}
          readOnly // Hacer el campo de solo lectura
        />
      </div>
      <div>
        <label>Mes:</label>
        <input
          type="text"
          value={format(nuevoGasto.fecha, "MM")}
          readOnly // Hacer el campo de solo lectura
        />
      </div>
      <div>
        <label>Año:</label>
        <input
          type="text"
          value={format(nuevoGasto.fecha, "yyyy")}
          readOnly // Hacer el campo de solo lectura
        />
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          value={nuevoGasto.descripcion}
          onChange={(e) => setNuevoGasto({ ...nuevoGasto, descripcion: e.target.value })}
        />
      </div>
      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          value={nuevoGasto.cantidad}
          onChange={(e) => setNuevoGasto({ ...nuevoGasto, cantidad: parseFloat(e.target.value) })}
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          value={nuevoGasto.precio}
          onChange={(e) => setNuevoGasto({ ...nuevoGasto, precio: parseFloat(e.target.value) })}
        />
      </div>
      <div>
        <label>Categoría:</label>
        <select
          value={nuevoGasto.categoria}
          onChange={(e) => setNuevoGasto({ ...nuevoGasto, categoria: e.target.value })}
        >
          <option value="Alimentacion">Alimentacion</option>
          <option value="Cuentas y pagos">Cuentas y pagos</option>
          <option value="Casa">Casa</option>
          <option value="Educacion">Educacion</option>
          <option value="Transporte">Transporte</option>
          <option value="Ropa">Ropa</option>
          <option value="Salud e higiene">Salud e higiene</option>
          <option value="Diversion">Diversion</option>
          <option value="Otros">Otros</option>
        </select>
      </div>
      <button onClick={agregarGasto}>Agregar Gasto</button>
    </div>
  );
}

export default AgregarGasto;

