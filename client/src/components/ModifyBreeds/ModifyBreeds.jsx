import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  cargar_temperamentos,
  getAllTemperaments,
  getBreedById,
  getTemperamentsByName,
  get_all_breeds,
  messageConfirm,
  modifyBreed,
} from "../../redux/actions";
import Nav from "../Nav/Nav";
import "./ModifyBreeds.css";
export const ModifyBreeds = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idBreed } = useParams();
  useEffect(() => {
    dispatch(getAllTemperaments());
    dispatch(get_all_breeds());
    dispatch(getBreedById(idBreed, undefined));
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
  //---------------------------------rangos---------------------------------------
  //intentar inicializando con undefined
  const [height, setHeigth] = useState({ height1: "", height2: undefined });
  const [weight, setWeigth] = useState({ weight1: "", weight2: undefined });
  const [life_span, setLife_span] = useState({
    life_span1: "",
    life_span2: undefined,
  });
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
    const breedReturn = {};
    //-----------------------temperaments: []-------------------------------
    if (temperamentLength.tamaño.length > 0) {
      if (BreedTemp.temperaments.length > temperamentLength.tamaño.length) {
        breedReturn["temperaments"] = BreedTemp.temperaments.map(
          (temperament) => {
            return temperament.id;
          }
        );
      } else {
        if (
          verificar_temp_eliminados(
            BreedTemp.temperaments,
            temperamentLength.tamaño
          ) === false
        ) {
          breedReturn["temperaments"] = BreedTemp.temperaments.map(
            (temperament) => {
              return temperament.id;
            }
          );
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
      heightId2: BreedTemp.height.split("-")[1].trim(),
    };
    if (heightId.heightId2 === height.height2) {
      height.height2 = undefined;
    }
    if (height.height1.length > 0 && heightId.heightId1 !== height.height1) {
      if (Number.isInteger(height.height1 / 1)) {
        if (height.height2 !== undefined) {
          if (
            height.height2.length > 0 &&
            heightId.heightId2 !== height.height2 &&
            heightId.heightId2 !== undefined
          ) {
            if (Number.isInteger(height.height2 / 1)) {
              breedReturn["height"] = height.height1 + " - " + height.height2;
            } else {
              setLabelError({
                ...labelError,
                label:
                  "El Segundo parametro de la altura no es un numero entero",
              });
              return false;
            }
          } else {
            breedReturn["height"] = height.height1;
          }
        } else {
          breedReturn["height"] = height.height1 + " - " + heightId.heightId2;
        }
      } else {
        setLabelError({
          ...labelError,
          label: "El Primer parametro de la altura no es un numero entero",
        });
        return false;
      }
    } else {
      if (height.height2 !== undefined) {
        if (
          height.height2.length > 0 &&
          heightId.heightId2 !== height.height2 &&
          heightId.heightId1 !== undefined
        ) {
          if (Number.isInteger(height.height2 / 1)) {
            breedReturn["height"] = heightId.heightId1 + " - " + height.height2;
          } else {
            setLabelError({
              ...labelError,
              label: "El Segundo parametro de la altura no es un numero entero",
            });
            return false;
          }
        }
      }
    }
    //-----------------------weigth: ""--------------------------
    const weightId = {
      weightId1: BreedTemp.weight.split("-")[0],
      weightId2: BreedTemp.weight.split("-")[1].trim(),
    };
    if (weightId.weightId2 === weight.weight2) {
      weight.weight2 = undefined;
    }
    if (weight.weight1.length > 0 && weightId.weightId1 !== weight.weight1) {
      if (Number.isInteger(weight.weight1 / 1)) {
        if (weight.weight2 !== undefined) {
          if (
            weight.weight2.length > 0 &&
            weightId.weightId2 !== weight.weight2 &&
            weightId.weightId2 !== undefined
          ) {
            if (Number.isInteger(weight.weight2 / 1)) {
              breedReturn["weight"] = weight.weight1 + " - " + weight.weight2;
            } else {
              setLabelError({
                ...labelError,
                label: "El Segundo parametro de el peso no es un numero entero",
              });
              return false;
            }
          } else {
            breedReturn["weight"] = weight.weight1;
          }
        } else {
          breedReturn["weight"] = weight.weight1 + " - " + weightId.weightId2;
        }
      } else {
        setLabelError({
          ...labelError,
          label: "El Primer parametro de el peso no es un numero entero",
        });
        return false;
      }
    } else {
      if (weight.weight2 !== undefined) {
        if (
          weight.weight2.length > 0 &&
          weightId.weightId2 !== weight.weight2 &&
          weightId.weightId1 !== undefined
        ) {
          if (Number.isInteger(weight.weight2 / 1)) {
            breedReturn["weight"] = weightId.weightId1 + " - " + weight.weight2;
          } else {
            setLabelError({
              ...labelError,
              label: "El Segundo parametro de el peso no es un numero entero",
            });
            return false;
          }
        }
      }
    }
    //-----------------------life_span: ""--------------------------
    const life_spanId = {
      life_spanId1: BreedTemp.life_span.split("-")[0],
      life_spanId2: BreedTemp.life_span
        .split("-")[1]
        .substring(0, BreedTemp.life_span.split("-")[1].length - 5)
        .trim(),
    };
    if (life_spanId.life_spanId2 === life_span.life_span2) {
      life_span.life_span2 = undefined;
    }
    if (
      life_span.life_span1.length > 0 &&
      life_spanId.life_spanId1 !== life_span.life_span1
    ) {
      if (Number.isInteger(life_span.life_span1 / 1)) {
        if (life_span.life_span2 !== undefined) {
          if (
            life_span.life_span2.length > 0 &&
            life_spanId.life_spanId2 !== life_span.life_span2 &&
            life_spanId.life_spanId2 !== undefined
          ) {
            if (Number.isInteger(life_span.life_span2 / 1)) {
              breedReturn["life_span"] =
                life_span.life_span1 + " - " + life_span.life_span2;
            } else {
              setLabelError({
                ...labelError,
                label:
                  "El Segundo parametro de los años de vida no es un numero entero",
              });
              return false;
            }
          } else {
            breedReturn["life_span"] = life_span.life_span1;
          }
        } else {
          breedReturn["life_span"] =
            life_span.life_span1 + " - " + life_spanId.life_spanId2;
        }
      } else {
        setLabelError({
          ...labelError,
          label:
            "El Primer parametro de los años de vida no es un numero entero",
        });
        return false;
      }
    } else {
      if (life_span.life_span2 !== undefined) {
        if (
          life_span.life_span2.length > 0 &&
          life_spanId.life_spanId2 !== life_span.life_span2 &&
          life_spanId.life_spanId1 !== undefined
        ) {
          if (Number.isInteger(life_span.life_span2 / 1)) {
            breedReturn["life_span"] =
              life_spanId.life_spanId1 + " - " + life_span.life_span2;
          } else {
            setLabelError({
              ...labelError,
              label:
                "El Segundo parametro de los años de vida no es un numero entero",
            });
            return false;
          }
        }
      }
    }
    if (
      breedReturn.name ||
      breedReturn.height ||
      breedReturn.weight ||
      breedReturn.life_span ||
      breedReturn.image ||
      breedReturn.temperaments
    ) {
      dispatch(modifyBreed(breedReturn, idBreed));
      return true;
    } else {
      setLabelError({
        ...labelError,
        label: "Debe Modificar almenos Un dato para continuar con el proceso",
      });
      return false;
    }
    //return breedReturn
  }
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
  const handleModifyBreed = () => {
    if (cargar_datos(breedMody, breed)) {
      dispatch(messageConfirm("Datos Modificados Exitosamente"));
      navigate("/breed");
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
              <div className="form_text">
                <input
                  type="text"
                  required="required"
                  defaultValue={breed.name ? breed.name : ""}
                  name="name"
                  onChange={handleInputChange}
                />
                <span>Nombre</span>
              </div>
              {/* <h3 className="input_item_h3">Name:</h3>
              <input
                type="text"
                defaultValue={breed.name ? breed.name : ""}
                name="name"
                onChange={handleInputChange}
              /> */}
            </div>
            <div className="inputs_item">
              <div className="form_text">
                <input
                  type="text"
                  required="required"
                  defaultValue={
                    breed.height ? breed.height.split("-")[0].trim() : ""
                  }
                  name="height1"
                  onChange={handleInputChangeheigth}
                />
                <span>Heigth</span>
              </div>
              <h3>-</h3>
              <div className="form_text">
                <input
                  type="text"
                  required="required"
                  defaultValue={breed.height ? breed.height.split("-")[1] : ""}
                  name="height2"
                  onChange={handleInputChangeheigth}
                />
                <span>Heigth</span>
              </div>
            </div>
            <div className="inputs_item">
              <div className="form_text">
                <input
                  type="text"
                  required="required"
                  name="weight1"
                  defaultValue={
                    breed.weight ? breed.weight.split("-")[0].trim() : ""
                  }
                  onChange={handleInputChangeweigth}
                />
                <span>Weigth</span>
              </div>
              <h3>-</h3>
              <div className="form_text">
                <input
                  type="text"
                  required="required"
                  name="weight2"
                  defaultValue={breed.weight ? breed.weight.split("-")[1] : ""}
                  onChange={handleInputChangeweigth}
                />
                <span>Weigth</span>
              </div>
            </div>
            <div className="inputs_item">
              <div className="form_text">
                <input
                  type="text"
                  required="required"
                  name="life_span1"
                  defaultValue={
                    breed.life_span ? breed.life_span.split(" ")[0] : ""
                  }
                  onChange={handleInputChangelifespan}
                />
                <span>Life_span</span>
              </div>
              <h3>-</h3>
              <div className="form_text">
                <input
                  type="text"
                  required="required"
                  name="life_span2"
                  defaultValue={
                    breed.life_span ? breed.life_span.split(" ")[2] : ""
                  }
                  onChange={handleInputChangelifespan}
                />
                <span>Life_span</span>
              </div>
            </div>
            <div className="inputs_item">
              <div className="form_text">
                <input
                  type="text"
                  required="required"
                  name="image"
                  defaultValue={breed.image ? breed.image : ""}
                  onChange={handleInputChange}
                />
                <span>Image Url</span>
              </div>
            </div>
          </div>
          <div className="panel_temperaments">
            <div className="inputs_item">
              <div className="form_text">
                <input
                  type="text"
                  required="required"
                  name="name"
                  onChange={handleInputChangeSearch}
                />
                <span>Temperament</span>
              </div>
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
          <button
            onClick={() => {
              navigate(`/breeds`);
            }}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};
