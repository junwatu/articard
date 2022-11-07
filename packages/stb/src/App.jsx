import { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const getData = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3113/api/data/RP-F-2005-159-47`
    );
    const data = await response.json();
    const imgSrc = data[0]?.image?.cdnUrl;
    setData(imgSrc);
  }, []);

  const [data, setData] = useState("");
  useEffect(() => {
    getData().catch((e) => console.log(e));
  }, [getData]);
  return (
    <div className="App">
      <div>
        <img src={data} width="100%" />
      </div>
    </div>
  );
}

export default App;