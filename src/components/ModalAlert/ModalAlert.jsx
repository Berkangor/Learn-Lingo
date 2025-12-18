import { useState } from "react";
import LogIn from "../LogIn/LogIn";
import Modal from "../Modal/Modal";
import css from "./ModalAlert.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function ModalAlert({ isModalAlertOpen, setIsModalAlertOpen }) {
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const handleSubmit = async () => {
    try {
      setIsModalAlertOpen(false);
      setIsLogInOpen(true);
    } catch (error) {
      toast.error("Failed. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalAlertOpen}
        onClose={() => setIsModalAlertOpen(false)}
      >
        <h2 className={css.title}>Alert</h2>
        <p className={css.descr}>
          Adding teachers to favorites is only allowed for authorized users.
        </p>
        <p className={css.question}>Do you want to log in?</p>
        <div className={css.btnContainer}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`${css.btn} ${css.btnYes}`}
          >
            Yes
          </button>
          <button
            type="submit"
            onClick={() => setIsModalAlertOpen(false)}
            className={css.btn}
          >
            No
          </button>
        </div>
      </Modal>
      <LogIn isLogInOpen={isLogInOpen} setIsLogInOpen={setIsLogInOpen} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}