import { FaBus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";


function Login() {
  return (
    <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden h-screen bg-[url(https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGlnaHQlMjBuYXR1cmV8ZW58MHx8MHx8fDA%3D)] lg:bg-none bg-main">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1543859184-17ac017dde53?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover w-full h-full"
          alt="manzil"
        />
      </div>

      <div className="flex justify-center max-h-screen ">
        <form
          className="border-primary border-solid border-2 rounded-lg h-fit my-auto p-5 w-full lg:w-2/3"
        >
          <div className="flex items-center justify-center">
            <FaBus className="text-3xl text-primary mr-2" />
            <span className="text-primary text-3xl text-center font-bold mb-0.5">
              Manzil
            </span>
          </div>
          <h2 className="text-xl italic font-bold text-center mb-0.5">
          Journey Bright, Day or Night
          </h2>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="font-bold text-lg">
              Email :
            </label>
            <input
              className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter Your E-mail"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className="font-bold text-lg">
              Password :
            </label>
            <input
              className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter Your Password"
            />
          </div>

          <div className="mb-1">
            <div className="bg-primary border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full">
              <button className="text-main text-xl w-full" type="submit">
                Log In
              </button>
            </div>
          </div>
          <h1 className="italic">Don't have an account yet, then :-</h1>
          <div className="bg-primary border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full">
              <button className="text-main text-xl w-full" type="submit">
              <NavLink to="/signup">
                 Create Account
              </NavLink>
              </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
