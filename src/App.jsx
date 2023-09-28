// eslint-disable-next-line no-unused-vars
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import AgregarGasto from "./components/NuevoGasto";
import EditarEliminarGasto from "./components/EditarGasto";
import ListaDeGastos from "./components/ListaDeGastos";
import RespaldoYRestauracion from "./components/RespaldoYRestauracion";

function App() {
  return (
    <HashRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListaDeGastos />} />
          <Route path="/agregar" element={<AgregarGasto />} />
          <Route path="/editar" element={<EditarEliminarGasto />} />
          <Route path="/respaldo" element={<RespaldoYRestauracion />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
