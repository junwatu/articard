import { useState } from "react";

export default function User() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userEncoded = encodeURIComponent("username");
    const passEncoded = encodeURIComponent("password");
    const usernameEncoded = encodeURIComponent(email);
    const passwordEncoded = encodeURIComponent(password);

    const formBody = [];
    formBody.push(`${userEncoded}=${usernameEncoded}`);
    formBody.push(`${passEncoded}=${passwordEncoded}`);
    const formBodyString = formBody.join("&");

    try {
      const response = await fetch("http://localhost:3113/user/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBodyString,
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        setIsLogin(false);

        //nasty prompt alert
        alert(data.error);

        return;
      }
      setUser(data.user);
      setIsLogin(true);
      setMessage(data.message);
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  if (isLogin) {
    return (
      <div className="alert alert-success shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="input-group input-group-lg">
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered w-full max-w-lg"
                onChange={emailChangeHandler}
              />
            </label>
          </div>
          <div className="form-control pt-5">
            <label className="input-group input-group-lg">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-lg"
                onChange={passwordChangeHandler}
              />
            </label>
          </div>
          <div className="form-control pt-5">
            <input type="submit" value="Login" className="btn" />
          </div>
        </form>
      </div>
    );
  }
}
