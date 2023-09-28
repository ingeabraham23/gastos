// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import database from "../db";

function EditarEliminarGasto() {
  const [gastos, setGastos] = useState([]);
  const [gastoSeleccionado, setGastoSeleccionado] = useState(null);

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

  const editarGasto = async () => {
    if (!gastoSeleccionado) return;

    try {
      await database.gastos.update(gastoSeleccionado.id, { ...gastoSeleccionado });
      loadGastos(); // Actualizar la lista de gastos después de editar
      setGastoSeleccionado(null); // Limpiar el gasto seleccionado
    } catch (error) {
      console.error("Error al editar el gasto:", error);
    }
  };

  const eliminarGasto = async () => {
    if (!gastoSeleccionado) return;

    try {
      await database.gastos.delete(gastoSeleccionado.id);
      loadGastos(); // Actualizar la lista de gastos después de eliminar
      setGastoSeleccionado(null); // Limpiar el gasto seleccionado
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
    }
  };

  return (
    <div>
      <h2>Editar o Eliminar Gasto</h2>
      <select
        onChange={(e) => {
          const selectedId = parseInt(e.target.value);
          const selectedGasto = gastos.find((gasto) => gasto.id === selectedId);
          setGastoSeleccionado(selectedGasto);
        }}
      >
        <option value="">Selecciona un gasto</option>
        {gastos.map((gasto) => (
          <option key={gasto.id} value={gasto.id}>
            {gasto.descripcion}
          </option>
        ))}
      </select>
      {gastoSeleccionado && (
        <div>
          <label>Fecha:</label>
          <input
            type="text"
            value={gastoSeleccionado.fecha}
            onChange={(e) =>
              setGastoSeleccionado({ ...gastoSeleccionado, fecha: e.target.value })
            }
          />
          <label>Descripción:</label>
          <input
            type="text"
            value={gastoSeleccionado.descripcion}
            onChange={(e) =>
              setGastoSeleccionado({ ...gastoSeleccionado, descripcion: e.target.value })
            }
          />
          <label>Cantidad:</label>
          <input
            type="number"
            value={gastoSeleccionado.cantidad}
            onChange={(e) =>
              setGastoSeleccionado({
                ...gastoSeleccionado,
                cantidad: parseFloat(e.target.value),
              })
            }
          />
          <label>Precio:</label>
          <input
            type="number"
            value={gastoSeleccionado.precio}
            onChange={(e) =>
              setGastoSeleccionado({ ...gastoSeleccionado, precio: parseFloat(e.target.value) })
            }
          />
          <button onClick={editarGasto}>Editar Gasto</button>
          <button onClick={eliminarGasto}>Eliminar Gasto</button>
        </div>
      )}
    </div>
  );
}

export default EditarEliminarGasto;
