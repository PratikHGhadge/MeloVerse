import * as Yup from "yup";
export const LoginValidateYupSchema = Yup.object({
  email: Yup.string().email("Enter the valid email address"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is Required!"),
});
export const emailValidateYupSchema = Yup.object({
  email: Yup.string().email("Enter the valid email address"),
});

export const signUpValidateYupSchema = Yup.object({
  userName: Yup.string(),
  email: Yup.string().email("Enter the valid email address"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is Required!"),
  ConfirmPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is Required!"),
});

export const postValidationSchema = Yup.object({
  title: Yup.string()
    .required("Please enter a title for your post.")
    .min(3, "Title must be at least 3 characters long.")
    .max(255, "Title cannot exceed 255 characters."),
  content: Yup.string()
    .required("Please enter content for your post.")
    .min(10, "Content must be at least 10 characters long."),
  poster: Yup.mixed(),
});
