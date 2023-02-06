import { useState, useEffect } from "react";

export function App() {
  const [fact, setFact] = useState();
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((data) => setFact(data.fact))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h1>App de Gatitos</h1>
      <p>{fact && fact}</p>
      {imgUrl && <img src={imgUrl} alt="cat" />}
    </>
  );
}
