async function getData(artObjectId) {
  const result = await fetch(`http://localhost:3113/api/data/${artObjectId}`);
  return result.json();
}

export default async function Page() {
  const data = await getData("600d944a-1718-4de8-ba4a-27cbde483e13");
  const imgSrc = data[0]?.image?.cdnUrl;
  return (
    <div>
      <img src={imgSrc} width="100%" />
    </div>
  );
}
