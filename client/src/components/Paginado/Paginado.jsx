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
    if (Number.isInteger(numero / 1)) {
      paginas = parseInt(numero, 10);
    } else {
      let val = numero.toString().split(".");
      paginas = parseInt(val[0], 10) + 1;
    }
  }
  const array = [];
  for (let i = 1; i <= paginas; i++) {
    array.push(i);
  }
  const handleClick = (e) => {
    const { id } = e.target;
    dispatch(getPages(parseInt(id), lim_paginas));
  };
  const handleChangePage = (e) => {
    const { id } = e.target;
    if (id === "atras") {
      dispatch(getPages(pagina - 1, lim_paginas));
    } else {
      dispatch(getPages(pagina + 1, lim_paginas));
    }
    dispatch(changePage(id, adelante, atras));
  };
  const handleChangePageUlt = (e) => {
    const { id } = e.target;
    dispatch(changePage("adelante", paginas - 1, paginas - 4));
    dispatch(getPages(parseInt(id), lim_paginas));
  };
  const handleChangePageFirst = (e) => {
    const { id } = e.target;
    dispatch(changePage("atras", 4, id));
    dispatch(getPages(parseInt(id), lim_paginas));
  };
  return (
    <div className="paginado">
      <div className="buton_row_pag">
        {atras > 0 && (
          <>
            <div className="buton_pag">
              <label id={"atras"} onClick={handleChangePage}>
                {"<"}
              </label>
            </div>
            <div className="buton_pag">
              <label id={1} onClick={handleChangePageFirst}>
                {1}
              </label>
            </div>
            ..
          </>
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
        {adelante < paginas && (
          <>
            ..
            <div className="buton_pag">
              <label id={paginas} onClick={handleChangePageUlt}>
                {paginas}
              </label>
            </div>
            <div className="buton_pag">
              <label id={"adelante"} onClick={handleChangePage}>
                {">"}
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
