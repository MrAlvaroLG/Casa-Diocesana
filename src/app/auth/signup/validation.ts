export type SignupFormData = {
    email: string;
    rol: string;
    password: string;
    confirmPassword: string;
};

export type ValidationErrors = {
    email?: string;
    rol?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
};

export function validateSignupForm(data: SignupFormData): ValidationErrors {
    const errors: ValidationErrors = {};

  // Validación del correo electrónico
    if (!data.email) {
    errors.email = "El correo electrónico es obligatorio";
    } else if (!isValidEmail(data.email)) {
    errors.email = "El formato del correo electrónico no es válido";
    }

  // Validación del rol
    const rolesValidos = ["Laico", "Religiosa", "Religioso", "Diacono", "Sacerdote"];
    if (!data.rol) {
    errors.rol = "Por favor selecciona un rol";
    } else if (!rolesValidos.includes(data.rol)) {
    errors.rol = "El rol seleccionado no es válido";
    } 

  // Validación de la contraseña
    if (!data.password) {
        errors.password = "La contraseña es obligatoria";
    } else {
        if (data.password.length < 8) {
            errors.password = "La contraseña debe tener al menos 8 caracteres";
        } else if (!/[A-Z]/.test(data.password)) {
            errors.password = "La contraseña debe incluir al menos una letra mayúscula";
        } else if (!/[0-9]/.test(data.password)) {
            errors.password = "La contraseña debe incluir al menos un número";
        }
    }

  // Validación de la confirmación de contraseña
    if (!data.confirmPassword) {
        errors.confirmPassword = "Por favor confirma tu contraseña";
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
}

// Función auxiliar para validar el formato de correo electrónico
function isValidEmail(email: string): boolean {
    // Expresión regular simple para validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para verificar si hay algún error en la validación
export function hasErrors(errors: ValidationErrors): boolean {
    return Object.keys(errors).length > 0;
}