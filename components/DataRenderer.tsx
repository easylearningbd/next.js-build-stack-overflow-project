import React from 'react';


interface Props<T>{
    success: boolean;
    error?: {
        message:string;
        details?: Record<string, string[]>;
    };
    data: T[] | null | undefined;
    empty: {
        title: string;
        message: string;
        button?: {
            text: string;
            href: string
        };
    };
    render: (data: T[]) => React.ReactNode; 
}

interface StateSkeletonProps {
    image: {
        light: string;
        dark: string;
        alt: string
    };
    title: string;
    message: string;
    button?: {
        text: string;
        href: string
    };
}

const StateSkeleton = ({
    
})


const DataRenderer = () => {
    return (
        <div>
            
        </div>
    );
};

export default DataRenderer;