import { useEffect } from "react";
import css from "./Modal.module.css";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    isOpen && (
      <div className={css.overlay} onClick={handleOverlayClick}>
        <div className={css.modal}>
          <button className={css.closeButton} onClick={onClose}>
            <svg width="26" height="24" className={css.closeIcon}>
              <use href="/sprite.svg#icon-close"></use>
            </svg>
          </button>
          {children}
        </div>
      </div>
    )
  );
}