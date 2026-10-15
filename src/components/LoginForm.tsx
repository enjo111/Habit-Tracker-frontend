import { useState } from "react";
import { login, register } from "../api/auth";
import type { AuthResponse } from "../api/auth";

type LoginFormProps = {
  onLogin: (data: AuthResponse) => Promise<void>;
  initialMode?: "login" | "register";
};

function LoginForm({ onLogin, initialMode="login" }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(initialMode === "register");

  async function handleLogin() {
    setError("");
    setIsLoading(true);

    try {
      const authenticate = isRegistering ? register : login;
      const data = await authenticate(email.trim(), password);
      await onLogin(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to log in. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="login-panel">
      <h2>{isRegistering ? "Start your journey" : "Welcome back"}</h2>
      <p>
        {isRegistering
          ? "Create an account and build your first habit."
          : "Log in to keep building your habits."}
      </p>

      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault();
          void handleLogin();
        }}
      >
        <div className="form-field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete={isRegistering ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            disabled={isLoading}
            required
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button className="add-habit-button" type="submit" disabled={isLoading}>
          {isLoading
            ? isRegistering
              ? "Creating account..."
              : "Logging in..."
            : isRegistering
              ? "Create account"
              : "Log in"}
        </button>
      </form>
      <button
        className="auth-switch"
        type="button"
        disabled={isLoading}
        onClick={() => {
          setIsRegistering((current) => !current);
          setError("");
          setPassword("");
        }}
      >
        {isRegistering
          ? "Already have an account? Log in"
          : "New here? Create an account"}
      </button>
    </section>
  );
}

export default LoginForm;
