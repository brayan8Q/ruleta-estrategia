
import React, { useState } from "react";
import "./App.css";

const columnMap = {
  1: "1ra", 2: "2da", 3: "3ra", 4: "1ra", 5: "2da", 6: "3ra",
  7: "1ra", 8: "2da", 9: "3ra", 10: "1ra", 11: "2da", 12: "3ra",
  13: "1ra", 14: "2da", 15: "3ra", 16: "1ra", 17: "2da", 18: "3ra",
  19: "1ra", 20: "2da", 21: "3ra", 22: "1ra", 23: "2da", 24: "3ra",
  25: "1ra", 26: "2da", 27: "3ra", 28: "1ra", 29: "2da", 30: "3ra",
  31: "1ra", 32: "2da", 33: "3ra", 34: "1ra", 35: "2da", 36: "3ra"
};

const colorMap = {
  1: "rojo", 2: "negro", 3: "rojo", 4: "negro", 5: "rojo", 6: "negro",
  7: "rojo", 8: "negro", 9: "rojo", 10: "negro", 11: "negro", 12: "rojo",
  13: "negro", 14: "rojo", 15: "negro", 16: "rojo", 17: "negro", 18: "rojo",
  19: "rojo", 20: "negro", 21: "rojo", 22: "negro", 23: "rojo", 24: "negro",
  25: "rojo", 26: "negro", 27: "rojo", 28: "negro", 29: "negro", 30: "rojo",
  31: "negro", 32: "rojo", 33: "negro", 34: "rojo", 35: "negro", 36: "rojo"
};

const docenaMap = {
  1: "1ra", 2: "1ra", 3: "1ra", 4: "1ra", 5: "1ra", 6: "1ra",
  7: "1ra", 8: "1ra", 9: "1ra", 10: "2da", 11: "2da", 12: "2da",
  13: "2da", 14: "2da", 15: "2da", 16: "2da", 17: "2da", 18: "2da",
  19: "3ra", 20: "3ra", 21: "3ra", 22: "3ra", 23: "3ra", 24: "3ra",
  25: "3ra", 26: "3ra", 27: "3ra", 28: "3ra", 29: "3ra", 30: "3ra",
  31: "3ra", 32: "3ra", 33: "3ra", 34: "3ra", 35: "3ra", 36: "3ra"
};

function App() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [recomendacion, setRecomendacion] = useState("");
  const [bank, setBank] = useState(10000);
  const [apuesta, setApuesta] = useState(10);
  const [racha, setRacha] = useState(0);

  const analizar = () => {
    const numero = parseInt(input);
    if (isNaN(numero) || numero < 0 || numero > 36) {
      setRecomendacion("Número inválido");
      return;
    }

    const columna = columnMap[numero] || "fuera";
    const color = colorMap[numero] || "fuera";
    const docena = docenaMap[numero] || "fuera";

    const nuevaRacha = columna === history[history.length - 1] ? 0 : racha + 1;
    setRacha(nuevaRacha);

    let mensaje = `👉 Columna: ${columna}, Color: ${color}, Docena: ${docena}`;

    if (nuevaRacha >= 3 && columna !== "fuera") {
      const columnas = [columna];
      if (columna === "1ra") columnas.push("2da");
      else if (columna === "2da") columnas.push("3ra");
      else columnas.push("1ra");
      mensaje += `
🔥 Estrategia: Apostar a columnas ${columnas.join(" y ")}`;
    } else if (columna !== "fuera") {
      mensaje += `
🎯 Estrategia: Apostar a columna ${columna}`;
    }

    const nuevoBank = bank - apuesta;
    setBank(nuevoBank);
    setHistory((prev) => [...prev, columna]);
    setRecomendacion(mensaje);
    setInput("");
  };

  return (
    <div className="App" style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Simulador Inteligente de Ruleta 🎲</h2>
      <p>Bank: ${bank}</p>
      <input
        placeholder="Número (0-36)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={analizar}>Analizar</button>

      {recomendacion && (
        <div style={{ marginTop: 20, background: '#eee', padding: 10 }}>
          <pre>{recomendacion}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
