type LandingPageProps = {
  onChooseAuth: (mode: "login" | "register") => void;
};

function LandingPage({ onChooseAuth }: LandingPageProps) {
  return (
    <div className="landing">
      <nav className="landing-nav" aria-label="Main navigation">
        <a className="landing-brand" href="#">
          🌱 Habit Tracker
        </a>

        <a
          className="landing-login"
          href="#get-started"
          onClick={() => onChooseAuth("login")}
        >
          Log in →
        </a>
      </nav>

      <section className="landing-hero">
        <span className="landing-eyebrow">A LITTLE BETTER, EVERY DAY</span>

        <h1>
          Small habits.
          <br />
          <span>Meaningful change.</span>
        </h1>

        <p>
          Make space for what matters. Build your habits, check in each day, and
          watch your consistency grow—one small step at a time.
        </p>

        <a
          className="landing-cta"
          href="#get-started"
          onClick={() => onChooseAuth("register")}
        >
          Start your journey →
        </a>

        <span className="landing-note">
          Your habits. Your pace. Your progress.
        </span>
      </section>

      <section className="landing-how" aria-labelledby="how-heading">
        <span className="landing-eyebrow">SIMPLE BY DESIGN</span>
        <h2 id="how-heading">A little structure. A lot of possibility.</h2>

        <div className="landing-steps">
          <article className="landing-step">
            <span className="step-number">01</span>
            <h3>Choose your habits</h3>
            <p>
              Start with something meaningful and choose a daily or weekly
              frequency.
            </p>
          </article>

          <article className="landing-step">
            <span className="step-number">02</span>
            <h3>Show up and check in</h3>
            <p>
              Record your effort with a simple check-in. Small actions deserve
              recognition.
            </p>
          </article>

          <article className="landing-step">
            <span className="step-number">03</span>
            <h3>Build your consistency</h3>
            <p>
              Follow your daily streaks and keep returning to the habits that
              matter to you.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
