import { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("red");

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="App">
      <textarea readOnly style={{ background: color }}></textarea>
      <input
        type="text"
        placeholder="Color Name or Code"
        value={color}
        name="color"
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
