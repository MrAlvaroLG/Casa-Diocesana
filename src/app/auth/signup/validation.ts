// Valida el email
export function isValidEmail(email: string): string {
  if (email === "") return "El correo electrónico es obligatorio.";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return "El correo electrónico no es válido.";
  }
  return "";
}
    
// Valida el numero de telefono
export function isValidPhone(phone: string): string {
  const phoneRegex = /^[0-9]{8}$/;
  if (phone === "") return "El número de teléfono es obligatorio.";
  if (!phoneRegex.test(phone)) return "El número no es valido.";
  return "";
}
  
// Valida el nombre
export function isValidName(name: string): string {
  if(name === "") return "El nombre es obligatorio.";
  if(name.length < 3) return "El nombre debe tener al menos 3 caracteres.";
  return "";
}
  
// Valida la contraseña
export function isValidPassword(password: string): string {
  if(password === "") return "La contraseña es obligatoria.";
  if(password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!(hasUppercase && hasLowercase && hasNumber)) {
    return "La contraseña debe incluir mayúsculas, minúsculas y números.";
  }
  if (!hasSpecialChar) {
    return "La contraseña debe incluir al menos un carácter especial (!@#$%^&*(),.?\":{}|<>).";
  }
  return "";
}
  
// Valida que las contraseñas coincidan
export function isPasswordMatch(password: string, confirmPassword: string): string {
  if (confirmPassword === "") return "Debe confirmar la contraseña.";
  if (password !== confirmPassword) return "Las contraseñas no coinciden.";
  return "";
}

// Valida el tipo de usuario
export function isValidUserType(userType: string): string {
  if (userType === "") return "Debe seleccionar un tipo de usuario.";
  const validTypes = ["Laico", "Religiosa", "Religioso", "Diacono", "Sacerdote"];
  if (!validTypes.includes(userType)) return "El tipo de usuario seleccionado no es válido.";
  return "";
}

export interface FormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string; // Añadido campo userType
}
  
export interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  userType?: string; // Añadido campo userType
}
  
// Valida todos los campos del formulario y devuelve un objeto con los errores.
export function validateForm(data: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  
  const nameError = isValidName(data.name);
  const phoneError = isValidPhone(data.phone);
  const emailError = isValidEmail(data.email);
  const passwordError = isValidPassword(data.password);
  const confirmPasswordError = isPasswordMatch(data.password, data.confirmPassword);
  const userTypeError = isValidUserType(data.userType);
  
  if (nameError) errors.name = nameError;
  if (phoneError) errors.phone = phoneError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  if (userTypeError) errors.userType = userTypeError;

  return errors;
}