"use client"
import React from 'react';
import AuthForm from '@/components/forms/AuthForm';
import { SignUpSchema } from '@/lib/validations';
import { signUpWithCredentials } from '@/lib/actions/auth.action';

const SignUp = () => {
    return (
        <AuthForm 
            formType='SIGN_UP'
            schema={SignUpSchema}
            defaultValues={{ email: "", password: "", name: "", username: ""}}
            onSubmit={signUpWithCredentials}
        
        /> 
    );
};

export default SignUp;