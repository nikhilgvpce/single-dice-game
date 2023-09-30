import { useEffect, useState } from "react";
import Box from "../Box/Box";
import "./Bets.css";

const INITIAL_STATE = {
  BOX_POSITIONS: [1, 2, 3, 4, 5, 6],
  WALLET_AMOUNT: 100,
  BOX_VALUES: [0, 0, 0, 0, 0, 0]
};

const Bets = ({ shouldDisable, diceValue, setBetResult }) => {
  const boxPositions = INITIAL_STATE.BOX_POSITIONS;
  const [walletAmount, setWalletAmount] = useState(INITIAL_STATE.WALLET_AMOUNT);
  const [boxValues, setBoxValues] = useState(INITIAL_STATE.BOX_VALUES);

  useEffect(() => {
    // let timer = null;
    console.log("dice val", diceValue);
    if (diceValue > 0) {
      let amount = walletAmount;
      let lostAmount = 0;
      let wonAmount = 0;
      // console.log("running use effect with diceValue", diceValue);
      boxValues.forEach((boxValue, index) => {
        if (index + 1 === diceValue) {
          // console.log("diceValue match");
          wonAmount = boxValue * 2;
        } else if (amount > 0) {
          lostAmount = lostAmount + boxValue;
        }
      });
      amount = amount + wonAmount - lostAmount;
      console.log(
        "inside bets useffect, lostAmount",
        lostAmount,
        "wonAmount",
        wonAmount
      );
      // console.log("setting amount", amount);
      setWalletAmount(() => amount);
      setBetResult({
        lostAmount,
        wonAmount
      });
    } else {
      setWalletAmount(INITIAL_STATE.WALLET_AMOUNT);
      setBoxValues(INITIAL_STATE.BOX_VALUES);
    }
  }, [diceValue]);

  const handlePositionClick = (position) => {
    const newBoxValues = boxValues.map((value, index) => {
      if (index === position) {
        value = value + 1;
      }
      return value;
    });
    setBoxValues(newBoxValues);
  };

  return (
    <div className="bets">
      <div className="bets-wallet-amount">${walletAmount}</div>
      <div className="bets-positions">
        {boxPositions.map((boxPosition, index) => {
          return (
            <Box
              key={"box" + boxPosition}
              boxPosition={boxPosition}
              boxValue={boxValues[index]}
              setBoxValues={() => handlePositionClick(index)}
              disable={shouldDisable}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Bets;
