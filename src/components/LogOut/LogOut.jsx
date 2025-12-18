import Modal from "../Modal/Modal";
import css from "./LogOut.module.css";
import toast, { Toaster } from "react-hot-toast";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LogOut({ isLogOutOpen, setIsLogOutOpen }) {
    const navigate = useNavigate();

  const handleSubmit = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
       navigate("/");
      toast.success("Log out is successfully!");
      setIsLogOutOpen(false);
    } catch (error) {
      toast.error("Failed. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isLogOutOpen} onClose={() => setIsLogOutOpen(false)}>
        <h2 className={css.title}>Log Out</h2>
        <p className={css.descr}>Are you sure?</p>
        <div className={css.btnContainer}>
          <button
            type="submit"
            onClick={() => setIsLogOutOpen(false)}
            className={`${css.btn} ${css.btnNo}`}
          >
            No
          </button>
          <button type="submit" onClick={handleSubmit} className={css.btn}>
            Yes
          </button>
        </div>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}