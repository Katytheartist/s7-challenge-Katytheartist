import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'


// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.

const formSchema = yup.object().shape({
  fullName: yup.string().trim()
    .min(3, validationErrors.fullNameTooShort).max(20, validationErrors.fullNameTooLong),
  size: yup.string()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect),
 // toppings: yup.string()
})


// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]


const getInitialValues=()=>({
  size: '',
  fullName: '',
  toppings: [],
})

const getInitialErrors=()=>({
  size: '',
  fullName:'',
  //toppings: '',
})

export default function Form() {

  const [values, setValues] = useState(getInitialValues())
  const [errors, setErrors] = useState(getInitialErrors())
  const [serverSuccess, setServerSuccess] = useState('')
  const [serverFailure, setServerFailure] = useState('')
  const [formEnabled, setFormEnabled] = useState(false)

   useEffect(()=>{
    formSchema.isValid(values).then(isValid => setFormEnabled(isValid))
  }, [values.fullName, values.size])

  const handleChange = evt =>{
    // let {id, name, value, checked, type} = evt.target
    // value = type == 'checkbox' ? name : value
    // if (checked) { setValues({...values, toppings: [...values.toppings, name]})}
    //  setValues({...values, [id]: value})
 
    // const target = evt.target
    // const value = target.type === 'checkbox' ? target.checked : target.value
    // const name = target.name
    // setValues({...values, [name]: value})

    const {id, value}= evt.target
    setValues({...values, [id]: value})
    //debugger
    console.log(evt.target)
    yup.reach(formSchema, id).validate(value)
    .then(()=>setErrors({...errors, [id]: ''}))
    .catch((err)=>setErrors({...errors, [id]: err.errors[0]}))
  }

  const handleCheckboxChange = evt =>{
    const {name, checked} = evt.target
    setValues({...values, toppings: checked ? [...values.toppings, name] : values.toppings.filter((topping)=>topping !== name)})
    console.log(evt.target)
    yup.reach(formSchema, name).validate(checked)
    .then(()=>setErrors({...errors, [name]: ''}))
    .catch((err)=>setErrors({...errors, [name]: err.errors[0]}))
  }



  const handleSubmit = evt =>{
    evt.preventDefault()
    console.log('Sending data to server...', values)
    axios.post('http://localhost:9009/api/order', values)
    .then(res=>{
      console.log(res)
    
      setServerSuccess(res.data.message)
      setValues(getInitialValues())
      setServerFailure()
    }).catch(err=>{
      //debugger
      setServerFailure(err.response.data.message)
      setServerSuccess()
    })
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {serverSuccess && <div className='success'>{serverSuccess}</div>}
      {serverFailure && <div className='failure'>{serverFailure}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input value ={values.fullName} onChange={handleChange} 
          placeholder="Type full name" 
          id="fullName" 
          type="text"
          //name='fullName' 
          />
        </div>
        {errors.fullName && <div className='error'>{errors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
          //name='size'
          value ={values.size} 
          onChange={handleChange} 
          id="size"
          >
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {errors.size && <div className='error'>{errors.size}</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */
        toppings.map((topping, topping_id)=> (
          <label key={topping_id}>
          <input
            name={topping.topping_id}
            type="checkbox"
            checked={values.toppings.topping_id}
            onChange={handleCheckboxChange}
            //value={topping.name}
          />
          {topping.text}<br />
        </label>
        ))
        }
      
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" disabled ={!formEnabled}/>
    </form>
  )
}
