import React from 'react'
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <div className="my-space"></div>
            <nav id="footer" className="bg-primary text-center fixed-bottom">
                <Link className="nav-link" to="https://m.me/vuvannghia0405">
                    Vũ Văn Nghĩa 20206205
                </Link>
                <Link className="nav-link" to="https://www.facebook.com/vuvannghia0405">
                    <i className="fab fa-facebook-f"></i>
                </Link>
                <Link className="nav-link" to="tel:0397562283">
                    <i className="fa-solid fa-phone"></i>
                </Link>
                <Link className="nav-link" to="mailto:nghiavu2k2abc@gmail.com">
                    <i className="fa-regular fa-envelope"></i>
                </Link>
            </nav>
        </>
    )
}
