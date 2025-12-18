import Modal from "../Modal/Modal";
import css from "./Registration.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../api/firebase";
import { ref, set } from "firebase/database";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function Registration({
  isRegistrationOpen,
  setIsRegistrationOpen,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too long!")
      .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
      .required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password too long")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/\d/, "Must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Must contain at least one special character (@$!%*?&)"
      )
      .required("Required"),
  });

  const initValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    const { name, email, password } = values;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("Registered is successfully!");
      await set(ref(db, "users/" + user.uid), {
        name: name,
        email: email,
      });

      actions.resetForm();
      setIsRegistrationOpen(false);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error:", errorCode, errorMessage);
      toast.error("Failed. Please try again.");
    }
  };

  return (
    <>
      <Modal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      >
        <h2 className={css.title}>Registration</h2>
        <p className={css.descr}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
        <Formik
          initialValues={initValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          <Form className={css.form}>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="span" className={css.error} />
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
              Sign Up
            </button>
          </Form>
        </Formik>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}