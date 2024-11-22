import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import SlideBar from '../layout/SlideBar';
import TopNav from '../layout/TopNav';

export default function Admin() {
    useEffect(() => {
        const ss = document.createElement("link");
        ss.rel = "stylesheet";
        ss.type = "text/css";
        ss.href = "/admin/dist/css/adminlte.min.css";
        document.head.appendChild(ss);

        return () => {
            document.head.removeChild(ss);
        };
    }, []);

    return (
        <div className="wrapper flex flex-col h-screen">
            <TopNav />
            <div className="flex flex-1">
                <SlideBar/>
                <div className="flex-1 w-full ">
                    <section className="content-header">
                        <div className="mx-auto px-4">
                        </div>
                    </section>
                    <section className="content">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col">
                                <Outlet />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
