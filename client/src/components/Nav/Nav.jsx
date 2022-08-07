import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow.svg";
import hamburguer from "../../assets/menu.svg";
import {
  getBreedByName,
  getBreedByTemperament,
  get_all_breeds,
  orderAlphabetic,
} from "../../redux/actions";
import "./Nav.css";

export default function Nav() {
  useEffect(() => {
    (function () {
      const listElements = document.querySelectorAll(".menu__item--show");
      const list = document.querySelector(".menu__links");
      const menu = document.querySelector(".menu__hamburguer");

      const addClick = () => {
        listElements.forEach((element) => {
          element.addEventListener("click", () => {
            let subMenu = element.children[1];
            let height = 0;
            element.classList.toggle("menu__item--active");

            if (subMenu.clientHeight === 0) {
              height = subMenu.scrollHeight;
            }

            subMenu.style.height = `${height}px`;
          });
        });
      };

      const deleteStyleHeight = () => {
        listElements.forEach((element) => {
          if (element.children[1].getAttribute("style")) {
            element.children[1].removeAttribute("style");
            element.classList.remove("menu__item--active");
          }
        });
      };

      window.addEventListener("resize", () => {
        if (window.innerWidth > 1060) {
          deleteStyleHeight();
          if (list.classList.contains("menu__links--show"))
            list.classList.remove("menu__links--show");
        } else {
          addClick();
        }
      });

      if (window.innerWidth <= 1060) {
        addClick();
      }

      menu.addEventListener("click", () =>
        list.classList.toggle("menu__links--show")
      );
    })();
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ordenar, setOrdenar] = useState({ name: "name" });
  const { temperaments, breedsTable, breeds } = useSelector((state) => state);
  const handleInputChange = (e) => {
    const { value } = e.target;
    dispatch(getBreedByName(value));
  };
  const handleChangeTemperament = (Temperament) => {
    dispatch(getBreedByTemperament(breedsTable, Temperament));
    navigate("/breeds");
  };

  const handleInputChangeOrder = (column, asc_des) => {
    setOrdenar({
      ...ordenar,
      ["name"]: column,
    });
    if (column === "weight") {
      dispatch(
        orderAlphabetic(asc_des, "peso", ordenamientoNumerico([...breeds]))
      );
    } else {
      dispatch(orderAlphabetic(asc_des, column, [...breeds]));
    }
    navigate("/breeds");
  };
  function ordenamientoNumerico(breedsOrdenar) {
    return breedsOrdenar.map((breedOrd) => {
      breedOrd["peso"] = parseInt(breedOrd.weight.split("-")[0].trim(), 10);
      return breedOrd;
    });
  }
  return (
    <div className="Navbar">
      <nav className="menu">
        <section className="menu__container">
          <div className="menu_busqueda">
            <Link className="buton__container" to={"/"}>
              Landing
            </Link>
            <Link
              className="buton__container"
              to={"/breeds"}
              onClick={() => {
                dispatch(get_all_breeds());
              }}
            >
              Breeds
            </Link>
          </div>
          <div className="menu_seccion_busqueda">
            <p className="buton__container">Nombre</p>
            <input
              className="text_buscar_nombre"
              type="text"
              onChange={handleInputChange}
            />
          </div>

          <ul className="menu__links">
            <li className="menu__item menu__item--show">
              <a href="#" className="menu__link">
                Temperaments
                <img src={arrow} className="menu__arrow" />
              </a>

              <ul className="menu__nesting">
                {temperaments.length > 0 &&
                  temperaments.map((temperament) => {
                    return (
                      <li
                        className="menu__inside"
                        key={temperament.id}
                        onClick={() => {
                          handleChangeTemperament(temperament.name);
                        }}
                      >
                        <a href="#" className="menu__link menu__link--inside">
                          {temperament.name}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </li>

            <li className="menu__item  menu__item--show">
              <a href="#" className="menu__link">
                Ordenar
                <img src={arrow} className="menu__arrow" />
              </a>

              <ul className="menu__nesting">
                <li
                  className="menu__inside"
                  onClick={() => {
                    handleInputChangeOrder("name", true);
                  }}
                >
                  <a href="#" className="menu__link menu__link--inside">
                    Breed
                  </a>
                </li>
                <li
                  className="menu__inside"
                  onClick={() => {
                    handleInputChangeOrder("weight", true);
                  }}
                >
                  <a href="#" className="menu__link menu__link--inside">
                    Weight
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu__item  menu__item--show">
              <a href="#" className="menu__link">
                Alphabetic
                <img src={arrow} className="menu__arrow" />
              </a>

              <ul className="menu__nesting">
                <li
                  className="menu__inside"
                  onClick={() => {
                    handleInputChangeOrder(ordenar.name, true);
                  }}
                >
                  <a href="#" className="menu__link menu__link--inside">
                    Ascendente
                  </a>
                </li>
                <li
                  className="menu__inside"
                  onClick={() => {
                    handleInputChangeOrder(ordenar.name, false);
                  }}
                >
                  <a href="#" className="menu__link menu__link--inside">
                    Descendente
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu__item">
              <a href="/createBreeds" className="menu__link">
                Create Breeds
              </a>
            </li>
          </ul>

          <div className="menu__hamburguer">
            <img src={hamburguer} className="menu__img" />
          </div>
        </section>
      </nav>
    </div>
  );
}
