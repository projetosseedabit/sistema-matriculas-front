'use client';

import CreateClass from "@/components/createClass/CreateClass";
import Sidebar from "@/components/sidebarAdmin";

const CriarTurma = () => {
    return (
        <div className="flex h-screen">
           
            <Sidebar />
            
            <div className="flex flex-1 items-center justify-center">
                <CreateClass />
            </div>
            
        </div>
    );
};

export default CriarTurma;
