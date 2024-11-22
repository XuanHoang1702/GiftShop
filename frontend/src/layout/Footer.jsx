import React, { useEffect, useState } from 'react';
import MenuService from '../service/MenuService';

const Footer = () => {
    const [menus, setMenus] = useState(null);

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await MenuService.getFooter();
            setMenus(response);
        } catch (error) {
            console.error('Error fetching menus:', error);
        }
    };


    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-6">
                    <a href="#" className="mx-2 text-white"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="mx-2 text-white"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="mx-2 text-white"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="mx-2 text-white"><i className="fab fa-youtube"></i></a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="font-bold mb-4">ABOUT US</h3>
                        <p className="text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Newsletter</h3>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full p-2 mb-4 text-gray-900" 
                        />
                        <button className="bg-pink-500 text-white py-2 px-4">SUBSCRIBE</button>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">NEED HELP</h3>
                        <p className="text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">CONTACT US</h3>
                        {menus?.map((menu) => (
                            <div key={menu.id} className="text-gray-400">
                                <p><i className="fas fa-map-marker-alt mr-2"></i> ADDRESS: {menu.address}</p>
                                <p><i className="fas fa-phone mr-2"></i> PHONE: {menu.phone}</p>
                                <p><i className="fas fa-envelope mr-2"></i> EMAIL: {menu.email}</p>
                                <p><i className="fas fa-headset mr-2"></i> HOTLINE: {menu.hotline}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-gray-400">© 2024 All Rights Reserved By Free Html Templates</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
