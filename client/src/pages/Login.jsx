import React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoding } from "../redux/alertsSlice";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      dispatch(showLoding());
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        data
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast("redirecting to home page");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome Back</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <input
              label="Email"
              name="email"
              placeholder="Email"
              {...register("email", { required: true, maxLength: 20 })}
            />
          </Form.Field>
          {errors.email && <p>Please check the Email</p>}

          <Form.Field>
            <input
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", { required: true, maxLength: 20 })}
            />
          </Form.Field>
          {errors.password && <p>Please check the Password</p>}

          <Button className="primary-button my-2" htmlType="submit">
            {" "}
            Login
          </Button>

          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO Register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
