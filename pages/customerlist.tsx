import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch("https://test.omidrop.africa/api/customers/get-customers/1");
                const data = await response.json();
                if (response.ok) {
                    setCustomers(data.response);
                    setFilteredCustomers(data.response);
                } else {
                    console.error("Failed to fetch customers:", data.description);
                }
            } catch (err) {
                console.error("Error fetching customers:", err);
            }
        };

        fetchCustomers();
    }, []);

    useEffect(() => {
        setFilteredCustomers(
            customers.filter(customer =>
                customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.other_names.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, customers]);

    return (
        <>
            <Head>
                <title>Customers List</title>
            </Head>
            <section className="customers-list-section">
                <div className="container">
                    <h1>Customers List</h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Other Names</th>
                                <th>Mobile Number</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map(customer => (
                                <Link key={customer.customer_id} href={`/customerdetails/${customer.id}`} passHref>
                                <tr>
                                    <td>{customer.first_name}</td>
                                    <td>{customer.other_names}</td>
                                    <td>{customer.mobile_number}</td>
                                    <td>{customer.email}</td>
                                </tr>
                            </Link>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <style jsx>{`
                .customers-list-section {
                    padding: 20px;
                }
                input {
                    margin-bottom: 20px;
                    padding: 10px;
                    width: 100%;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 10px;
                    text-align: left;
                    border: 1px solid #ccc;
                    background-color: #f0f0f0;
                }
                tr:hover {
                    cursor: pointer;
                    background-color: #f1234;
                }
            `}</style>
        </>
    );
};

export default CustomersList;
