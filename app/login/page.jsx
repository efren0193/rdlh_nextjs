'use client'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import firebaseAuthErrorMapper from '@/utils/firebaseAuthErrorMapper';
import Slider from "../components/slider";
import CustomForm from "../components/molecules/custom-form";
import CustomInput from "../components/atoms/custom-input";
import CustomButton from "../components/atoms/custom-button";
import { FiEyeOff, FiEye } from 'react-icons/fi';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('password');

    const handleLogin = async (e) => {
        setError('');
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            const refreshToken = userCredential.user.refreshToken;

            setLoading(true)
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
                setLoading(false);
            }
        } catch (error) {
            setError(firebaseAuthErrorMapper(error.code));
            setLoading(false);
        }
    };

    const handleToggle = () => {
        if (type==='password'){
            setType('text')
        } else {
            setType('password')
        }
    }

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
                        placeholder='Email'
                    />

                    <label className="block mb-2 font-bold text-gray-700">Password</label>
                    <div className="mb-4 flex">
                        <input
                            type={type}
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            className="rounded-lg  w-full border border-gray-300 shadow-md p-2 text-dark dark:text-white"
                        />
                        <span className="flex justify-around items-center" onClick={handleToggle}>
                            {
                                type == 'password' ? <FiEyeOff className="absolute mr-10" size={25} /> :
                                <FiEye className="absolute mr-10" size={25} />
                            }
                        </span>
                    </div>
                    <div className="w-full flex justify-end my-4">
                        <CustomButton onClick={handleLogin} text={'Iniciar Sesión'} loading={loading}/>
                    </div>
                </CustomForm>
            </div>
        </div>
    );
}