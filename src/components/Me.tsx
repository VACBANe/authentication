interface Props {
    logoutFunc: () => void;
}
const Me: React.FC<Props> = ({logoutFunc}) => {
  return (
    <div>
      <button onClick={logoutFunc}>Logout</button>
      <div>Token is valid</div>
    </div>
  );
};

export default Me;
