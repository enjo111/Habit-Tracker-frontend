import type { Habit } from "../api/habits";

type ProgressSummaryProps = {
  habits: Habit[];
};

function ProgressSummary({ habits }: ProgressSummaryProps) {
  const dailyHabits = habits.filter(
    (habit) => habit.frequency === "daily"
  );

  const completedDaily = dailyHabits.filter(
    (habit) => (habit.streak ?? 0) > 0
  ).length;

  const percentage =
    dailyHabits.length === 0
      ? 0
      : Math.round((completedDaily / dailyHabits.length) * 100);

  return (
    <section className="progress-summary" aria-label="Habit overview">
      <div className="summary-stats">
        <article className="summary-stat">
          <span>Total habits</span>
          <strong>{habits.length}</strong>
          <small>Small commitments that matter</small>
        </article>

        <article className="summary-stat">
          <span>Daily check-ins today</span>
          <strong>
            {completedDaily}
            <span className="stat-total"> / {dailyHabits.length}</span>
          </strong>
          <small>Every check-in is a step forward</small>
        </article>

        <article className="summary-stat">
          <span>Weekly habits</span>
          <strong>{habits.length - dailyHabits.length}</strong>
          <small>Make room for your bigger routines</small>
        </article>
      </div>

      <div className="daily-progress">
        <div className="progress-heading">
          <h2>Today’s daily habits</h2>
          <span>{percentage}% checked in</span>
        </div>

        <progress
          className="habit-progress"
          value={completedDaily}
          max={dailyHabits.length || 1}
          aria-label="Daily habits checked in today"
        />

        <p>
          {dailyHabits.length === 0
            ? "Add a daily habit to start tracking your day."
            : completedDaily === dailyHabits.length
              ? "All daily habits checked in. Take a moment to enjoy that."
              : "Keep showing up. Your next small step counts."}
        </p>
      </div>
    </section>
  );
}

export default ProgressSummary;