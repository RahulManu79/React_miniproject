import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { showLoding,hideLoading } from '../redux/alertsSlice';
import 'semantic-ui-css/semantic.min.css'
import { useForm } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';
import './register.css'


function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async(data) => {
    console.log(data);
    
    try {
      dispatch(showLoding())
      
      const response = await axios.post('http://localhost:3001/api/user/register',data)
      dispatch(hideLoading())
      
      if(response.data.success){
        toast.success(response.data.message)
        toast("redirecting to login page")
        navigate("/login")


      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      toast.error("something went wrong")
    }
  }
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Nice to Meet You</h1>
        <Form className='form' onSubmit={handleSubmit(onSubmit)} >     
               <Form.Field>
              <input label='Name' name='name' placeholder= 'UserName' type='text' {...register("name", { required: true, maxLength: 10 })}/>
            </Form.Field>
            {errors.name && <p>Please check the First Name</p>}
            <Form.Field >
              <input label='Email' name='email' type='email' placeholder= 'Email' {...register("email", { required: true, maxLength: 20 })}/>
            </Form.Field>
            <Form.Field >
              <input label='Password' name='password' type='password' placeholder= 'Password' {...register("password", { required: true, maxLength: 10 })}/>
            </Form.Field>

            <Button className= 'primary-button my-2' type='submit'> Register</Button>

            <Link to='/login' className='anchor mt-2'>CLICK HERE TO LOGIN</Link>

          </Form>


      </div>
    </div>
  );
}

export default Register;
