import { createStore } from 'redux';

/*/************************
     PART 1: SETTING UP
/**************************/

const reducer = (state = 0, action) => {
  console.log(action);

  switch(action.type) {
    case 'ADD':
      return state + action.payload.value;
    case 'SUBTRACT':
      return state - action.payload.value;
    case 'MULTIPLY':
      return state * action.payload.value;
    case 'DIVIDE':
      return state / action.payload.value;
    case 'RESET':
      return 0;
    default:
      return state;
  }
};

const store = createStore(reducer);

/*/************************
  PART 2: UTILITY METHODS
/**************************/

/**
 * Gets the value of the input field
 *
 * @return {Number} Value of the input field
 */
const getValue = () => {
  const value = parseInt(document.getElementById('op-number').value);
  return isNaN(value) ? 0 : value;
};

/**
 * Sets the total value as returned by the store
 */
const setTotal = value => {
  document.getElementById('grand-total').innerHTML = value;
};

/*/************************
  PART 3: ACTION CREATORS
/**************************/

/**
 * Action Creator. Returns an action of the type 'ADD'
 */
const add = () => ({
  type: 'ADD',
  payload: { value: getValue() },
});

/**
 * Action Creator. Returns an action of the type 'SUBTRACT'
 */
const subtract = () => ({
  type: 'SUBTRACT',
  payload: { value: getValue() },
});

/**
 * Action Creator. Returns an action of the type 'MULTIPLY'
 */
const multiply = () => ({
  type: 'MULTIPLY',
  payload: { value: getValue() },
});

/**
 * Action Creator. Returns an action of the type 'DIVIDE'
 */
const divide = () => ({
  type: 'DIVIDE',
  payload: { value: getValue() },
});

/**
 * Action Creator. Returns an action of the type 'DIVIDE'
 */
const nothing = () => ({
  type: 'NOTHING',
  payload: { value: getValue() },
});

/**
 * Action Creator. Returns an action of the type 'RESET'
 */
const reset = () => ({ type: 'RESET' });

/*/************************
  PART 4: HOOK BEHAVIOR
/**************************/

// Subscribe to updates
let unsubscribe = store.subscribe(() => {
  setTotal(store.getState());
});

// Handle add button click
document.getElementById('add-btn').addEventListener('click', () => {
  store.dispatch(add());
});

// Handle subtract button click
document.getElementById('subtract-btn').addEventListener('click', () => {
  store.dispatch(subtract());
});

// Handle multiply button click
document.getElementById('multiply-btn').addEventListener('click', () => {
  store.dispatch(multiply());
});

// Handle divide button click
document.getElementById('divide-btn').addEventListener('click', () => {
  store.dispatch(divide());
});

// Handle nothing button click
document.getElementById('nothing-btn').addEventListener('click', () => {
  store.dispatch(nothing());
});

// Handle unsubscribe button click
document.getElementById('unsubscribe-btn').addEventListener('click', () => {
  unsubscribe();
});

// Handle resubscribe button click
document.getElementById('resubscribe-btn').addEventListener('click', () => {
  unsubscribe = store.subscribe(() => {
    setTotal(store.getState());
  });
});

// Handle reset button click
document.getElementById('reset-btn').addEventListener('click', () => {
  store.dispatch(reset());
});