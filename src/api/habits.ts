export type Habit = {
  id: number;
  name: string;
  frequency: "daily" | "weekly";
  streak?: number;
};

export async function getHabits(token: string): Promise<Habit[]> {
  const response = await fetch("/api/habits", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        data.error?.message ??
        "Unable to load habits"
    );
  }

  return data;
}

export async function saveHabit(
  token: string,
  habit: Pick<Habit, "name" | "frequency">,
  id: number | null
): Promise<Habit> {
  const path = id === null ? "/api/habits" : `/api/habits/${id}`;

  const response = await fetch(path, {
    method: id === null ? "POST" : "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(habit),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        data.error?.message ??
        "Unable to save habit"
    );
  }

  return data;
}

export async function deleteHabit(
  token: string,
  id: number
): Promise<void> {
  const response = await fetch(`/api/habits/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        data.error?.message ??
        "Unable to delete habit"
    );
  }
}

export async function checkInHabit(
  token: string,
  id: number
): Promise<void> {
  const response = await fetch(`/api/habits/${id}/checks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        data.error?.message ??
        "Unable to check in"
    );
  }
}

export async function getHabitStreak(
  token: string,
  id: number
): Promise<number> {
  const response = await fetch(`/api/habits/${id}/streak`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        data.error?.message ??
        "Unable to load streak"
    );
  }

  return data.streak;
}