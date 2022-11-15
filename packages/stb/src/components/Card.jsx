import { useState, useEffect, useCallback } from "react";

export default function Card() {
  const getData = useCallback(async () => {
    const response = await fetch(`http://localhost:3113/api/data/image/random`);
    const data = await response.json();
    const imgSrc = data.artObject.webImage.url;
    const title = data.artObject.title;
    const artNumber = data.artObject.objectNumber;

    const imgSrcCh = data.artObject.webImage?.cachedImageUrl;
    console.log(`cached image url: ${imgSrcCh}`);
    imgSrcCh ? setData(imgSrcCh) : setData(imgSrc);
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
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={data} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{dataTitle}</h2>
        <div className="card-actions justify-end">
          <p>{artNumber}</p>
        </div>
      </div>
    </div>
  );
}
