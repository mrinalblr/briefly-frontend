import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

const SummarizerResponseDisplay = ({ responseText }) => {
  if (!responseText) return null;

  return (
    <div
      className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg my-8
                 bg-white bg-opacity-70 backdrop-blur-sm overflow-y-auto"
      style={{ maxHeight: '600px', animation: 'fadeIn 0.8s ease forwards' }}
    >
      <div className="prose prose-indigo prose-lg">
        <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
          {responseText}
        </ReactMarkdown>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>

  );
};

export default SummarizerResponseDisplay;
