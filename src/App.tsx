import "./App.css";
import HabitCard from "./components/HabitCard";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import type { AuthResponse } from "./api/auth";
import {
  getHabits,
  saveHabit,
  deleteHabit,
  checkInHabit,
  getHabitStreak,
} from "./api/habits";
import type { Habit } from "./api/habits";
import LandingPage from "./components/LandingPage";
import ProgressSummary from "./components/ProgressSummary";
import DeleteHabitModal from "./components/DeleteHabitModal";

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<Habit["frequency"]>("daily");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [session, setSession] = useState<AuthResponse | null>(null);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
  const [habitError, setHabitError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");

  async function handleSaveHabit() {
    const trimmedName = name.trim();

    if (!session || !trimmedName || isSaving) {
      return;
    }

    setHabitError("");
    setIsSaving(true);

    try {
      const savedHabit = await saveHabit(
        session.token,
        {
          name: trimmedName,
          frequency,
        },
        editingId,
      );

      setHabits((currentHabits) =>
        editingId === null
          ? [...currentHabits, { ...savedHabit, streak: 0 }]
          : currentHabits.map((habit) =>
              habit.id === editingId ? { ...habit, ...savedHabit } : habit,
            ),
      );

      setName("");
      setFrequency("daily");
      setEditingId(null);
    } catch (error) {
      setHabitError(
        error instanceof Error ? error.message : "Unable to save habit",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteHabit(id: number) {
    if (!session || isSaving) {
      return;
    }

    setHabitError("");
    setIsSaving(true);

    try {
      await deleteHabit(session.token, id);
      setHabitToDelete(null);

      setHabits((currentHabits) =>
        currentHabits.filter((habit) => habit.id !== id),
      );

      if (editingId === id) {
        handleCancelEdit();
      }
    } catch (error) {
      setHabitError(
        error instanceof Error ? error.message : "Unable to delete habit",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleEditHabit(id: number) {
    const habitToEdit = habits.find((habit) => habit.id === id);

    if (!habitToEdit) {
      return;
    }

    setEditingId(id);
    setName(habitToEdit.name);
    setFrequency(habitToEdit.frequency);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setName("");
    setFrequency("daily");
  }
  function handleLogout() {
    setSession(null);
    setHabits([]);
    setEditingId(null);
    setName("");
    setFrequency("daily");
    setHabitToDelete(null);
    setHabitError("");
    setAuthMode("login");
  }
  async function handleLoginSuccess(data: AuthResponse) {
    const userHabits = await getHabits(data.token);

    const habitsWithStreaks = await Promise.all(
      userHabits.map(async (habit) => ({
        ...habit,
        streak: await getHabitStreak(data.token, habit.id),
      })),
    );

    setHabits(habitsWithStreaks);
    setSession(data);
  }

  async function handleCheckIn(id: number) {
    if (!session || isSaving) {
      return;
    }

    setHabitError("");
    setIsSaving(true);

    try {
      await checkInHabit(session.token, id);

      // Mark it as checked in immediately after success.
      setHabits((currentHabits) =>
        currentHabits.map((habit) =>
          habit.id === id ? { ...habit, streak: 1 } : habit,
        ),
      );

      try {
        const streak = await getHabitStreak(session.token, id);

        setHabits((currentHabits) =>
          currentHabits.map((habit) =>
            habit.id === id ? { ...habit, streak } : habit,
          ),
        );
      } catch {
        setHabitError(
          "Check-in saved, but the full streak could not be loaded. Log in again to refresh it.",
        );
      }
    } catch (error) {
      setHabitError(
        error instanceof Error ? error.message : "Unable to check in",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (session === null) {
    return (
      <>
        <LandingPage onChooseAuth={setAuthMode} />

        <main id="get-started" className="auth-section">
          <LoginForm
            key={authMode}
            initialMode={authMode}
            onLogin={handleLoginSuccess}
          />
        </main>
      </>
    );
  }
  return (
    <main className="app">
      <header className="app-header">
        <span className="dashboard-eyebrow">YOUR PERSONAL GROWTH SPACE</span>
        <h1>A little progress, every day.</h1>
        <p>Your habits don’t have to be perfect. Just keep showing up.</p>
        <div className="account-bar">
          <span>Signed in as {session.user.email}</span>

          <button
            className="edit-habit-button"
            type="button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>

      <ProgressSummary habits={habits} />
      <section className="habits-section">
        <h2>My habits</h2>

        <form
          className="habit-form"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSaveHabit();
          }}
        >
          <div className="form-field">
            <label htmlFor="habit-name">Habit name</label>

            <input
              id="habit-name"
              type="text"
              placeholder="For example, Study spanish"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isSaving}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="habit-frequency">Frequency</label>

            <select
              id="habit-frequency"
              value={frequency}
              disabled={isSaving}
              onChange={(event) => {
                const value = event.target.value;

                if (value === "daily" || value === "weekly") {
                  setFrequency(value);
                }
              }}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <button
            className="add-habit-button"
            type="submit"
            disabled={!name.trim() || isSaving}
          >
            {isSaving
              ? "Saving..."
              : editingId !== null
                ? "Save changes"
                : "+ Add habit"}
          </button>

          {editingId !== null && (
            <button
              className="edit-habit-button"
              type="button"
              onClick={handleCancelEdit}
              disabled={isSaving}
            >
              Cancel
            </button>
          )}
        </form>
        {habitError && (
          <p className="form-error" role="alert">
            {habitError}
          </p>
        )}
        {habits.length === 0 && (
          <p>No habits yet. Add your first habit above 🌱</p>
        )}
        <div className="habit-list">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              name={habit.name}
              frequency={habit.frequency}
              onDelete={() => {
                setHabitError("");
                setHabitToDelete(habit);
              }}
              disabled={isSaving}
              onEdit={() => handleEditHabit(habit.id)}
              onCheckIn={() => void handleCheckIn(habit.id)}
            />
          ))}
        </div>
      </section>
      {habitToDelete !== null && (
        <DeleteHabitModal
          habitName={habitToDelete.name}
          isBusy={isSaving}
          error={habitError}
          onCancel={() => {
            setHabitToDelete(null);
            setHabitError("");
          }}
          onConfirm={() => void handleDeleteHabit(habitToDelete.id)}
        />
      )}
    </main>
  );
}

export default App;
