import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getConcursosByCategoria } from "../http/concursosService";

function Concursos(props) {
  const [data, setData] = useState(null);

  const historyParams = useParams();

  useEffect(() => {
    const getData = async () => {
      const result = await getConcursosByCategoria(historyParams.categoria);

      setData(result.data);
    };
    getData();

    return () => {};
  }, []);

  console.log(data);

  return <div>Concursos</div>;
}

export default Concursos;
