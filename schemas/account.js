import yup from 'yup';

export const AccountCreateSchema = yup.object({
  name: yup.string()
  .typeError("El nombre tiene que ser una cadena de texto")
  .min(2, "El nombre tiene que tener un mínimo de 2 caracteres")
  .required("El nombre es requerido"),
  email: yup.string()
    .typeError("El correo tiene que ser una cadena de texto")
    .email("Tiene que ser un correo electrónico válido")
    .min(5, "El correo tiene que tener un mínimo de 5 caracteres")
    .required("El correo es requerido"),
  password: yup.string()
    .typeError("La contraseña tiene que ser una cadena de texto")
    .min(8, "La contraseña tiene que tener un mínimo de 8 caracteres")
    .required("La contraseña es requerida")
});