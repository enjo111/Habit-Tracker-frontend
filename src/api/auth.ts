export type AuthResponse = {
  user: {
    id: number;
    email: string;
  };
  token: string;
};

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        data.error?.message ??
        "Unable to log in"
    );
  }

  return data;
}

export async function register(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        data.error?.message ??
        "Unable to create account"
    );
  }

  return data;
}