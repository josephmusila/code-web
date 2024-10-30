import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const CreateCustomer = () => {
    const [firstName, setFirstName] = useState("");
    const [otherNames, setOtherNames] = useState("");
    const [gender, setGender] = useState("Male");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset error state
        setSuccess(""); // Reset success state

        // Basic validation
        if (!firstName || !email || !mobileNumber) {
            setError("Please fill in all required fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Prepare data to be sent
        const customerData = {
            first_name: firstName,
            other_names: otherNames,
            gender,
            mobile_number: mobileNumber,
            email,
            description,
        };

        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetch("https://test.omidrop.africa/api/customers/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`, 
                },
                body: JSON.stringify(customerData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.description); // Display success message
            } else {
                setError(data.description || "An error occurred while creating the customer.");
            }
        } catch (err) {
            setError("Failed to create customer. Please try again.");
        }
    };

    return (
        <>
            <Head>
                <title>Create Customer</title>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />
            </Head>
            <section className="form-section">
                <div className="container">
                    <div className="top-area mb-30">
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
                            </div>
                        </div>
                    </div>

                    <h1>Create New Customer</h1>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="otherNames">Other Names</label>
                            <input
                                type="text"
                                id="otherNames"
                                value={otherNames}
                                onChange={(e) => setOtherNames(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="mobileNumber">Mobile Number *</label>
                            <input
                                type="tel"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="submit-button">Create Customer</button>
                    </form>
                </div>
            </section>
            <style jsx>{`
                .form-section {
                    background: url('/images/form-bg.jpg') no-repeat center center;
                    background-size: cover;
                    color: #fff;
                    padding: 60px 0;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 10px;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                }
                input,
                select,
                textarea {
                    width: 100%;
                    padding: 10px;
                    border-radius: 5px;
                    border: none;
                   background-color: white; /* Set background color to black */
        color: black;
                }
                .submit-button {
                    background-color: #ff4757;
                    color: #fff;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .error-message {
                    color: red;
                }
                .success-message {
                    color: green;
                }
            `}</style>
        </>
    );
};

export default CreateCustomer;
