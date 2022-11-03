async function getData(artObjectId) {
  const result = await fetch(`http://localhost:3113/api/data/${artObjectId}`);
  return result.json();
}

export default async function Page() {
  const data = await getData("RP-F-2005-158-12");
  const imgSrc = data[0]?.image?.cdnUrl;
  return (
    <div>
      <img src={imgSrc} width="100%" />
    </div>
  );
}
