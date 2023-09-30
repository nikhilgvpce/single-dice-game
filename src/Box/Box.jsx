import "./Box.css";

const Box = ({ boxPosition, boxValue, setBoxValues, disable }) => {
  return (
    <button disabled={disable} className="box" onClick={setBoxValues}>
      <div className="box-number">Dice {boxPosition}</div>
      <div className="box-value">Bet {boxValue}</div>
    </button>
  );
};

export default Box;
