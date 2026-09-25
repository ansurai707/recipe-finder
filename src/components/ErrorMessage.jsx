// A small, reusable component for showing friendly error messages.
function ErrorMessage({ message = "Something went wrong. Please try again." }) {
  return (
    <div className="error-message">
      <span className="error-icon">⚠️</span>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
