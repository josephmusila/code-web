import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

const Home = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Retrieve user data from local storage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <>
            <Head>
                <title>Egamlio - Home</title>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />
            </Head>
            <section className="home-section">
                <div className="overlay pb-120">
                    <div className="container">
                        <div className="top-area pt-4 mb-30">
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-6 col">
                                    <Link className="logo-link" href="/">
                                        <img src="/images/logo.png" alt="Egamlio Logo" />
                                    </Link>
                                </div>
                                <div className="col-sm-6 text-end col">
                                    <Link className="login-link" href="/login">
                                        Logout
                                    </Link>
                                    

                                    <Link className="login-link" href="/customercreate">
                                        Create Customer
                                    </Link>
                                    <Link className="login-link" href="/customerlist">
                                        Customer List
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="home-main-content text-center">
                            <h1>Welcome, {user ? user.firstName + user.lastName  : 'User'}!</h1>
                            
                        </div>
                    </div>
                </div>
            </section>
            <style jsx>{`
                .home-section {
                    background: url('/images/home-bg.jpg') no-repeat center center;
                    background-size: cover;
                    color: #fff;
                }
                .logo-link {
                    font-size: 24px;
                    color: #fff;
                    text-decoration: none;
                }
                .login-link {
                    color: #fff;
                    font-weight: bold;
                    font-size: 18px;
                }
                .home-main-content h1 {
                    font-size: 48px;
                    font-weight: 700;
                    margin-bottom: 20px;
                }
                .home-main-content p {
                    font-size: 18px;
                    margin-bottom: 40px;
                }
                .cmn-btn, .cmn-btn-outline {
                    padding: 12px 24px;
                    font-size: 18px;
                    border-radius: 5px;
                    text-decoration: none;
                }
                .cmn-btn {
                    background-color: #ff4757;
                    color: #fff;
                }
                .cmn-btn-outline {
                    border: 2px solid #ff4757;
                    color: #ff4757;
                }
                .social-icons p {
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                .social-icons ul {
                    list-style: none;
                    padding: 0;
                    display: flex;
                    gap: 20px;
                }
                .social-icons i {
                    font-size: 24px;
                }
            `}</style>
        </>
    );
};

export default Home;
