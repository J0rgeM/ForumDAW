import React, { useState } from "react";
// Library imports.
import axios, { AxiosResponse } from "axios";
import Navbar from "../../client/src/components/Navbar";
import Footer from "../../client/src/components/Footer";

function UpdatePost() {
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    const addPost = async () => {
        try {
            const response: AxiosResponse = await axios.post(
                "http://localhost:8080/addPost",
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

    return (
        <div>
            <Navbar />
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
                            placeholder="State your name"
                        ></input>
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
                        onClick={addPost}
                        className="btn btn-dark"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default UpdatePost;
