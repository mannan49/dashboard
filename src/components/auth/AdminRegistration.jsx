import { FaBus } from "react-icons/fa";

function AdminRegistration() {
  return (
    <div className="flex justify-center m-3 w-2/4">
      <form className="border-primary border-solid border-2 w-full rounded-lg h-fit m-3 px-4 lg:px-10 py-5 bg-main">
        <div className="flex items-center justify-center">
          <FaBus className="text-2xl text-primary mr-2" />
          <span className="text-primary text-2xl text-center font-bold mb-0.5">
            Manzil
          </span>
        </div>
        <h2 className="text-xl italic font-bold text-center mb-0.5">
          Journey Bright, Day or Night
        </h2>

        <div className="mb-1 flex flex-col">
          <label htmlFor="full-name" className="font-bold text-lg">
            Full Name :
          </label>
          <input
            type="text"
            placeholder="Full Name"
            id="full-name"
            className="border-ternary_light w-full border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
            name="full-name"
          />
        </div>
        <div className="mb-1 flex flex-col">
          <label htmlFor="full-name" className="font-bold text-lg">
            Role:
          </label>
          <select className="border-ternary_light w-full border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none" id="options" name="options">
            <option className="border-ternary_light w-full border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none" value="option1">Admin</option>
            <option className="border-ternary_light w-full border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none" value="option2">User</option>
          </select>
          {/* <input
              type="text"
              placeholder="Full Name"
              id="full-name"
              className="border-ternary_light w-full border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              name="full-name"
            /> */}
        </div>

        <div className="mb-1 flex flex-col">
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

        <div className="mb-1 flex flex-col">
          <label htmlFor="password" className="font-bold text-lg">
            Password :
          </label>
          <input
            className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="mb-1 flex flex-col">
          <label htmlFor="confirm-password" className="font-bold text-lg">
            Confirm Password :
          </label>
          <input
            className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm Password"
          />
        </div>
        <div className="mb-1 flex flex-col">
          <label htmlFor="confirm-password" className="font-bold text-lg">
            Company Name :
          </label>
          <input
            className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
            name="Company Name"
            id="company-name"
            placeholder="Company Name"
          />
        </div>
        <div className="mb-1 flex flex-col">
          <label htmlFor="confirm-password" className="font-bold text-lg">
            Phone Number:
          </label>
          <input
            className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
            name="phone_number"
            id="phone_number"
            placeholder="Phone Number"
          />
        </div>
        <div className="mb-1 flex flex-col">
          <label htmlFor="confirm-password" className="font-bold text-lg">
            Adress :
          </label>
          <input
            className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
            name="adress"
            id="adress"
            placeholder="Adress"
          />
        </div>

        <div>
          <div className="bg-primary my-2 border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full">
            <button className="text-main text-lg w-full" type="submit">
              Register User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminRegistration;
