import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getPages } from "../../redux/actions";
import "./Paginado.css";

export const Paginado = () => {
  const { lim_paginas, pagina, breeds, atras, adelante } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  let paginas = 0;
  if (breeds.length > lim_paginas) {
    const NumBreeds = Math.round(breeds.length);
    const numero = NumBreeds / lim_paginas;
    if (numero - Math.floor(numero === 0)) {
      paginas = parseInt(numero, 10) + 1;
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
  const handleChancgePage = (e) => {
    const { id } = e.target;
    dispatch(changePage(id, adelante, atras));
  };
  return (
    <div className="paginado">
      <div className="buton_row_pag">
        {atras > 0 && (
          <div className="buton_pag">
            <label id={"atras"} onClick={handleChancgePage}>
              {"<"}
            </label>
          </div>
        )}
        {breeds.length > 0 ? (
          array.map((num) => {
            return (
              <React.Fragment key={num}>
                {num <= adelante && num > atras && (
                  <>
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
                  </>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <span></span>
        )}
        {console.log(paginas)}
        {adelante < paginas && (
          <div className="buton_pag">
            <label id={"adelante"} onClick={handleChancgePage}>
              {">"}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
