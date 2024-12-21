import React, { useState } from "react";
import toast from "react-hot-toast";
import { apiBaseUrl } from "../apis/setting";
import Loader from "../utils/Loader";
import { GrUserWorker } from "react-icons/gr";
import { jwtDecode } from "jwt-decode";

function DriverRegistration() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "Password123!",
    companyId: "",
    cnicNumber: "",
    phoneNumber: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const response = await fetch(`${apiBaseUrl}/admin/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          role: "driver",
          email: formData.email,
          password: formData.password,
          companyId: decodedToken?.sub,
          dob: formData.dob,
          cnicNumber: formData.cnicNumber,
          phoneNumber: formData.phoneNumber,
          company: null,
        }),
      });

      console.log(response);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`${data.message}`);
      }

      toast.success("Driver registered successfully!");
      setFormData({
        name: "",
        email: "",
        password: "Password123!",
        companyId: "",
        cnicNumber: "",
        phoneNumber: "",
        dob: "",
      });
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center m-3 w-2/4">
      <form
        onSubmit={handleSubmit}
        className="border-primary border-solid border-2 w-full rounded-lg h-fit m-3 px-4 lg:px-10 py-3 bg-main"
      >
        <h2 className="text-xl italic font-bold text-center mb-0.5">
          Driver Registration Form
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-1 flex flex-col">
          <label htmlFor="dob" className="font-bold text-lg">
            Date of Birth
          </label>
          <input
            type="date"
            max="2004-01-01"
            className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-1 flex flex-col">
          <label htmlFor="cnic-number" className="font-bold text-lg">
            CNIC Number
          </label>
          <input
            type="tel"
            className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
            name="cnicNumber"
            id="cnic-number"
            placeholder="CNIC Number"
            value={formData.cnicNumber}
            onChange={handleChange}
            maxLength={13}
            pattern="[0-9]{13}"
            required
          />
        </div>

        <div className="mb-1 flex flex-col">
          <label htmlFor="phone-number" className="font-bold text-lg">
            Phone Number
          </label>
          <input
            type="tel" 
            className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
            name="phoneNumber"
            id="phone-number"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            maxLength={11}
            pattern="[0-9]{11}"
            required
          />
        </div>

        <div>
          <div className="bg-primary my-2 border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full">
            <button
              className="text-main text-lg w-full flex justify-center items-center gap-2"
              type="submit"
            >
              Register Driver <GrUserWorker />
            </button>
          </div>
        </div>

        {loading && <Loader />}
      </form>
    </div>
  );
}

export default DriverRegistration;