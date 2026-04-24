import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import Message from './Message';

const DebugAssistant = () => {
  const { axios, token, selectedChat, createNewChat } = useAppContext();
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState([]);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (!file) return;

    // setFileName(file.name);

    // Create a new FileReader instance
    const reader = new FileReader();

    // Define what happens when reading finishes
    reader.onload = (event) => {
      setInputText(event.target.result); // file text content
      console.log('File content:', event.target.result);
    };

    // Define what happens in case of error
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    // Read file as plain text
    reader.readAsText(file);
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText && !selectedFile) {
      setMessages([]);
      setResponse('');
      toast.error('Please enter code or upload a file.');

      return;
    }

    setLoading(true);
    try {
      let chatId = selectedChat?._id;
      if (!chatId) {
        const newChat = await createNewChat();
        chatId = newChat?._id;
        if (!chatId) {
          toast.error('Failed to create chat');
          return;
        }
      }

      const { data } = await axios.post(
        '/api/message/text',
        {
          chatId,
          prompt: `Debug and optimize the following code: ${inputText}`,
          mode: 'text',
          isPublished: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      if (data.success) {
        setResponse(data.reply.content);
        setMessages((prevMessages) => [...prevMessages, data.reply]);
        toast.success('Analysis complete!');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Error analyzing file');
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* --- Left Panel: Input Section --- */}
      <div className="md:w-1/2 w-full p-6 flex flex-col justify-center items-center border-r border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center">Code Input</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              console.log(e.target.value, inputText);
              setSelectedFile(null);
            }}
            placeholder="Paste or type your code snippet here..."
            rows="20"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary outline-none"
          />

          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.cs,.txt"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary dark:hover:border-primary transition-colors duration-200 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors duration-200">
                  Choose a file
                </span>
              </label>
            </div>
            {selectedFile && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {selectedFile.name}
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456f7] to-[#3d81f6] rounded-lg hover:from-[#3d81f6] hover:to-[#A456f7] transition-all duration-300 text-sm cursor-pointer"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>
      </div>

      {/* --- Right Panel: Output Section --- */}
      <div className="md:w-1/2 w-full p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">AI Output</h2>

        <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-auto">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400 p-4 text-center">
              Analyzing code...
            </p>
          ) : response ? (
            <>
              {' '}
              {messages.length > 0 &&
                messages.map((msg, index) => (
                  <Message key={index} message={msg} />
                ))}
            </>
          ) : (
            <p className="text-gray-400 dark:text-gray-500 text-center mt-10">
              Submit your code or upload a file to see results here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugAssistant;
