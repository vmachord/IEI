import React, { useState } from "react";
import "./DataLoader.css";

const DataLoader = ({ handleCancel }) => {
  const [selectedSources, setSelectedSources] = useState([]);
  const [results, setResults] = useState({
    successfulRecords: 0,
    repairedRecords: [],
    rejectedRecords: [],
  });

  const sources = [
    { id: "all", name: "Seleccionar todas" },
    { id: "castilla", name: "Castilla y León" },
    { id: "valenciana", name: "Comunitat Valenciana" },
    { id: "euskadi", name: "Euskadi" },
  ];

  const handleSourceChange = (id) => {
    if (id === "all") {
      setSelectedSources(
        selectedSources.length === sources.length - 1 ? [] : sources.map((s) => s.id)
      );
    } else {
      setSelectedSources((prev) =>
        prev.includes(id) ? prev.filter((source) => source !== id) : [...prev, id]
      );
    }
  };

  const handleLoad = () => {
    setResults({
      successfulRecords: 100,
      repairedRecords: [
        {
          source: "Comunitat Valenciana",
          name: "John",
          location: "Valencia",
          error: "Falta el DNI",
          action: "DNI generado automáticamente",
        },
      ],
      rejectedRecords: [
        { source: "Castilla y León", name: "Maria", location: "León", error: "Datos incompletos" },
      ],
    });
  };

  const handleClear = () => {
    setSelectedSources([]);
    setResults({ successfulRecords: 0, repairedRecords: [], rejectedRecords: [] });
  };

  return (
    <div className="data-loader">
      <p>Carga del almacén de datos</p>
      <div className="source-selection">
        <p>Seleccione fuente:</p>
        <div className="source-list">
          {sources.map((source) => (
            <label key={source.id} className="source-item">
              <input
                type="checkbox"
                checked={
                  source.id === "all"
                    ? selectedSources.length === sources.length - 1
                    : selectedSources.includes(source.id)
                }
                onChange={() => handleSourceChange(source.id)}
              />
              {source.name}
            </label>
          ))}
        </div>
      </div>

      <div className="actions">
        <button onClick={handleCancel} className="button cancel">
          Cancelar
        </button>
        <button onClick={handleLoad} className="button load">
          Cargar
        </button>
        <button onClick={handleClear} className="button clear">
          Borrar almacén de datos
        </button>
        <p>Resultados de la carga:</p>
      </div>

      <div className="results">
        <div className="results-container">
          <p>
            <strong>Número de registros cargados correctamente:</strong> {results.successfulRecords || "NN"}
          </p>
          <p>
            <strong>Registros con errores y reparados:</strong>
          </p>
          <ul>
            {results.repairedRecords.map((record, index) => (
              <li key={index}>
                {`{Fuente: ${record.source}, Nombre: ${record.name}, Localidad: ${record.location}, Motivo del error: ${record.error}, Operación realizada: ${record.action}}`}
              </li>
            ))}
          </ul>
          <p>
            <strong>Registros con errores y rechazados:</strong>
          </p>
          <ul>
            {results.rejectedRecords.map((record, index) => (
              <li key={index}>
                {`{Fuente: ${record.source}, Nombre: ${record.name}, Localidad: ${record.location}, Motivo del error: ${record.error}}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataLoader;
