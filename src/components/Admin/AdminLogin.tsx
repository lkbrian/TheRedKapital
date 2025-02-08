import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import "./Admin.css";
import { auth } from "../../firebaseConfig";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/admin/dashboard", { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.log(error.message);
      } else {
        setError("Unknown error ocurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 gap-5">
      <img src="../../../images/logo.png" className="h-[125px]" alt="Logo" />
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#7d0800] mb-6 text-center">
          Admin Chat Login
        </h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={login} className="form space-y-4 shadow-none">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f7191c] focus:border-[#f7191c] outline-none transition-all"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f7191c] focus:border-[#f7191c] outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-[#f7191d] hover:bg-[#f7191c] text-white font-medium py-2.5 rounded-lg transition-colors">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
// value={email}
// onChange={(e) => setEmail(e.target.value)}
