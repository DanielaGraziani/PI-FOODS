import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postRecipe, getTypesOfDiets } from "../actions";

export default function CreateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const diets = useSelector((state) => state.diets);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: [],
  });

  const [errorsForm, setErrorsForm] = useState({});

  const validateForm = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (!form.title.trim()) errors.title = "This field is required";

    if (typeof form.title.trim() !== "undefined") {
      if (!regexName.test(form.title.trim())) {
        errors.title = "This fild only accept letters";
      }
    }

    if (!form.summary.trim()) errors.summary = "This fields is required";

    if (typeof form.summary.trim() !== "undefined") {
      if (!regexName.test(form.summary.trim())) {
        errors.summary = "This fild only accept letters";
      }
    }

    if (!form.healthScore) errors.healthScore = "This fild is required";
    if (parseInt(form.healthScore) < 1 || parseInt(form.healthScore) > 100)
      errors.healthScore = "The score must be greater than 0 and less than 100";

    if (!form.steps) errors.steps = "This fild is required";

    if (!form.diets) errors.diets = "This fild is required";
    if (form.diets.length < 2) errors.diets = "Choose two or more options";

    return errors;
  };

  const handleBlur=(e)=>{
      handleChange(e)
      setErrorsForm(validateForm(form))
  }

  const handleChange = (e)=>{
      setForm({
          ...form,
          [e.target.name] : e.target.value
      })
  }


  const handleSelectRecipes=(e) =>{
    setForm({
        ...form,
        diets: [...new Set([...form.diets, e.target.value])]
    })
  }

  const handleDelete=(e)=>{
    setForm({
        ...form,
        diets: form.diets.filter((el)=> el !== e)
    })
  }

  useEffect(()=>{
      dispatch(getTypesOfDiets())
  }, [dispatch])


  const handleSubmit=(e)=>{
      if(Object.keys(errorsForm).length !== 0){
          e.preventDefault()
          alert('The recipe cannot be created with the supplied data ')
      }else{
          e.preventDefault()
          dispatch(postRecipe(form))
          alert('Your recipe has been created succesfully')
          navigate('/recipes')

          setForm({
              title: "",
              summary: "",
              healthScore: "",
              steps: "",
              diets: []
          })
      }
  }




  return (
    <div>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <div>
          <p>Create your own recipe</p>
        </div>

        <div>
          <p>Title</p>
          <input
            type="text"
            name="title"
            placeholder="recipe name"
            value={form.title}
            onBlur={handleBlur}
            onChange={(e)=> handleChange(e)}
          />
        
        {errorsForm.title ? <h6>{errorsForm.title}</h6> : false}

        </div>

        <div>
        <p>Summary</p>
        <input
          type="text"
          name="summary"
          placeholder="recipe name"
          value={form.summary}
          onBlur={handleBlur}
          onChange={(e)=> handleChange(e)}
        />
        {errorsForm.summary ? <h6>{errorsForm.summary}</h6> : false}
        </div>

        <div>
          <label>Score</label>
          <input
            type="number"
            name="healthScore"
            placeholder="score"
            value={form.healthScore}
            onChange={(e)=> handleChange(e)}
          />
        {errorsForm.healthScore ? <h6>{errorsForm.healthScore}</h6> : false}
        </div>

        <div>
          <p>Step by step</p>
          <textarea
            type="text"
            name="steps"
            placeholder="recipe name"
            value={form.steps}
            onBlur={handleBlur}
            onChange={(e)=> handleChange(e)}
          />
        {errorsForm.steps ? <h6>{errorsForm.steps}</h6> : false}
        </div>

        <div>
          <span>Type of Diet:</span>
             
          <select  onBlur={handleBlur} onChange={(e)=> handleSelectRecipes(e)}>
            {diets.map((d) => (
              <option value={d.name} key={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          {form.diets.map((d, i) => (
            <ul className="d" key={i}>
              <li>{d}</li>
              <button className="delete" onClick={(e) => handleDelete(e, d)}>
                x
              </button>
            </ul>
          ))}
         {errorsForm.diets ? <h6>{errorsForm.diets}</h6> : false}
        </div>

        <div>
            <button type="submit">
              Send
            </button>
          </div>   

      </form>
    </div>
  );
}
