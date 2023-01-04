// React imports.
import React, { Component } from "react";
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * BaseLayout.
 */
class BaseLayout extends Component {

    /**
     * Render().
     */
    render() {
        return(
            <div className="appContainer">
                <Navbar />
                <Footer />
            </div>
        );

    } /* End render(). */

} /* End class. */

export default BaseLayout;