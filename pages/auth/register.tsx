import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";
import { firebaseAuthErrorMessages } from "@/utils/maps";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      router.push("/"); // Redirect after registration
    } catch (err: any) {
      const friendlyMessage =
        firebaseAuthErrorMessages[err.code] || "Registration failed. Please try again.";
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>    
      <Head>
        <title>Register</title>
      </Head>
      <div className="row w-100 m-0 vh-100">
        <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
          <div className="card col-lg-4 mx-auto">
            <div className="card-body px-5 py-5">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <a href="#" className="">
                  <img src="/assets/images/logo.png" alt="logo" width="160" />
                </a>
                <h3>Register</h3>
              </div>

              {error && <h6 className="text-danger mt-3 mb-3">{error}</h6>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email*</label>
                  <input
                    type="email"
                    className="form-control p_input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password*</label>
                  <input
                    type="password"
                    className="form-control p_input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password*</label>
                  <input
                    type="password"
                    className="form-control p_input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block enter-btn"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
