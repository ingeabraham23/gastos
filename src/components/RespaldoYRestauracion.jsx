// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import database from "../db";
import jsonData from "./backupGastos.json";
import "./RespaldoYRestauracion.css"

function RespaldoYRestauracion() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleBackup = async () => {
    try {
      // Abre la conexión a la base de datos
      await database.open();
      const gastos = await database.gastos.toArray();
      const jsonData = JSON.stringify(gastos, null, 2);

      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "backupGastos.json";
      a.click();

      console.log("Base de datos respaldada correctamente");
    } catch (error) {
      console.error("Error al respaldar la base de datos:", error);
    }
  };

  const handleRestore = async () => {
    try {
      // Abre la conexión a la base de datos
      await database.open();
      if (selectedFile) {
        const fileContent = await selectedFile.text();
        const parsedData = JSON.parse(fileContent);

        // Borrar todos los registros actuales antes de restaurar
        await database.gastos.clear();

        // Insertar los nuevos registros desde el archivo JSON
        await database.gastos.bulkAdd(parsedData);

        console.log("Base de datos restaurada correctamente");
      }
    } catch (error) {
      console.error("Error al restaurar la base de datos:", error);
    }
  };

  const handleLoadFromJSON = async () => {
    try {
      // Abre la conexión a la base de datos
      await database.open();

      // Borrar todos los registros actuales antes de cargar desde JSON
      await database.gastos.clear();

      // Insertar los nuevos registros desde los datos importados del archivo JSON
      await database.gastos.bulkAdd(jsonData);

      console.log("Datos cargados desde JSON correctamente");
    } catch (error) {
      console.error("Error al cargar datos desde JSON:", error);
    }
  };

  return (
    <div className="container">
      <h3>Respaldar y Restaurar Base de Datos</h3>
      <div className="input-container">
        <label className="label" htmlFor="backupFile">Seleccionar archivo de respaldo:</label>
        <input className="input-file"
          type="file"
          id="backupFile"
          accept=".json"
          onChange={handleFileChange}
        />
        <button className="button restore" onClick={handleRestore}>Restaurar respaldo desde archivo JSON</button>
      </div>
      <div className="button-container">
        <button className="button backup" onClick={handleBackup}>Crear respaldo</button>
        
        
      </div>
      <div className="button-container"><button className="button load" onClick={handleLoadFromJSON}>Cargar datos guardados anteriormente</button></div>
    </div>
  );
}

export default RespaldoYRestauracion;
