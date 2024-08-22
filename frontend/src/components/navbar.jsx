import React from 'react'
import search from '../assets/search.png'

const Navbar = () => {
    return (
        <div className='flex p-4 border-b-2 items-center justify-between z-50'>
            <div className='font-Poppins font-medium text-sm text-gray-500'> Home {'>'} <span className='text-blue-950'>Dashboard V2</span></div>
            <div className='flex space-x-4'>
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 absolute left-3 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <div className='flex items-center space-x-1'>
                    <div className=''>
                        <svg
                            width="40px"
                            height="40px"
                            viewBox="0 0 80 80"
                            xmlns="http://www.w3.org/2000/svg"
                            className="rounded-full border border-gray-300"
                        >
                            <defs>
                                <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop stopColor="#060ef9" offset="0%" />
                                    <stop stopColor="#f9060e" offset="100%" />
                                </linearGradient>
                            </defs>
                            <circle cx="40" cy="40" r="40" fill="url(#g)" />
                        </svg>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="13px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xml:space="preserve">
                            <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
                        </svg>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar