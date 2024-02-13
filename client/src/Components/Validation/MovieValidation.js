import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Коментар обов'язковий")
    .max(200, "Коментар має бути менше 200 символів"),
  rating: yup.number().required("Виберіть оцінку"),
});

const movieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Введіть назву фільму")
    .max(100, "Назва фільму має містити менше 100 символів"),
  time: yup.number().required("Введіть тривалість фільму"),
  language: yup.string().required("Введіть країну фільму"),
  year: yup.number().required("Введіть рік випуску"),
  category: yup.string().required("Виберіть категорію фільму"),
  desc: yup
    .string()
    .required("Введіть опис фільму")
    .max(2000, "Опис фільму не повинен перевищувати 2000 символів"),
});

export { ReviewValidation, movieValidation };
