import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  cargar_temperamentos,
  getAllTemperaments,
  getBreedById,
  getTemperamentsByName,
  get_all_breeds,
  modifyBreed,
} from "../../redux/actions";
import Nav from "../Nav/Nav";
import "./ModifyBreeds.css";
export const ModifyBreeds = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idBreed } = useParams();
  useEffect(() => {
    console.log(idBreed);
    dispatch(getAllTemperaments());
    dispatch(get_all_breeds());
    dispatch(getBreedById(idBreed));
  }, []);
  const { temperaments_search, breed } = useSelector((state) => state);
  const [labelError, setLabelError] = useState({ label: "" });
  const [breedMody, setBreedMody] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });
  const [temperamentLength, setTemperamentLength] = useState({ tamaño: [] });
  function verificar_temp_eliminados(BreedTemp, TempTamaño) {
    console.log("verificar tempe eliminados", BreedTemp, TempTamaño);
    for (let i = 0; i < TempTamaño.length; i++) {
      let ban = false;
      for (let j = 0; j < BreedTemp.length; j++) {
        if (TempTamaño[i].id == BreedTemp[j].id) {
          ban = true;
        }
      }
      if (ban === false) {
        return false;
      }
    }
    return true;
  }
  function cargar_datos(breedInput, BreedTemp) {
    console.log(breedInput, BreedTemp, temperamentLength);
    const breedReturn = {};
    //-----------------------temperaments: []-------------------------------
    if (temperamentLength.tamaño.length > 0) {
      if (BreedTemp.temperaments.length > temperamentLength.tamaño.length) {
        breedReturn["temperaments"] = BreedTemp.temperaments;
      } else {
        if (
          verificar_temp_eliminados(
            BreedTemp.temperaments,
            temperamentLength.tamaño
          ) === false
        ) {
          breedReturn["temperaments"] = BreedTemp.temperaments;
        }
      }
    }
    //----------------------name: ""-----------------------------
    if (breedInput.name.length > 0) {
      breedReturn["name"] = breedInput.name;
    }
    //-----------------------image: ""---------------------------
    if (breedInput.image.length > 0) {
      breedReturn["image"] = breedInput.image;
    }
    //-----------------------heigth: ""--------------------------
    const heightId = {
      heightId1: BreedTemp.height.split("-")[0],
      heightId2: BreedTemp.height.split("-")[1],
    };
    if (height.height1.length > 0 && heightId.heightId1 !== height.height1) {
      if (
        height.height2.length > 0 &&
        heightId.heightId2 !== height.height2 &&
        heightId.heightId2 !== undefined
      ) {
        breedReturn["height"] = height.height1 + " - " + height.height2;
      } else {
        if (heightId.heightId2 !== undefined) {
          breedReturn["height"] = height.height1 + " - " + heightId.heightId2;
        } else {
          breedReturn["height"] = height.height1;
        }
      }
    } else {
      if (
        height.height2.length > 0 &&
        heightId.heightId2 !== height.height2 &&
        heightId.heightId1 !== undefined
      ) {
        breedReturn["height"] = heightId.heightId1 + " - " + height.height2;
      }
    }
    //-----------------------weigth: ""--------------------------
    const weightId = {
      weightId1: BreedTemp.weight.split("-")[0],
      weightId2: BreedTemp.weight.split("-")[1],
    };
    console.log("weightId", weightId, weight);
    if (weight.weight1.length > 0 && weightId.weightId1 !== weight.weight1) {
      if (
        weight.weight2.length > 0 &&
        weightId.weightId2 !== weight.weight2 &&
        weightId.weightId2 !== undefined
      ) {
        breedReturn["weight"] = weight.weight1 + " - " + weight.weight2;
      } else {
        if (weightId.weightId2 !== undefined) {
          breedReturn["weight"] = weight.weight1 + " - " + weightId.weightId2;
        } else {
          breedReturn["weight"] = weight.weight1;
        }
      }
    } else {
      if (
        weight.weight2.length > 0 &&
        weightId.weightId2 !== weight.weight2 &&
        weightId.weightId1 !== undefined
      ) {
        breedReturn["weight"] = weightId.weightId1 + " - " + weight.weight2;
      }
    }
    console.log("breedReturn", breedReturn);
  }
  //---------------------------------rangos---------------------------------------
  const [height, setHeigth] = useState({ height1: "", height2: "" });
  const [weight, setWeigth] = useState({ weight1: "", weight2: "" });
  const [life_span, setLife_span] = useState({ life_spa1: "", life_spa2: "" });
  const handleTemperamentDeseleccionar = (temperament) => {
    if (temperamentLength.tamaño.length === 0) {
      breed.temperaments.map((temperamento) => {
        temperamentLength.tamaño.push(temperamento);
      });
    }
    for (let i = 0; i < breed.temperaments.length; i++) {
      if (breed.temperaments[i].id === temperament.id) {
        breed.temperaments.splice(i, 1);
      }
    }
    console.log("breed", breed, "temperamentLength", temperamentLength);
    dispatch(cargar_temperamentos(breed.temperaments));
  };
  const handleVerificar = (id) => {
    let ban = false;
    if (breed.temperaments) {
      breed.temperaments.map((select) => {
        if (id === select.id) {
          ban = true;
        }
      });
    }
    return ban;
  };
  const handleTemperament = (temperament) => {
    if (temperamentLength.tamaño.length === 0) {
      breed.temperaments.map((temperament) => {
        temperamentLength.tamaño.push(temperament);
      });
    }
    console.log("breed", breed, "temperamentLength", temperamentLength);
    breed.temperaments.push(temperament);
    dispatch(cargar_temperamentos(breed.temperaments));
  };
  const handleInputChangeSearch = (e) => {
    const { value } = e.target;
    dispatch(getTemperamentsByName(value));
  };
  const handleInputChangeheigth = (e) => {
    const { name, value } = e.target;
    setHeigth({
      ...height,
      [name]: value,
    });
    console.log(height);
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBreedMody({
      ...breedMody,
      [name]: value,
    });
  };
  function verificar_entero(h1, h2, w1, w2, ls1, ls2) {
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
  const handleModifyBreed = () => {
    cargar_datos(breedMody, breed);
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
        if (breedMody.name.length > 0 && breedMody.name !== undefined) {
          if (height.height1.length > 0) {
            if (weight.weight1.length > 0) {
              if (life_span.life_span1.length > 0) {
                //dispatch(modifyBreed(breedMody, idBreed));
                // dispatch(cargar_temperamentos([]));
                // navigate("/breeds");
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
      <div className="modify_breeds">
        <h1>Modify Breed</h1>
        <div className="form_modify_breed">
          <div className="inputs_modify">
            <div className="inputs_item">
              <h3 className="input_item_h3">Name:</h3>
              <input
                type="text"
                defaultValue={breed.name ? breed.name : ""}
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Heigth:</h3>
              <input
                type="text"
                defaultValue={
                  breed.height ? breed.height.split("-")[0].trim() : ""
                }
                name="height1"
                onChange={handleInputChangeheigth}
              />
              <h3>-</h3>
              <input
                type="text"
                defaultValue={breed.height ? breed.height.split("-")[1] : ""}
                name="height2"
                onChange={handleInputChangeheigth}
              />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Weigth:</h3>
              <input
                type="text"
                name="weight1"
                defaultValue={
                  breed.weight ? breed.weight.split("-")[0].trim() : ""
                }
                onChange={handleInputChangeweigth}
              />
              <h3>-</h3>
              <input
                type="text"
                name="weight2"
                defaultValue={breed.weight ? breed.weight.split("-")[1] : ""}
                onChange={handleInputChangeweigth}
              />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Life_span:</h3>
              <input
                type="text"
                name="life_span1"
                defaultValue={
                  breed.life_span ? breed.life_span.split(" ")[0] : ""
                }
                onChange={handleInputChangelifespan}
              />
              <h3>-</h3>
              <input
                type="text"
                name="life_span2"
                defaultValue={
                  breed.life_span ? breed.life_span.split(" ")[2] : ""
                }
                onChange={handleInputChangelifespan}
              />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Image:</h3>
              <input
                type="text"
                name="image"
                defaultValue={breed.image ? breed.image : ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="panel_temperaments">
            <div className="inputs_item">
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
                  <React.Fragment key={temperament.id + 1}>
                    {/*-------------------- arreglo_breed--------------------- */}
                    {breed.temperaments &&
                      breed.temperaments.map((select) => {
                        return (
                          <React.Fragment key={select.id + 1}>
                            {select.id === temperament.id && (
                              <div className="label_table_sel">
                                <label
                                  onClick={() => {
                                    handleTemperamentDeseleccionar(temperament);
                                  }}
                                >
                                  {temperament.name}
                                </label>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    {handleVerificar(temperament.id) === false && (
                      <div className="label_table">
                        <label
                          id={temperament.id}
                          onClick={() => {
                            handleTemperament(temperament);
                          }}
                        >
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
          <button onClick={handleModifyBreed}>Modify</button>
        </div>
      </div>
    </div>
  );
};
