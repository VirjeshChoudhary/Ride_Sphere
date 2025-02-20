/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-lg mb-4">Thank you for your payment.</p>
            <Link to="/home" className="bg-green-600 text-white font-semibold p-2 rounded-lg">Go to Home</Link>
        </div>
    );
};

export default Success;