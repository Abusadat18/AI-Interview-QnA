import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-yellow-100">
      <h1 className="text-4xl font-bold mb-6">AI Interview QnA</h1>
      <p className="mb-6 text-center max-w-xl">
        Practice technical and HR interviews powered by AI. Get instant feedback
        and improve your skills.
      </p>
      <button
        className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800"
        onClick={() => navigate("/practice")}
      >
        Start Practice
      </button>
    </div>
  );
}
