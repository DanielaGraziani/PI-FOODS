import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postRecipe, getTypesOfDiets } from "../actions";
import { Link } from "react-router-dom";
import s from '../styles/CreateForm.module.css'


const validateForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!form.title.trim()){
   errors.title = "This field is required";
  }  

   if (typeof form.title.trim() !== "undefined") {
    if (!regexName.test(form.title.trim())) {
      errors.title = "This fild only accept letters";
    }
  }

   if (!form.summary.trim()) {
  errors.summary = "This fields is required";
  } 

  if (typeof form.summary.trim() !== "undefined") {
    if (!regexName.test(form.summary.trim())) {
      errors.summary = "This fild only accept letters";
    }
  }

  if (!form.healthScore) {
    errors.healthScore = "This fild is required";
  }

  if (parseInt(form.healthScore) < 1 || parseInt(form.healthScore) > 100){
    errors.healthScore = "The score must be greater than 0 and less than 100";
  }

  if (!form.steps.length) {
    errors.steps = "This fild is required";
  }

  if (!form.diets) {
    errors.diets = "This fild is required";
  }

  if(!form.diets.length){
    errors.diet = 'This field is required'
} 


  return errors;
};





export default function CreateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const diets = useSelector((state) => state.diets);
  const [errorsForm, setErrorsForm] = useState({
      diets: 'this fild is required'
  }); 

  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: [],
  });
  
  useEffect(() => {
    dispatch(getTypesOfDiets());
  }, [dispatch]);
 



  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrorsForm(
      validateForm({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };


  const handleSelectRecipes = (e) => {
    if(!form.diets.includes(e.target.value))
    setForm({
      ...form,
      diets: [...new Set([...form.diets, e.target.value])],
    });
    setErrorsForm(
      validateForm({
        ...form,
        diets: [...form.diets, e.target.value],
      })
    );
  };

  const handleDelete = (e) => {
    setForm({
      ...form,
      diets: form.diets.filter((el) => el !== e),
    });
    setErrorsForm(
      validateForm({
        ...form,
        diets: form.diets.filter((el) => el !== e),
      })
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    //si hay errores no enviar
    if (Object.keys(errorsForm).length !== 0 ) {
      alert("The recipe cannot be created with the supplied data ");
    } else {
      e.preventDefault();
      dispatch(postRecipe(form));
      alert("Your recipe has been created succesfully");
      navigate("/recipes");
      setForm({
        title: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: [],
      });
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p>Create your own recipe</p>
        </div>

        <div>
          <p>Title</p>
          <input
            type="text"
            name="title"
            value={form.title}
            // onBlur={handleBlur}
            className={s.title}
            onChange={(e) => handleChange(e)}
          />

          {errorsForm.title ? <h6>{errorsForm.title}</h6> : false}
        </div>

        <div>
          <p>Summary</p>
          <input
            type="text"
            name="summary"
            value={form.summary}
            // onBlur={handleBlur}
            onChange={(e) => handleChange(e)}
          />
          {errorsForm.summary ? <h6>{errorsForm.summary}</h6> : false}
        </div>

        <div>
          <label>Score</label>
          <input
            type="range"
            name="healthScore"
            min={1}
			max={100}
            value={form.healthScore}
            onChange={(e) => handleChange(e)}
          />
          {errorsForm.healthScore ? <h6>{errorsForm.healthScore}</h6> : false}
        </div>

        <div>
          <p>Step by step</p>
          <textarea
            type="text"
            name="steps"
            value={form.steps}
            cols='30'
            rows='10'
            // onBlur={handleBlur}
            onChange={(e) => handleChange(e)}
          />
          {errorsForm.steps ? <h6>{errorsForm.steps}</h6> : false}
        </div>

        <div>
          <span>Type of Diet:</span>

          <select onChange={(e) => handleSelectRecipes(e)} defaultValue='default'>
          <option value="default" disabled >Diets</option>
            {diets && diets.map((d) => ( 
              <option 
              key={d.id} 
              value={d.name} >
                {d.name}
              </option>
            ))}
          </select>

          {errorsForm.diets ? <h6>{errorsForm.diets}</h6> : false}
        </div>

        <div>
          {form.diets.map((diet) => (
            <div>
              <input
                key={diet}
                type="button"
                value="X"
                className={s.diets}
                // onBlur={handleBlur}
                onClick={() => handleDelete(diet)}
              />
              <p>{diet}</p>
            </div>
          ))}
          {/* {errorsForm.diets ? <h6>{errorsForm.diets}</h6> : false} */}
        </div>

        <div>
          <button type="submit" name="submit"  disabled={Object.keys(errorsForm).length === 0 ? false : true}  >Send</button>
        </div>
      </form>

      <Link to='/recipes'>
                        <button>Go Back</button>
                    </Link>
    </div>
  );
}
