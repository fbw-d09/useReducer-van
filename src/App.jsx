import React, { useReducer } from "react";
import './App.css'
import Van from './assets/van.svg'
import GearShifter from './assets/gearshift.svg'


export default function App() {

  const initialVan = {
    gear: 0,
    speed: 0,
    engineStarted: false,
  }

  const vanReducer = (previousState, action) => {
    console.log(previousState);
    switch (action.type) {
      case 'EngineStarted':
        return {
          ...previousState,
          engineStarted: !previousState.engineStarted,
        }
      case 'EngineStopp ed':
        return {
          ...previousState,
          gear: 0,
          engineStarted: false,
        }
      case 'GearUp':
        if (!(previousState.gear > 3) && previousState.engineStarted) {
          return {
            ...previousState,
            gear: previousState.gear + 1,
          }

        } else {
          console.log('Already on 4th gear!');
          return {
            ...previousState
          }

        }

      case 'GearDown':
        if (previousState.engineStarted && !(previousState.gear < -2))
          return {
            ...previousState,
            gear: previousState.gear - 1,
          };
      case 'Accelerate':
        if (previousState.engineStarted && previousState.gear > 0) {
          return {
            ...previousState,
            speed: previousState.speed + previousState.gear * 10
          }
        }
      case 'Brake':
        if (previousState.engineStarted && previousState.gear > 0) {
          return {
            ...previousState,
            speed: previousState.speed - previousState.gear * 10
          }
        } else {
          return {
            ...previousState
          }
        }

      default:
        throw new Error('Operation not possible!');
    }
  };

  const [van, dispatch] = useReducer(vanReducer, initialVan);


  return (
    <div className="App">
      <div className={`imageBorder ${van.engineStarted ? 'green' : 'red'}`}>
        <img
          className="van-image"
          src={Van}
          alt="boat" />
      </div>
      {/*
          Start engine" button
          When the button is clicked, the engine status text should display "engine on".
          */}
      {!van.engineStarted && 
        <button
          onClick={() => dispatch({ type: 'EngineStarted' })}
          style={{ backgroundColor: 'red' }}
        >START ENGINE
        </button>
      }
      {van.engineStarted &&
          <button
            onClick={() => dispatch({ type: 'EngineStopped' })}
            style={{ backgroundColor: 'green'}}
          >ENGINE ON
          </button>
      }

      <div className="carStatus">
        <p>The current gear is:<span>{van.gear > 0 ? van.gear : 'no gear'}</span></p>
        <p>The current spead is:<span>{van.speed > 0 ? van.speed : 0}</span></p>
        <div className="operateCar">
        </div>
        {/* 
          "Gear up" button
          When the button is clicked, and the engine is started, the current gear text should increment by 1 (max 5).
          */}
        <button onClick={() => dispatch({ type: 'GearUp' })} >
          <img className="gear" src={GearShifter} alt="gear shifter" />
          GEAR UP
        </button>
        {/* 
          "Gear down" button
          When the "Gear down" button is clicked, and the engine is started, the current gear text should decrement by 1 (min -2).
           */}
        <button onClick={() => dispatch({ type: 'GearDown' })}>
          <img className="gear" src={GearShifter} alt="gear shifter" />
          GEAR DOWN
        </button>
        {/* 
          "Accelerate" button
          When the "Accelerate" button is clicked, and the engine is started and in a non-zero gear, the speed text should increment according to the current gear.
      */}
        <button onClick={() => dispatch({ type: 'Accelerate' })} >ACCELERATE</button>
        <button onClick={() => dispatch({ type: 'Brake' })} >BRAKE</button>
      </div>
    </div>
  );
}