import React from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Testimonial = () => {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">TESTIMONIAL</h1>
            <div className="relative flex items-center justify-center">
                <button className="absolute left-0 bg-pink-500 text-white p-4 rounded-full">
                    <FaChevronLeft />
                </button>
                <div className="bg-white shadow-md p-8 rounded-md max-w-2xl mx-auto">
                    <h2 className="text-pink-500 text-xl font-bold">Rochak</h2>
                    <p className="text-gray-400 mb-4">Default model text</p>
                    <p className="text-black">
                        Various editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many websites still in their infancy. Various editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many websites still in their infancy. Editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many websites still in their infancy.
                    </p>
                    <div className="text-right text-3xl text-black">
                        <FaQuoteRight />
                    </div>
                </div>
                <button className="absolute right-0 bg-pink-500 text-white p-4 rounded-full">
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Testimonial;
