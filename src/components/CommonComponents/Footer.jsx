import React from 'react'
import Logo from '../assets/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faFacebook, faTwitter, faLinkedin, faTelegramPlane } from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content pt-5 pb-3">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 mb-50">
                            <div className="footer-widget">
                                <div className="footer-logo">
                                    <a href="#"><img src={Logo}
                                        alt="logo"
                                    /></a>
                                </div>

                                <div className="footer-social-icon">
                                    <span>Follow us</span>
                                    <a href="https://www.facebook.com/idsrg/"><FontAwesomeIcon className="fab fa-facebook-f facebook-bg" icon={faFacebook} /></a>
                                    <a href="#"><FontAwesomeIcon className="fab fa-twitter twitter-bg" icon={faTwitter} /></a>
                                    <a href="https://www.linkedin.com/company/idsrg/"><FontAwesomeIcon className="fab fa-google-plus-g google-bg" icon={faLinkedin} /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Useful Links</h3>
                                </div>
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/blogs">Blogs</Link></li>
                                    <li><Link to="/publication">Publication</Link></li>
                                    <li><Link to="/about">About us</Link></li>
                                    <li><Link to="/executive-committee">Commitee Members</Link></li>
                                    <li><Link to="/activities">Latest Events & News</Link></li>
                                    
                                   </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Subscribe</h3>
                                </div>
                                <div className="footer-text mb-25">
                                    <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                </div>
                                <div className="subscribe-form">
                                    <form action="#">
                                        <input type="text" placeholder="Email Address" />
                                        <button><FontAwesomeIcon icon={faTelegramPlane} /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 text-center">
                            <div className="copyright-text">
                                <p>Copyright &copy; 2022, All Right Reserved IDSRG</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer