# Flooks Thunk
Flooks Thunk middleware allows you to write actions creator that return a function instead of an action. Is based on [Redux Thunk](https://github.com/reduxjs/redux-thunk)
### Why do I need this?
---
With plain [React Flooks](https://github.com/Somo86/React-Flooks) you can not create asynchronous operations to get data and save it to your application state. React flooks only work with synchronous processes.

Flooks Thunk is a good way to manage asynchronous side effects using [React Hooks](https://reactjs.org/docs/hooks-intro.html)
## Table of Contents
----------
* [Install](###install)
* [Quick start](###Quick-start)
* [Usage](###Usage)
    * [useAsyncRedux](####useAsyncRedux)
### Install
---
```javascript
# NPM
npm install --save flooks-thunk
```
### Quick start
---
```javascript
// store.js
import {createStore, combineReducers, applyMiddleWare} from 'react-flooks';
import thunk from 'flooks-thunk';

const clickReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TEXT':
            return action.payload;
        default:
            return state;
    }
};

const reducers = combineReducers({
  clickText: clickReducer
});

const initialState = { clickText: '' };

export const {
  Provider,
  store,
  useSelect,
  useDispatch
  useAsyncRedux,
} = createStore(
    reducers, 
    initialState,
    applyMiddleWare(thunk)
);
```
```javascript
// component.jsx
import { useAsyncRedux, useSelect } from './store';

const handleAsynchronous = dispatch => {
    doAsynchronous().then(response => {
        dispatch({
            type: 'ADD_TEXT',
            payload: response
        })
    })
}

export function AddTextComponent() {

    const text = useSelect(state => state.clickText); 
    useEffect(() => {
        useAsyncRedux(handleAsynchronous);
    }, []);

    return (
        <div>
            <p>{ text }</p>
        </div>
    );
}
```
### Usage
---
#### useAsyncRedux
useAsyncRedux is a convenient way for orchestrating asynchronous control. Giving a function as first argument the hook will response returning a *dispatch* function as callback.
```javascript
import { useAsyncRedux } from '../store';

const responseAction = response => ({
    type: 'DO_SOME_ACTION',
    payload: response
});

const errorAction = e => ({
    type: 'RESOLVE_SOME_ERROR',
    payload: e.message
});

const fetchResource = () => fetch('http://my-resource/');

// useAsyncRedux add dispatch as callback on
// the provided function
const dispatchResponse = (dispatch) => {
    // do async
    fetchResource().then(
        response => dispatch(responseAction(response))
    ).catch(e => dispatch(errorAction(e)))
};

function YourComponent() {
    useEffect(() => {
        // dispatch API response after component 
        // has been mounted
        useAsyncRedux(dispatchResponse);
    }, []);

    return <p>my component</p>;
}

```