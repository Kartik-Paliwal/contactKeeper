import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
const Singup = () => {
  let history = useNavigate();
  const host = "http://localhost:5000";
  const [details, setdetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
   const handleSubmit = async(e) => {
    e.preventDefault();
    if(details.password===details.confirmPassword){
    const { name, password, email } = details;
    const response = await fetch(`${host}/api/a/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    const json = await response.json();
    if(json.success){
    history("/login");
    console.log("created user")
    // showAlert("Successfully created user","success")
  }
  else{
    console.log("email already in use")
    // showAlert("email already in use","danger")
  }
}else{
    console.log("password  didnot match")
    // showAlert("Password didnt matched","danger")
  }
   }
   const onChange = (e) => {
    console.log(details);
    setdetails({ ...details, [e.target.name]: e.target.value });
    console.log(details)
   }
  return (
    <div className="Container mt-3">
      <h2>SignUp</h2>
      <form
      onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            value={details.name}
            onChange={onChange}
            required
            minLength={3}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={details.email}
            onChange={onChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={details.password}
            onChange={onChange}
            minLength={8}
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            confirm Password
          </label>
          <input
            type="Password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={details.confirmPassword}
            onChange={onChange}
            minLength={8}
            required
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Singup;
