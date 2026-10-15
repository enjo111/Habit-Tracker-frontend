type HabitCardProps = {
  name: string;
  frequency: "daily" | "weekly";
  onDelete: () => void;
  onEdit: () => void;
  disabled: boolean;
  streak?: number;
  onCheckIn: () => void;
};

function HabitCard({
  name,
  frequency,
  onDelete,
  onEdit,
  disabled,
  streak,
  onCheckIn,
}: HabitCardProps) {
  return (
    <article className="habit-card">
      <div className="habit-card-content">
        <h3>{name}</h3>

        <span className="frequency-badge">
          {frequency === "daily" ? "Daily" : "Weekly"}
          <p className="habit-streak">🔥 Daily streak: {streak ?? 0}</p>
        </span>

        {streak !== undefined && (
          <span className="streak-badge">Streak: {streak}</span>
        )}
      </div>
      <button
      
        className="check-in-button"
        type="button"
        onClick={onCheckIn}
        disabled={disabled || (streak ?? 0) > 0}
      >
        {(streak ?? 0) > 0 ? "✓ Checked in today" : "Check in today"}
      </button>
      <button
        className="edit-habit-button"
        type="button"
        onClick={onEdit}
        aria-label={`Edit ${name}`}
        disabled={disabled}
      >
        Edit
      </button>

      <button
        className="delete-habit-button"
        type="button"
        onClick={onDelete}
        aria-label={`Delete ${name}`}
        disabled={disabled}
      >
        Delete
      </button>
    </article>
  );
}

export default HabitCard;
