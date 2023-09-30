import { useEffect } from "react";
import "./Dice.css";

const handleDiceClick = (setDice) => {
  const min = Math.ceil(1);
  const max = Math.floor(6);
  const res = Math.floor(Math.random() * (max - min + 1)) + min;
  const dice = document.querySelectorAll(".die-list")[0];
  dice.dataset.roll = res;
  setDice(res);
};

const Dice = ({ setDice, rollDice }) => {
  useEffect(() => {
    let timer = null;
    if (rollDice) {
      console.log("rolling diece", rollDice);
      timer = setTimeout(() => {
        handleDiceClick(setDice);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [rollDice]);

  return (
    <>
      {/* <button className="dice" onClick={() => handleDiceClick(setDice)}>
        Generate random number
      </button> */}

      <div className="dice">
        <ol className="die-list dice-roll" data-roll="1" id="die-1">
          <li className="die-item" data-side="1">
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="2">
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="3">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="4">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="5">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
          <li className="die-item" data-side="6">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
        </ol>
      </div>
    </>
  );
};

export default Dice;
