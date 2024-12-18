import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/Context'
import Context from './store/Context';
import {Firebase,Fauth, Fstore} from './firebase/Config'

ReactDOM.render(
    <FirebaseContext.Provider value={{Firebase,Fauth,Fstore}}>
        <Context>
        <App />
        </Context>
    </FirebaseContext.Provider>
    , document.getElementById('root'));
