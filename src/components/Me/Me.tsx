import "./Me.css";

interface Props {
    logoutFunc: () => void;
}
const Me: React.FC<Props> = ({logoutFunc}) => {
  return (
    <div className={"me-container"}>
      <h1>Token is valid</h1>
      <button onClick={logoutFunc}>Logout</button>
    </div>
  );
};

export default Me;
