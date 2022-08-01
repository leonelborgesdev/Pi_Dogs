import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTemperaments,
  cargar_temperamentos,
  addBreed,
  getTemperamentsByName,
} from "../../redux/actions";
import { v4 } from "uuid";
import Nav from "../Nav/Nav";
import "./CreateBreeds.css";
import { useNavigate } from "react-router-dom";

const CreateBreeds = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);
  //   const { temperaments, labelSelect } = useSelector((state) => state);
  const { temperaments_search } = useSelector((state) => state);
  const [labelError, setLabelError] = useState({ label: "" });
  const [breed, setBreed] = useState({
    id: v4(),
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });
  const [height, setHeigth] = useState({ height1: 0, height2: 0 });
  const [weight, setWeigth] = useState({ weight1: 0, weight2: 0 });
  const [life_span, setLife_span] = useState({
    life_span1: "",
    life_span2: "",
  });
  const handleTemperament = (e) => {
    const { id } = e.target;
    breed.temperaments.push(id);
    dispatch(cargar_temperamentos(breed.temperaments));
  };
  const handleTemperamentDeseleccionar = (e) => {
    const { id } = e.target;
    for (let i = 0; i < breed.temperaments.length; i++) {
      if (breed.temperaments[i] === id) {
        breed.temperaments.splice(i, 1);
      }
    }
    dispatch(cargar_temperamentos(breed.temperaments));
  };
  const handleVerificar = (id) => {
    let ban = false;
    if (breed.temperaments.length > 0) {
      breed.temperaments.map((select) => {
        if (id === select) {
          ban = true;
        }
      });
    }
    return ban;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBreed({
      ...breed,
      [name]: value,
    });
  };
  const handleInputChangeheigth = (e) => {
    const { name, value } = e.target;
    setHeigth({
      ...height,
      [name]: value,
    });
  };
  const handleInputChangeweigth = (e) => {
    const { name, value } = e.target;
    setWeigth({
      ...weight,
      [name]: value,
    });
  };
  const handleInputChangelifespan = (e) => {
    const { name, value } = e.target;
    setLife_span({
      ...life_span,
      [name]: value,
    });
  };
  const handleInputChangeSearch = (e) => {
    const { value } = e.target;
    dispatch(getTemperamentsByName(value));
  };
  function cargar_datos(name, value) {
    if (name === "heigth") {
      breed.height = value;
    }
    if (name === "weight") {
      breed.weight = value;
    }
    if (name === "life_span") {
      breed.life_span = value;
    }
  }
  function verificar_entero(h1, h2, w1, w2, ls1, ls2) {
    console.log(h1);
    if (Number.isInteger(h1 / 1)) {
      if (Number.isInteger(h2 / 1)) {
        if (Number.isInteger(w1 / 1)) {
          if (Number.isInteger(w2 / 1)) {
            if (Number.isInteger(ls1 / 1)) {
              if (Number.isInteger(ls2 / 1)) {
                return true;
              } else {
                setLabelError({
                  ...labelError,
                  label:
                    "El Segundo parametro de los años de vida no es un numero entero",
                });
              }
            } else {
              setLabelError({
                ...labelError,
                label:
                  "El Primer parametro de los años de vida no es un numero entero",
              });
            }
          } else {
            setLabelError({
              ...labelError,
              label: "El Segundo parametro del peso no es un numero entero",
            });
          }
        } else {
          setLabelError({
            ...labelError,
            label: "El Primer parametro del peso no es un numero entero",
          });
        }
      } else {
        setLabelError({
          ...labelError,
          label: "El Segundo parametro de la altura no es un numero entero",
        });
      }
    } else {
      setLabelError({
        ...labelError,
        label: "El Primer parametro de la altura no es un numero entero",
      });
    }
    return false;
  }
  const handleCreateBreed = () => {
    cargar_datos("heigth", height.height1 + "-" + height.height2);
    cargar_datos("weight", weight.weight1 + "-" + weight.weight2);
    cargar_datos(
      "life_span",
      life_span.life_span1 + "-" + life_span.life_span2
    );
    if (
      verificar_entero(
        height.height1,
        height.height2,
        weight.weight1,
        weight.weight2,
        life_span.life_span1,
        life_span.life_span2
      )
    ) {
      if (breed.temperaments.length > 0) {
        if (breed.name.length > 0) {
          if (height.height1.length > 0 && height.height2.length > 0) {
            if (weight.weight1.length > 0 && weight.weight2.length > 0) {
              if (
                life_span.life_span1.length > 0 &&
                life_span.life_span2.length > 0
              ) {
                // if (breed.image.length > 0 && breed.image.length > 0) {
                dispatch(addBreed(breed));
                dispatch(cargar_temperamentos([]));
                navigate("/breeds");
                // } else {
                //   setLabelError({
                //     ...labelError,
                //     label: "Introduzca la url de la imagen",
                //   });
                // }
              } else {
                setLabelError({
                  ...labelError,
                  label: "Introduzca el rango de años de vida",
                });
              }
            } else {
              setLabelError({
                ...labelError,
                label: "Introduzca el peso de la raza",
              });
            }
          } else {
            setLabelError({
              ...labelError,
              label: "Introduzca el tamaño de la raza",
            });
          }
        } else {
          setLabelError({
            ...labelError,
            label: "Introduzca el nombre de la raza",
          });
        }
      } else {
        setLabelError({
          ...labelError,
          label: "Seleccione al menos un temeperamento",
        });
      }
    }
  };
  return (
    <div>
      <Nav />
      <div className="create_breeds">
        <h1>Create Breeds</h1>
        <div className="form_create">
          <div className="container_create">
            <div className="create_item">
              <h3 className="textCreate">Nombre:</h3>
              <input
                type={"text"}
                placeholder="Name..."
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="create_item">
              <h3 className="textCreate">Altura:</h3>
              <input
                type={"text"}
                placeholder="64"
                name="height1"
                onChange={handleInputChangeheigth}
              />
              <h3 className="textCreate">-</h3>
              <input
                type={"text"}
                placeholder="69"
                name="height2"
                onChange={handleInputChangeheigth}
              />
            </div>
            <div className="create_item">
              <h3 className="textCreate">Peso:</h3>
              <input
                type={"text"}
                placeholder="23"
                name="weight1"
                onChange={handleInputChangeweigth}
              />
              <h3 className="textCreate">-</h3>
              <input
                type={"text"}
                placeholder="27"
                name="weight2"
                onChange={handleInputChangeweigth}
              />
            </div>
            <div className="create_item">
              <h3 className="textCreate">Años:</h3>
              <input
                type={"text"}
                placeholder="10"
                name="life_span1"
                onChange={handleInputChangelifespan}
              />
              <h3 className="textCreate">-</h3>
              <input
                type={"text"}
                placeholder="13"
                name="life_span2"
                onChange={handleInputChangelifespan}
              />
            </div>
            <div className="create_item">
              <h3 className="textCreate">Imagen:</h3>
              <input
                type={"text"}
                placeholder="Url image..."
                name="image"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="panel_temperaments">
            <div className="create_item">
              <h3 className="textCreate">Nombre:</h3>
              <input
                type={"text"}
                placeholder="Temperament..."
                name="name"
                onChange={handleInputChangeSearch}
              />
            </div>
            <div className="table_temperaments">
              {temperaments_search.map((temperament) => {
                return (
                  <React.Fragment key={temperament.id}>
                    {breed.temperaments.map((select) => {
                      return (
                        <React.Fragment key={select}>
                          {select === temperament.id && (
                            <div
                              className="label_table_sel"
                              key={temperament.id}
                            >
                              <label
                                id={temperament.id}
                                onClick={handleTemperamentDeseleccionar}
                              >
                                {temperament.name}
                              </label>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                    {handleVerificar(temperament.id) === false && (
                      <div className="label_table" key={temperament.id}>
                        <label id={temperament.id} onClick={handleTemperament}>
                          {temperament.name}
                        </label>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
        <div className="labelError">
          <label>{labelError.label}</label>
        </div>
        <div className="group_btn">
          <button onClick={handleCreateBreed}>Create</button>
        </div>
      </div>
      <div className="relleno"></div>
    </div>
  );
};

export default CreateBreeds;
