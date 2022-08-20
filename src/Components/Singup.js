import React ,{useContext,useEffect} from "react";
import ContactContext from "../Context/contact/Contactcontext";

const Singup = () => {
  const context = useContext(ContactContext);
  const { getContact} = context;
  useEffect(() => {
    getContact()
    //eslint-disable-next-line
  }, [])
  
  return (
    <div className="Container mt-3">
      <h2>SignUp</h2>
      <form
      // onSubmit={handleSubmit}
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
            // value={details.name}
            // onChange={onChange}
            required
            minLength={3}
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
            // value={details.email}
            // onChange={onChange}
            required
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
            // value={details.password}
            // onChange={onChange}
            minLength={8}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ConfirmPassword" className="form-label">
            confirm Password
          </label>
          <input
            type="Password"
            className="form-control"
            id="ConfirmPassword"
            name="ConfirmPassword"
            // value={details.ConfirmPassword}
            // onChange={onChange}
            minLength={8}
            required
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
