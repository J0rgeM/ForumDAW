import React, { useEffect, useState } from "react";
// Library imports.
import axios, { AxiosResponse } from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { IPost } from "../../server/src/posts";
import { useParams } from "react-router-dom";

function UpdatePost() {
    let params = useParams();
    const [post, setPost] = useState<IPost[]>([]);
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    const getPost = async (number) => {
        try {
            const response: AxiosResponse = await axios.get<IPost[]>(
                "http://localhost:8080/updatePost/".concat(number)
            );
            setPost(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // eslint-disable-next-line
    const updatePost = async (post: IPost) => {
        try {
            console.log(post.author);
            const response: AxiosResponse = await axios.put(
                "http://localhost:8080/updatePost/:number",
                {
                    author: JSON.stringify(author),
                    body: JSON.stringify(body),
                    headers: {
                        "Content-type": "text/plain",
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getPost(params.number);
    }, []);

    return (
        <div>
            <Navbar />
            {post.map((post) => (
            <div className="container text-center">
                <form className="shadow p-3 mb-5 bg-white rounded">
                    <h1 className="mt-2">Post</h1>
                    <div className="mb-3">
                        <label form="inputTitle" className="form-label">
                            Message
                        </label>
                        <input
                            type="textarea"
                            className="form-control m-1"
                            id="inputPost"
                            onChange={(e) => setAuthor(e.target.value)}
                            // placeholder="State your name"
                            placeholder={post.author}
                        >
                        </input>
                        <input
                            type="textarea"
                            className="form-control m-1"
                            id="inputPost"
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Content of your post"
                        ></input>
                    </div>
                    <button
                        type="submit"
                        // onClick={addPost}
                        className="btn btn-dark"
                    >
                        Submit
                    </button>
                </form>
            </div>
            ))}

            <Footer />
        </div>
    );
}

export default UpdatePost;
