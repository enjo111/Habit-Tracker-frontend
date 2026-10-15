import { useEffect, useRef } from "react";

type DeleteHabitModalProps = {
  habitName: string;
  isBusy: boolean;
  error: string;
  onCancel: () => void;
  onConfirm: () => void;
};

function DeleteHabitModal({
  habitName,
  isBusy,
  error,
  onCancel,
  onConfirm,
}: DeleteHabitModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    dialog?.showModal();

    return () => {
      dialog?.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="delete-modal"
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
      onCancel={(event) => {
        event.preventDefault();

        if (!isBusy) {
          onCancel();
        }
      }}
    >
      <span className="modal-eyebrow">A MOMENT TO CONFIRM</span>
      <h2 id="delete-title">Let this habit go?</h2>

      <p id="delete-description">
        Are you sure you want to delete “{habitName}”?
        This action cannot be undone.
      </p>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="modal-actions">
        <button
          className="edit-habit-button"
          type="button"
          onClick={onCancel}
          disabled={isBusy}
          autoFocus
        >
          Keep habit
        </button>

        <button
          className="delete-habit-button"
          type="button"
          onClick={onConfirm}
          disabled={isBusy}
        >
          {isBusy ? "Deleting..." : "Delete habit"}
        </button>
      </div>
    </dialog>
  );
}

export default DeleteHabitModal;