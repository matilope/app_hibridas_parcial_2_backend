import yup from 'yup';

export const VoteCreateSchema = yup.object({
  account_id: yup.string().required("El identificador de la cuenta es requerida"),
  account_name: yup.string().required("El nombre es requerido"),
  comment: yup.string().required("El comentario es requerido"),
  game_id: yup.string().required("El identificador del juego es requerido"),
  rating: yup.number()
    .typeError("La calificación tiene que ser un número")
    .min(1, "La calificación debe ser igual o mayor a 1")
    .max(5, "La calificación debe ser igual o menor a 5")
    .required("La calificación es requerida")
});