import React, { useEffect, useState } from "react";
// Library imports.
import axios, { AxiosResponse } from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { IPost } from "../../server/src/posts";
import { Link } from "react-router-dom";

function Posts() {
    const [posts, setPosts] = useState<IPost[]>([]);

    const getPost = async () => {
        try {
            const response: AxiosResponse = await axios.get<IPost[]>(
                "http://localhost:8080/"
            );
            response.data.sort((n1: IPost, n2: IPost) => n1.nmb - n2.nmb);
            setPosts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getPost();
    }, []);

    const deletePost = async (number) => {
        try {
            const response: AxiosResponse = await axios.delete(
                "http://localhost:8080/".concat(number)
            );
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container text-center">
                <div className="margin-0 margin-top-0 btn-group" role="group">
                    <Link to="/addPost">
                        <button className="m-2 p-2 btn btn-dark">
                            Add Post
                        </button>
                    </Link>
                </div>
            </div>
            {posts.map((post) => (
                <div
                    key={post.nmb}
                    className="container shadow p-3 mb-5 bg-white rounded"
                >
                    <div className="col">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img
                                        src="https://media.giphy.com/media/sQuHLqjWwRXGvrjkg0/giphy.gif"
                                        width="100%"
                                        height={250}
                                        alt="meme"
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <p className="card-text">
                                            number: {post.nmb}
                                        </p>
                                        <p className="card-text">
                                            Author: {post.author}
                                        </p>
                                        <p className="card-text">{post.body}</p>
                                        <div className="float-end">
                                            <Link to={"/updatePost/" + post.nmb}>
                                                <button className="m-2 p-2 btn btn-dark">
                                                    Update Post
                                                </button>
                                            </Link>
                                            <button
                                                type="submit"
                                                onClick={() =>
                                                    deletePost(post.nmb)
                                                }
                                                className="m-2 p-2 btn btn-outline-dark"
                                            >
                                                Delete Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <Footer />
        </div>
    );
}

export default Posts;
