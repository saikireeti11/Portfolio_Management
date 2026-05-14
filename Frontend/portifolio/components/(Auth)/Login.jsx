"use client";

import { useState, useContext } from "react";
import InputFeild from "./InputFeild";
import authContext from "../../core/context/authContext.js";

export default function Login() {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const { storeDetails } = useContext(authContext);

    function handleEmail(value) {
        setEmail(value);
        storeDetails(value, pass);
    }

    function handlePass(value) {
        setPass(value);
        storeDetails(email, value);
    }

    return (
        <div>

            <InputFeild
                placeholder="email"
                type="email"
                inputvalue={handleEmail}
            />

            <InputFeild
                placeholder="password"
                type="password"
                inputvalue={handlePass}
            />

            <p>{email}</p>
            <p>{pass}</p>

        </div>
    );
}