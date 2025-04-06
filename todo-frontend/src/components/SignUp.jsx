import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from '../config/api';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        sendData(formData);
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const sendData = async (data) => {
        const res = await fetch(`${API_URL}/sign-up/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        console.log(result);
        if (res.status === 200) {
            alert("Sign up successful");
            setFormData({
                name: "",
                email: "",
                password: "",
            });
            navigate("/login");
        } else {
            alert("Sign up failed");
        }
    };

    return (
        <div className="signUpAndLoginPages">
            <form onSubmit={handleSubmit} className="slForm">
                <label htmlFor="name">Enter Your Name</label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email">Enter Your Mail</label>
                <input
                    type="mail"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Enter Your Passord</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
                <p>
                    Already have an account? <Link to={"/login"}>Login</Link>
                </p>
            </form>
        </div>
    );
};
export default SignUp;
