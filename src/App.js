import { useEffect, useReducer, useState } from "react";
import "./styles.css";
import Bets from "./Bets/Bets";
import Dice from "./Dice/Dice";
import Modal from "./Modal/Modal";

const INITIAL_STATE = {
  selectionTimer: 5,
  rollDice: false,
  lostAmount: 0,
  wonAmount: 0,
  diceValue: -1,
  displayModal: false,
  resetApp: false
};

export default function App() {
  function reducer(state = INITIAL_STATE, action) {
    console.log(
      "disptaching action.type",
      action.type,
      "with action.payload",
      action.payload
    );
    switch (action.type) {
      case "SET_SELECTION_TIMER": {
        return {
          ...state,
          selectionTimer: action.payload
        };
      }
      case "SET_ROLL_DICE": {
        return {
          ...state,
          rollDice: action.payload
        };
      }
      case "SET_DICE_VALUE": {
        console.log("setting dice value", action.payload);
        return {
          ...state,
          diceValue: action.payload
        };
      }
      case "SET_MODAL_PROPS": {
        return {
          ...state,
          lostAmount: action.payload.lostAmount,
          wonAmount: action.payload.wonAmount,
          displayModal: action.payload.displayModal
        };
      }
      case "RESET_APP_STATE": {
        return {
          ...INITIAL_STATE
        };
      }
      default:
        return {
          ...INITIAL_STATE
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { selectionTimer } = state;

  // const [rollDice, setRollDice] = useState(false);

  // const [modalProps, setModalProps] = useState({
  //   lostAmount: 0,
  //   wonAmount: 0,
  //   displayModal: false
  // });

  // const [diceValue, setDice] = useState(null);

  useEffect(() => {
    let timer = null;
    if (state.displayModal) {
      timer = setTimeout(() => {
        dispatch({ type: "RESET_APP_STATE" });
        dispatch({ type: "SET_ROLL_DICE", payload: false });
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [state.displayModal]);

  useEffect(() => {
    let timer = setInterval(() => {
      if (selectionTimer > 0) {
        dispatch({ type: "SET_SELECTION_TIMER", payload: selectionTimer - 1 });
        // setSelectionTimer((timer) => timer - 1);
      } else if (timer) {
        dispatch({ type: "SET_ROLL_DICE", payload: true });
        // setRollDice(true);
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [selectionTimer]);

  return (
    <div className="App">
      {state.displayModal ? (
        <Modal wonAmount={state.wonAmount} lostAmount={state.lostAmount} />
      ) : null}
      <div className="timer-space">{selectionTimer}</div>
      <div className="bets-wrapper">
        <Bets
          shouldDisable={selectionTimer === 0}
          diceValue={state.diceValue}
          setBetResult={({ wonAmount, lostAmount }) => {
            console.log("setting betResult", wonAmount, lostAmount);
            dispatch({
              type: "SET_MODAL_PROPS",
              payload: {
                wonAmount,
                lostAmount,
                displayModal: true
              }
            });
            // setModalProps({
            //   wonAmount,
            //   lostAmount,
            //   displayModal: true
            // });
          }}
        />
        <Dice
          setDice={(dice) => {
            dispatch({ type: "SET_DICE_VALUE", payload: dice });
            dispatch({ type: "SET_ROLL_DICE", payload: false });
          }}
          rollDice={state.rollDice}
        />
      </div>
    </div>
  );
}
