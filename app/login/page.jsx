'use client'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import firebaseAuthErrorMapper from '@/utils/firebaseAuthErrorMapper';
import Slider from "../components/slider";
import CustomForm from "../components/molecules/custom-form";
import CustomInput from "../components/atoms/custom-input";
import CustomButton from "../components/atoms/custom-button";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        setError('');
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            const refreshToken = userCredential.user.refreshToken;

            // Enviar el token al backend para almacenarlo en una cookie segura
            const res = await fetch('/api/set-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, refreshToken }),
            });

            if (res.ok) {
                // Redirigir al dashboard después de iniciar sesión
                window.location.href = '/dashboard';
            } else {
                setError('Ocurrió un error al iniciar sesión.')
                // console.error('Error al configurar la cookie del token');
            }
        } catch (error) {
            setError(firebaseAuthErrorMapper(error.code));
            // console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div className='dark:bg-dark bg-light pb-2'>
            <Slider title={'Login'} />
            <div className='w-full p-2 md:p-0 md:w-1/2 lg:1/3 m-auto bg-white shadow-lg'>
                <CustomForm>
                    <label className="block mb-2 text-red-600">{error}</label>
                    <CustomInput
                        label={'Email'}
                        name={'email'}
                        type={'email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <CustomInput
                        label={'Contraseña'}
                        name={'password'}
                        type={'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="w-full flex justify-end my-4">
                        <CustomButton onClick={handleLogin} text={'Iniciar Sesión'} />
                    </div>
                </CustomForm>
            </div>
        </div>
    );
}