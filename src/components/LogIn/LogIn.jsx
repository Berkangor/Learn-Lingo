import Modal from "../Modal/Modal";
import css from "./LogIn.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function LogIn({ isLogInOpen, setIsLogInOpen }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const FeedbackSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password too long")
      .required("Required"),
  });
  const initValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);
      toast.success("Logged is successfully!");
      actions.resetForm();
      setIsLogInOpen(false);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error("Failed. Please try again.");
      console.error("Error:", errorCode, errorMessage);
    }
  };

  return (
    <>
      <Modal isOpen={isLogInOpen} onClose={() => setIsLogInOpen(false)}>
        <h2 className={css.title}>Log In</h2>
        <p className={css.descr}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
        <Formik
          initialValues={initValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          <Form className={css.form}>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="span" className={css.error} />
            <div className={css.inputPassword}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
              />
              <button
                className={css.iconEye}
                type="button"
                onClick={togglePasswordVisibility}
              >
                <svg
                  width="20"
                  height="20"
                  className={showPassword && css.iconEyeColor}
                >
                  <use href="/sprite.svg#icon-eye-off"></use>
                </svg>
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
            <button type="submit" className={css.btn}>
              Log In
            </button>
          </Form>
        </Formik>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}