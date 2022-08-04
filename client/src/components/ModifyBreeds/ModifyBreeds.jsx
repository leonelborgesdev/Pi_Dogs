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
  useEffect(async () => {
    await dispatch(getAllTemperaments());
  }, [dispatch]);
  useEffect(async () => {
    await dispatch(get_all_breeds());
  }, [dispatch]);
  useEffect(async () => {
    console.log(idBreed);
    await dispatch(getBreedById(idBreed));
  }, [dispatch]);
  const { temperaments_search, breed } = useSelector((state) => state);
  const [labelError, setLabelError] = useState({ label: "" });
  // const [breedMody, setBreedMody] = useState(cargar_datos(breed));
  const [breedMody, setBreedMody] = useState({
    id: "",
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  function cargar_datos(breedId) {
    return {
      id: breedId.id,
      name: breedId.name,
      height: breedId.height,
      weight: breedId.weight,
      life_span: breedId.life_span,
      image: breedId.image,
      temperaments: breedId.temperaments
        ? breedId.temperaments.map((temperament) => {
            return temperament.id;
          })
        : [],
    };
  }
  function cargar_datos_breedMody(name, value) {
    console.log(name, value);

    if (name === "height") {
      breedMody.height = value;
    }
    if (name === "weight") {
      breedMody.weight = value;
    }
    if (name === "life_span") {
      breedMody.life_span = value;
    }
  }
  const InicialStateHeight = (Idbreed) => {
    if (Idbreed.height && Idbreed.height !== undefined) {
      const vec = Idbreed.height.split("-");
      return { height1: vec[0], height2: vec[1] };
    } else {
      return { height1: 0, height2: 0 };
    }
  };
  const [height, setHeigth] = useState(InicialStateHeight(breedMody));
  const InicialStateWeight = (Idbreed) => {
    if (Idbreed.weight && Idbreed.weight !== undefined) {
      const vec = Idbreed.weight.split("-");
      return { weight1: vec[0], weight2: vec[1] };
    } else {
      return { weight1: 0, weight2: 0 };
    }
  };
  const [weight, setWeigth] = useState(InicialStateWeight(breedMody));
  const InicialStateLifeSpan = (Idbreed) => {
    if (Idbreed.life_span && Idbreed.life_span !== undefined) {
      const vec = Idbreed.life_span.split(" ");
      return { life_span1: vec[0], life_span2: vec[2] };
    } else {
      return { life_span1: 0, life_span2: 0 };
    }
  };
  const [life_span, setLife_span] = useState(InicialStateLifeSpan(breedMody));
  const handleTemperamentDeseleccionar = (e) => {
    const { id } = e.target;
    for (let i = 0; i < breedMody.temperaments.length; i++) {
      if (breedMody.temperaments[i] === id) {
        breedMody.temperaments.splice(i, 1);
      }
    }
    dispatch(cargar_temperamentos(breedMody.temperaments));
  };
  const handleTemperamentModyDeseleccionar = (e) => {
    const { id } = e.target;
    for (let i = 0; i < breed.temperaments.length; i++) {
      console.log("idbreed:", breed.temperaments[i].id);
      if (breed.temperaments[i].id === id) {
        breed.temperaments.splice(i, 1);
      }
    }
    dispatch(cargar_temperamentos(breedMody.temperaments));
  };
  const handleVerificar = (id) => {
    let ban = false;
    if (breedMody.temperaments.length > 0) {
      breedMody.temperaments.map((select) => {
        if (id === select) {
          ban = true;
        }
      });
    }
    return ban;
  };
  const handleTemperament = (e) => {
    const { id, value } = e.target;
    console.log("objeto name", value);
    breedMody.temperaments.push(id);
    dispatch(cargar_temperamentos(breedMody.temperaments));
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
  const handleModifyBreed = () => {
    cargar_datos_breedMody("height", height.height1 + " - " + height.height2);
    cargar_datos_breedMody("weight", weight.weight1 + " - " + weight.weight2);
    cargar_datos_breedMody(
      "life_span",
      life_span.life_span1 + " - " + life_span.life_span2 + " years"
    );
    console.log(breedMody, breed);
    if (breedMody.temperaments.length > 0) {
      if (breedMody.name.length > 0 && breedMody.name !== undefined) {
        if (height.height1.length > 0 && height.height2.length > 0) {
          if (weight.weight1.length > 0 && weight.weight2.length > 0) {
            if (
              life_span.life_span1.length > 0 &&
              life_span.life_span2.length > 0
            ) {
              //dispatch(modifyBreed(breedMody));
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
                defaultValue={breed.height ? breed.height.split("-")[0] : ""}
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
                name="weigth1"
                defaultValue={breed.weight ? breed.weight.split("-")[0] : ""}
                onChange={handleInputChangeweigth}
              />
              <h3>-</h3>
              <input
                type="text"
                name="weigth2"
                defaultValue={breed.weight ? breed.weight.split("-")[1] : ""}
                onChange={handleInputChangeweigth}
              />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Life_span:</h3>
              <input
                type="text"
                name="life_span1"
                defaultValue={`${life_span.life_span1}`}
                onChange={handleInputChangelifespan}
              />
              <h3>-</h3>
              <input
                type="text"
                name="life_span2"
                defaultValue={`${life_span.life_span2}`}
                onChange={handleInputChangelifespan}
              />
            </div>
            <div className="inputs_item">
              <h3 className="input_item_h3">Url Image:</h3>
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
                                  id={temperament.id}
                                  onClick={handleTemperamentModyDeseleccionar}
                                >
                                  {temperament.name}
                                </label>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    {/*-------------------- arreglo_breedMody--------------------- */}
                    {breedMody.temperaments &&
                      breedMody.temperaments.map((select) => {
                        return (
                          <React.Fragment key={select + 1}>
                            {select === temperament.id && (
                              <div className="label_table_sel">
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
                      <div className="label_table">
                        <label
                          id={temperament.id}
                          value={temperament}
                          onClick={handleTemperament}
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
