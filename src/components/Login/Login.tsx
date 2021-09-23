import "./Login.css";

interface Props {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  regFunc: () => void;
  loginFunc: () => void;
}

const Login: React.FC<Props> = ({
  email,
  setEmail,
  password,
  setPassword,
  regFunc,
  loginFunc,
}) => {
  return (
    <div className="login-form">
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className={"buttons"}>
        <button onClick={regFunc}>Register</button>
        <button onClick={loginFunc}>Login</button>
      </div>
    </div>
  );
};

export default Login;
