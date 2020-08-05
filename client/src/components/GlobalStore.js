import React, { useContext, useReducer } from 'react'

// default global store
const defaultGlobalStore = { messageType: '', message: '', serverStatus: '', loggedIn: false };

const GlobalData = React.createContext();

let lastDispatcher = { do: '', time: 0 };

function dispatcher(state, action) {
    console.log(`[dispatcher] called with ${action.do}`);
    if (action.do === lastDispatcher.do && (Date.now() - lastDispatcher.time) < 1000) {
        console.log(`.. dispatch times too close for ${action.do}; ignoring it.`);
        return state;
    }
    lastDispatcher = { do: action.do, time: Date.now() };

    let newState = { ...state };
    switch (action.do) {
        case 'setMessage':
            newState.messageType = action.type;
            newState.message = action.message;
            console.log(`[GlobalStore:setMessage] set our message: ${action.message}`);
            return newState;

        case 'clearMessage':
            newState.messageType = ''; newState.message = '';
            return newState;

        case 'loginState':
            newState.loggedIn = action.loggedIn;
            if (action.loggedIn === false) // clear the globalData on logout
                newState = { ...defaultGlobalStore };
            console.log(`[GlobalStore:loginState] loginState: `,newState);
            return newState;

        case 'setUserData':
            newState = { ...newState, ...action.data };
            return newState;

        default:
            console.log(`[ERROR] Sorry, unknown do-action: ${action.do}`);
            break;
    }
}

function GlobalStore(props) {
    const [globalData, dispatch] = useReducer(dispatcher, defaultGlobalStore);

    return (
        <GlobalData.Provider value={[globalData, dispatch]} {...props} />
    )
}

function useGlobalStore() {
    return useContext(GlobalData);
}

export { GlobalStore, useGlobalStore };