import React from 'react';
import ReactDOM from 'react-dom/client';

// App imports.
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Posts from "./Posts";
import AddPost from './AddPost';
import UpdatePost from './UpdatePost';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Posts/>} />
                <Route path="/addPost" element={<AddPost/>} />
                <Route path="/updatePost/:number" element={<UpdatePost/>} />
            </Routes>
        </Router>
    </React.StrictMode>
);


