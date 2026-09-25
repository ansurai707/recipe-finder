// A small, reusable component for the loading state.
// Keeping it separate means we can reuse the same spinner/message
// anywhere in the app (Home page, Recipe Details page, etc).
function Loading({ message = "Finding delicious recipes..." }) {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default Loading;
