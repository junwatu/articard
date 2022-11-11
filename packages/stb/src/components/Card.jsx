import { useState, useEffect, useCallback } from "react";

export default function Card() {
  const getData = useCallback(async () => {
    const response = await fetch(`http://localhost:3113/api/data/image/random`);
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
