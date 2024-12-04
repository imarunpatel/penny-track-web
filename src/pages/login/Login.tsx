import { useGoogleLogin } from "@react-oauth/google";
import HomeImage from "../../assets/images/penny-track-success.svg";
import { AuthAPI } from "../../apis/authAPI";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useState } from "react";
import GoogleLogo from "../../assets/icons/google-icon.png";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    googleLogin();
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      getToken(codeResponse.access_token);
    },
    onError: () => console.error,
  });

  const getToken = async (token: string) => {
    try {
      const response = await AuthAPI.login(token);
      if (response.success) {
        localStorage.setItem("data", JSON.stringify(response.data));
        setLoading(false);
        navigate("/home");
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-violet-50 flex flex-col  items-center">
        <div className="w-full flex-1 flex">
          <div className="flex-1 w-full flex flex-col">
            {/* Left */}
            {/* Top */}
            <header className="px-4 md:px-14 flex items-center gap-2 h-11">
              <img src={Logo} alt="Logo" width={30} className="rounded" />
              <div>Penny Track</div>
            </header>

            {/* Bottom */}
            <div className="flex-1 flex justify-center items-center">
              <div className="flex-1 flex flex-col gap-8 justify-center items-center rounded-lg p-6 max-w-lg">
                <h1 className="mb-8 font-thin text-2xl">
                  Welcome to Penny Track 🤑
                </h1>
                {/* <h2>Login</h2> */}

                <button
                  className="w-72 bg-gray-200 flex gap-3 items-center border text-gray-900 rounded-3xl py-2 px-11"
                  onClick={login}
                >
                  <img src={GoogleLogo} width={20} alt="" />
                  <div className="w-full">
                    {loading ? (
                      <div>Please wait...</div>
                    ) : (
                      <div>Sign in with Google</div>
                    )}
                  </div>
                </button>

                <p className="text-xs text-center">
                  By registration you agree to{" "}
                  <span className="text-blue-400">Terms of Use</span> and{" "}
                  <span className="text-blue-400">Privacy Policy</span>
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:block flex-1 bg-gray-100 p-8">
            {/* Rigth */}
            <div className="flex justify-center items-center h-full w-full">
              <img src={HomeImage} alt="Nice" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
