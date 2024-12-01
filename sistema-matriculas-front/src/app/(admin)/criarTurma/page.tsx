'use client';

import CreateClass from "@/components/createClass/CreateClass";
import Sidebar from "@/components/sidebarAdmin";

const CriarTurma = () => {
    return (
        <div className="flex h-screen">
           
            <Sidebar />
            
            <div className="flex-1 p-6">
                <CreateClass />
            </div>
            
        </div>
    );
};

export default CriarTurma;
