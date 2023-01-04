import React, {useEffect, useState} from 'react';
// Library imports.
import axios, { AxiosResponse } from "axios";
import Navbar from "../../client/src/components/Navbar";
import Footer from "../../client/src/components/Footer";

import {IPost} from  "../../server/src/posts";
import {Button} from "react-bootstrap";


function Posts(){

    const [posts, setPosts] = useState<IPost[]>([])

    const getPost = async () => {
        try {
            const response: AxiosResponse = await axios.get<IPost[]>("http://localhost:8080/getPost");
            response.data.sort((n1, n2) => n1.number - n2.number)
            setPosts(response.data)
            console.log(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getPost();
    }, []);


    const addPost = async () => {
        try {
            const response: AxiosResponse = await axios.post("http://localhost:8080/addPost");
            console.log(response)
        }
        catch (error) {
            console.error(error)
        }
    }
    // eslint-disable-next-line
    const updatePost = async (post: IPost) => {
        try {
            console.log(post.author)
            const response: AxiosResponse = await axios.put("http://localhost:8080/updatePost", post);
            console.log(response)
        }
        catch (error) {
            console.error(error)
        }
    }
    // eslint-disable-next-line
    const deletePost = async () => {
        try {
            const response: AxiosResponse = await axios.delete("http://localhost:8080/deletePost");
            console.log(response)
        }
        catch (error) {
            console.error(error)
        }
    }

    return(
    <div>
        <Navbar/>
        <div className="container text-center">
            <div className="margin-0 margin-top-0 btn-group" role="group">
                <Button type="button" onClick={() => {
                    alert("Add");
                    //addPost();
                }} className="p-3 btn btn-dark">Add Post</Button>

                <button type="button" onClick={() => {
                    alert("Update");
                    //addPost();
                }} className="p-3 btn btn-dark">Update Post</button>

                <button type="button" onClick={() => {
                    alert("Delete");
                    //addPost();
                }} className="p-3 btn btn-dark">Delete Post</button>
            </div>
        </div>

        { posts.map(post =>(
                    <div key={post.number} className="container shadow p-3 mb-5 bg-white rounded">
                        <div className="col">
                            <div className="card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src='https://media.giphy.com/media/sQuHLqjWwRXGvrjkg0/giphy.gif' width='100%' height={250} alt="meme"/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <p className="card-text">number: {post.number}</p>
                                            <p className="card-text">Author: {post.author}</p>
                                            <p className="card-text"> {post.body} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )
        };
        <Footer/>
    </div>
    )
}

export default Posts;