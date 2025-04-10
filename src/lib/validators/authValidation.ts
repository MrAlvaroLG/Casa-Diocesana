export const validateName = (nombre:string) => {
  if (nombre.length < 3) return "El nombre debe tener al menos 3 caracteres";
  if (nombre.length > 50) return "El nombre no puede tener más de 50 caracteres";
  if (!/^[a-zA-Z\s]+$/.test(nombre))return "El nombre solo puede contener letras y espacios";
  return null;
};

export const validateNumber = (numero:string) => {
  if (numero.length < 8 || numero.length > 15) return "El número no es valido";
  if (!/^\d+$/.test(numero)) return "El número solo puede contener dígitos";
  return null;
};

export const validateUserType = (userType:string) => {
  if (!userType) return "Seleccione su tipo de usuario";
  if (userType !== "Laico" && userType !== "Religiosa" && userType !== "Religioso" && userType !== "Diacono" && userType !== "Sacerdote") return "El tipo de usuario no es valido";
  return null;
};

export const validateEmail = (email:string) => {
  if (email.length < 5 || email.length > 50) return "El email no es valido";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "El email no es valido";
  return null;
}

export const validatePassword = (password:string) => {
  if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres";
  if (!/[A-Z]/.test(password)) return "La contraseña debe contener al menos una letra mayúscula";
  if (!/[a-z]/.test(password)) return "La contraseña debe contener al menos una letra minúscula";
  if (!/[0-9]/.test(password)) return "La contraseña debe contener al menos un número";
  return null;
}

export const validateConfirmPassword = (password:string, confirmPassword:string) => {
  if (!confirmPassword) return "Debe confirmar su contraseña";
  if (password !== confirmPassword) return "Las contraseñas no coinciden";
  return null;
}