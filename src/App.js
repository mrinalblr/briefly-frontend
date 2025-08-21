import React, { useState } from 'react';
import SummarizerResponseDisplay from './components/SummarizerResponseDisplay';

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 mr-2 text-white inline-block"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
    />
  </svg>
);

function App() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);
    setResponseText('');

    try {
      const response = await fetch('http://localhost:8081/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error('Failed to fetch summary');

      const data = await response.json();
      const text = data.candidates?.[0].content?.parts?.[0].text || 'No summary available';
      setResponseText(text);
    } catch (err) {
      setError(err.message || 'Error fetching summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex flex-col items-center justify-start p-6">
      <h1 className="text-white text-5xl font-extrabold mb-8 drop-shadow-lg">
      Briefly
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 max-w-3xl w-full shadow-lg mb-10"
      >
        <textarea
          className="w-full h-40 p-4 rounded-lg bg-white bg-opacity-80 placeholder-indigo-300 text-indigo-900 text-lg font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          placeholder="Type or paste the text you want summarized..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          spellCheck={false}
        />

        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className={`mt-5 w-full flex items-center justify-center font-semibold text-white py-3 rounded-lg shadow-lg transition ${
            loading || !inputText.trim()
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-700 hover:bg-indigo-800'
          }`}
        >
          {loading ? (
            <>
              <Spinner /> Summarizing...
            </>
          ) : (
            'Summarize Now'
          )}
        </button>
      </form>

      {error && (
        <div className="bg-red-600 bg-opacity-80 text-white px-6 py-3 rounded-lg max-w-3xl w-full text-center mb-8 shadow-lg">
          {error}
        </div>
      )}

      <div className="max-w-3xl w-full">
        <SummarizerResponseDisplay responseText={responseText} />
      </div>
    </div>
  );
}

export default App;
