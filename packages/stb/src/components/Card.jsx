import { useState, useEffect, useCallback } from "react";

export default function Card() {
  const getData = useCallback(async () => {
    const response = await fetch(`http://localhost:3113/api/data/image/random`);
    const data = await response.json();
    const imgSrc = data.artObject.webImage.url;
    const title = data.artObject.title;
    const artNumber = data.artObject.objectNumber;

    setData(imgSrc);
    setDataTitle(title);
    setArtNumber(artNumber);
  }, []);

  const [data, setData] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [artNumber, setArtNumber] = useState("");

  useEffect(() => {
    getData().catch((e) => console.log(e));
  }, [getData]);
  return (
    <div className="App">
      <div>
        <img src={data} width="100%" />
        <div>
          <p class="title">{dataTitle}</p>
          <p class="titleDate">{artNumber}</p>
        </div>
      </div>
    </div>
  );
}
