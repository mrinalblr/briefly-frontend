import React, { useState, useRef } from 'react';
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
  // New state for file upload
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle textarea input change
  const handleTextChange = (e) => {
    setInputText(e.target.value);
    if (file) setFile(null); // reset file if user types
  };

  // Handle PDF file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (inputText) setInputText(''); // reset textarea if file selected
  };

  // Submit handler decides which flow to trigger
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputText.trim() && !file) return; // prevent submit if neither input

    setLoading(true);
    setError(null);
    setResponseText('');

    try {
      let summary = '';

      if (file) {
        // Upload file flow
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8081/api/summarize-file', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to fetch summary for file');

        const data = await response.json();
        summary = data.candidates?.[0].content?.parts?.[0].text || 'No summary available';
        setFile(null);
        if (fileInputRef.current) {
  fileInputRef.current.value = null;
}
      } else {
        // Text input flow
        const response = await fetch('http://localhost:8081/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: inputText }),
        });

        if (!response.ok) throw new Error('Failed to fetch summary for text');

        const data = await response.json();
        summary = data.candidates?.[0].content?.parts?.[0].text || 'No summary available';

      }

      setResponseText(summary);
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
        {/* Textarea input */}
        <textarea
          className="w-full h-40 p-4 rounded-lg bg-white bg-opacity-80 placeholder-indigo-300 text-indigo-900 text-lg font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          placeholder="Type or paste the text you want summarized..."
          value={inputText}
          onChange={handleTextChange}
          spellCheck={false}
          disabled={loading}
        />

        <div className="my-6 border-t border-white border-opacity-30 pt-6">
          <label className="block mb-2 font-semibold text-white opacity-90">Or upload a PDF file</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            disabled={loading}
            className="block w-full text-white rounded-lg p-2 file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-indigo-700 file:to-indigo-900 file:text-white file:font-semibold hover:file:from-indigo-800 hover:file:to-indigo-950 cursor-pointer"

          />
          {file && (
            <p className="mt-2 text-white font-medium opacity-80">Selected file: {file.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || (!inputText.trim() && !file)}
          className={`mt-5 w-full flex items-center justify-center font-semibold text-white py-3 rounded-lg shadow-lg transition ${
            loading || (!inputText.trim() && !file)
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
