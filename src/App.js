import { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import './App.css';
import { AuthContext, FirebaseContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './Pages/Home';
import Post from './store/PostContext';

function App() {
    const { setUser } = useContext(AuthContext); // Access setUser from AuthContext
    const { Fauth } = useContext(FirebaseContext); // Ensure Fauth is provided by FirebaseContext

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(Fauth, (user) => {
            setUser(user || null); // Update user state or set to null if unauthenticated
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, [Fauth, setUser]); // Dependency array ensures proper effect re-runs

    return (
        <div>
            <Post>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/view' element={<ViewPost />} />
                </Routes>
            </BrowserRouter>
            </Post>
        </div>
    );
}

export default App;
