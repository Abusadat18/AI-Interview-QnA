export default function InputBox({ currentInput, setCurrentInput, onSend, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentInput.trim() !== "") {
      onSend(currentInput);
      setCurrentInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 border-t">
      <input
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Type your answer..."
        className="flex-1 p-2 border rounded mr-2"
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
