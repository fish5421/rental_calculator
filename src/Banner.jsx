import React from 'react';
import logo from '../src/assets/Untitled design (2).svg';  // Update the path to your logo

const Banner = () => {
    return (
        <div className="flex custom-bg text-white w-full mb-4 shadow-md rounded-xl">
            <div className="mx-auto flex items-center justify-between">
                <div className="flex items-center justify-center">
                    <img src={logo} alt="Your Logo" className="flex justify-center  w-40 h-20" />
                    <span className="text-2xl font-light ml-4">Real Estate Real Analyzer</span>

                </div>
               
            </div>
        </div>
    );
};

export default Banner;
