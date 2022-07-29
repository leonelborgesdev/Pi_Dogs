import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPages } from "../../redux/actions";
import "./Paginado.css";

export const Paginado = () => {
  const { lim_paginas, pagina, breeds } = useSelector((state) => state);
  const dispatch = useDispatch();
  let paginas = 0;
  if (breeds.length > lim_paginas) {
    const NumBreeds = Math.round(breeds.length - lim_paginas);
    const numero = NumBreeds / (lim_paginas + 1);
    if (numero - Math.floor(numero === 0)) {
      paginas = numero + 1;
    } else {
      let val = numero.toString().split("");
      paginas = parseInt(val[0], 10) + 2;
    }
  }
  const array = [];
  for (let i = 1; i <= paginas; i++) {
    array.push(i);
  }
  const handleClick = (e) => {
    const { id } = e.target;
    console.log(id);
    dispatch(getPages(parseInt(id), lim_paginas));
  };
  return (
    <div className="paginado">
      <div className="buton_row_pag">
        {breeds.length > 0 ? (
          array.map((num) => {
            return (
              <React.Fragment key={num}>
                {pagina.toString() === num.toString() ? (
                  <div className="buton_pag_select">
                    <label id={num} onClick={handleClick}>
                      {num}
                    </label>
                  </div>
                ) : (
                  <div className="buton_pag">
                    <label id={num} onClick={handleClick}>
                      {num}
                    </label>
                  </div>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};
