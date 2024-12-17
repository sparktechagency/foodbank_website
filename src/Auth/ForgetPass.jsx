
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../assets/header/logo.png"
const ForgetPass = () => {
  // const axiosUrl = UseAxios();
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center  md:pt-0 px-4 justify-center ">
      <div className="  w-full max-w-[1500px] m-auto">
        <div className=" gap-5">
          <div className="md:flex md:justify-center">
            <div className="bg-white md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4"><img src={Logo} alt="Logo" /></div>
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                Forget Password
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-8">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-2 border bg-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Link to={'/verify'}><button
                  type="submit"
                  className="w-full py-2 bg-[#234E6F] text-white rounded  focus:ring-2 focus:ring-gray-500"
                >
                  Submit
                </button></Link>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
