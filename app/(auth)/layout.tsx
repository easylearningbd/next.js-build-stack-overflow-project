import React, { ReactNode } from 'react';

const AuthLayout = ({ children} : {children: ReactNode}) => {
    return (
<main>
    <section>
        {children}
    </section> 
</main>
    );
};

export default AuthLayout;