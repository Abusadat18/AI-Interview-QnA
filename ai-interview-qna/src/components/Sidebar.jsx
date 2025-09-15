export default function Sidebar({ session }) {
  return (
    <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Session History</h2>
      {session.length === 0 && <p>No questions yet</p>}
      <ul>
        {session.map((item, index) => (
          <li key={index} className="mb-2">
            <p className="font-bold">{item.question}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
