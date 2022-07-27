import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/arrow.svg";
import hamburguer from "../../assets/menu.svg";
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
        if (window.innerWidth > 1125) {
          deleteStyleHeight();
          if (list.classList.contains("menu__links--show"))
            list.classList.remove("menu__links--show");
        } else {
          addClick();
        }
      });

      if (window.innerWidth <= 1125) {
        addClick();
      }

      menu.addEventListener("click", () =>
        list.classList.toggle("menu__links--show")
      );
    })();
  }, []);
  return (
    <div className="Navbar">
      <nav className="menu">
        <section className="menu__container">
          <Link className="buton__container" to={"/breeds"}>
            Home
          </Link>

          <div className="menu_busqueda">
            <p>Nombre</p>
            <input className="text_buscar_nombre" type="text" />
          </div>

          <ul className="menu__links">
            <li className="menu__item menu__item--show">
              <a href="#" className="menu__link">
                Temperaments
                <img src={arrow} className="menu__arrow" />
              </a>

              <ul className="menu__nesting">
                <li className="menu__inside">
                  <a href="#" className="menu__link menu__link--inside">
                    Independent
                  </a>
                </li>
                <li className="menu__inside">
                  <a href="#" className="menu__link menu__link--inside">
                    Faithful
                  </a>
                </li>
                <li className="menu__inside">
                  <a href="#" className="menu__link menu__link--inside">
                    Sturdy
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu__item  menu__item--show">
              <a href="#" className="menu__link">
                Ordenar
                <img src={arrow} className="menu__arrow" />
              </a>

              <ul className="menu__nesting">
                <li className="menu__inside">
                  <a href="#" className="menu__link menu__link--inside">
                    Breed
                  </a>
                </li>
                <li className="menu__inside">
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
                <li className="menu__inside">
                  <a href="#" className="menu__link menu__link--inside">
                    Ascendente
                  </a>
                </li>
                <li className="menu__inside">
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
