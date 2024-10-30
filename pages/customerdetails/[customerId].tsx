import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const CustomerDetails = () => {
    const router = useRouter();
    const { customerId } = router.query; // Get customerId from the router
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            if (!customerId) return; // Prevent fetching if customerId is not available
            try {
                const response = await fetch(`http://test.omidrop.africa/api/customers/get-customer-details/${customerId}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch customer details");
                }
                const data = await response.json();
                setCustomer(data.response); // Assuming the response structure
                console.log("Fetched customer details:", data.response);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching customer details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerDetails();
    }, [customerId]);

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Error state
    }

    if (!customer) {
        return <div>No customer data found.</div>; // Fallback for no customer data
    }

    return (
        <>
            <Head>
                <title>Customer Details</title>
            </Head>
            <section className="customer-details-section">
                <div className="container">
                    <h1>Customer Profile</h1>
                    <div className="customer-info">
                        <p><strong>First Name:</strong> {customer.first_name}</p>
                        <p><strong>Other Names:</strong> {customer.other_names}</p>
                        <p><strong>Email:</strong> {customer.email}</p>
                        <p><strong>Mobile Number:</strong> {customer.mobile_number}</p>
                        <p><strong>Gender:</strong> {customer.gender}</p>
                    </div>
                    <button className="back-button" onClick={() => router.back()}>Back to List</button>
                </div>
            </section>
            <style jsx>{`
                .customer-details-section {
                    padding: 20px;
                }
                .customer-info {
                    margin: 20px 0;
                }
                .customer-info p {
                    font-size: 16px;
                }
                .back-button {
                    padding: 10px 15px;
                    border: none;
                    border-radius: 5px;
                    background-color: #0070f3;
                    color: white;
                    cursor: pointer;
                }
                .back-button:hover {
                    background-color: #005bb5;
                }
            `}</style>
        </>
    );
};

export default CustomerDetails;
