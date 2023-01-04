import React from 'react';
import ReactDOM from 'react-dom/client';

// App imports.
import BaseLayout from "./components/BaseLayout";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Posts from "./Posts";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<BaseLayout/>} />
                <Route path="/getPost" element={<Posts/>} />
                <Route path="/addPost" element={<Posts/>} />
                <Route path="/updatePost" element={<Posts/>} />
                <Route path="/deletePost" element={<Posts/>} />
            </Routes>
        </Router>
    </React.StrictMode>
);


