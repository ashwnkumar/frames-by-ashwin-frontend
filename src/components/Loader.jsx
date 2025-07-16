import React from 'react';
import { useAuth } from '../context/AuthContext'; // adjust path as needed

const Loader = () => {
    const { loading } = useAuth();

    if (!loading) return null;

    return (
        <div className="fixed inset-0  flex items-center justify-center bg-black/30" style={{ zIndex: 99999 }}>
            <div className="flex flex-col items-center gap-4">
                <div className="size-14 animate-spin rounded-full border-6 border-light border-t-dark"></div>
                {/* <p className="text-gray-700 text-sm">Loading...</p> */}
            </div>
        </div>
    );
};

export default Loader;
