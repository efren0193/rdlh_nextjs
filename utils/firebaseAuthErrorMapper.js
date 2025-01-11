const firebaseAuthErrorMapper = (errorCode) => {
    const errorMessages = {
        'auth/user-not-found': 'El usuario no fue encontrado. Verifique el correo electrónico.',
        'auth/wrong-password': 'Contraseña incorrecta. Intente nuevamente.',
        'auth/email-already-in-use': 'El correo electrónico ya está registrado.',
        'auth/invalid-email': 'El correo electrónico no es válido.',
        'auth/weak-password': 'La contraseña es demasiado débil. Elija una más segura.',
        'auth/user-disabled': 'La cuenta ha sido deshabilitada.',
        'auth/too-many-requests': 'Demasiados intentos de inicio de sesión fallidos. Intente más tarde.',
        'auth/operation-not-allowed': 'La operación no está permitida. Póngase en contacto con el administrador.',
    };

    return errorMessages[errorCode] || 'Error desconocido. Intente nuevamente.';
};

export default firebaseAuthErrorMapper;