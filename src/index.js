import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



//you should never change props from child comp
//props are the data send from parent comp to child
//they can't be modified and are read only 
//props can be any kind of data not just the state that you want to pass on


/**
 * State
 * 
 * //the data that changes 
 * //state can be changed from it's local comp only 
 * 
 */

///how to make comps more dynamic? 
