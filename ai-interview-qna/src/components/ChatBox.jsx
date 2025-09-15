export default function ChatBox({ session }) {
  return (
    <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
      {session.map((item, index) => (
        <div key={index}>
          <p className="font-bold">Q: {item.question}</p>
          <p className="ml-4 text-gray-700">A: {item.answer}</p>
        </div>
      ))}
    </div>
  );
}
