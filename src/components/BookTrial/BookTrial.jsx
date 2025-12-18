import Modal from "../Modal/Modal";
import css from "./BookTrial.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

export default function BookTrial({ isBookOpen, setIsBookOpen, teacher }) {
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too long!")
      .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
      .required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phone: Yup.string()
      .matches(/^\+?\d{10,15}$/, "Invalid phone number")
      .required("Required"),
  });

  const initValues = {
    name: "",
    email: "",
    phone: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      console.log("values", values);
      actions.resetForm();

      toast.success("Sent successfully!");
      actions.resetForm();
      setIsBookOpen(false);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error("Failed. Please try again.");
      console.error("Error:", errorCode, errorMessage);
    }
  };

  return (
    <>
      <Modal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)}>
        <h2 className={css.title}>Book trial lesson</h2>
        <p className={css.descr}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div className={css.teacherBox}>
          <img className={css.avatar} src={teacher.avatar_url} alt="Avatar" />
          <div>
            <p className={css.littleTitle}>Your teacher</p>
            <h2 className={css.name}>
              {teacher.name} {teacher.surname}
            </h2>
          </div>
        </div>
        <Formik
          initialValues={initValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          <Form className={css.form}>
            <div className={css.radioWrapper}>
              <div className={css.radioBox}>
                <Field
                  type="radio"
                  id="Careerandbusiness"
                  name="learning"
                  value="Careerandbusiness"
                />
                <label htmlFor="Careerandbusiness">Career and business</label>
              </div>
              <div className={css.radioBox}>
                <Field
                  type="radio"
                  id="Lessonforkids"
                  name="learning"
                  value="Lessonforkids"
                />
                <label htmlFor="Lessonforkids">Lesson for kids</label>
              </div>
              <div className={css.radioBox}>
                <Field
                  type="radio"
                  id="Livingabroad"
                  name="learning"
                  value="Livingabroad"
                />
                <label htmlFor="Livingabroad">Living abroad</label>
              </div>
              <div className={css.radioBox}>
                <Field type="radio" id="Exams" name="learning" value="Exams" />
                <label htmlFor="Exams">Exams and coursework</label>
              </div>
              <div className={css.radioBox}>
                <Field
                  type="radio"
                  id="Culture"
                  name="learning"
                  value="Culture"
                />
                <label htmlFor="Culture">Culture, travel or hobby</label>
              </div>
            </div>

            <Field type="text" name="name" placeholder="Full Name" />
            <ErrorMessage name="name" component="span" className={css.error} />

            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="span" className={css.error} />

            <Field type="phone" name="phone" placeholder="Phone number" />
            <ErrorMessage name="phone" component="span" className={css.error} />

            <button type="submit" className={css.btn}>
              Book
            </button>
          </Form>
        </Formik>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}