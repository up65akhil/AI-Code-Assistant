import { assets } from '../assets/assets';
import momemt from 'moment';
import { useEffect } from 'react';
import Markdown from 'react-markdown';
import Prism from 'prismjs';
const Message = ({ message }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [message.content]);
  return (
    <div>
      {message.role === 'user' ? (
        <div className="flex justify-end item-start  my-4 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg=[#57317c]/30 border border=[#80609f]/30 rounded-md max-w-2xl">
            <p className="text-sm dark:text-[#7521c5]">{message.content}</p>
            <span className="text-xs text-gray-400  dark:text:text=[#b1a6c0">
              {momemt(message.timestamp).fromNow()}
            </span>
          </div>
          <img
            src={assets.user_icon}
            className="w-8 h-8 not-dark:invert rounded-full"
          />
        </div>
      ) : (
        <div className=" flex flex-col gap-2 p-2 px-4  max-w-2xl bg-primary/20 dark:bg-[#57317c]/30 border border-[#80609f]/30 rounded-md">
          {message.isImage ? (
            <img
              src={message.content}
              alt="Generated"
              className="w-full max-w-md mt-2 rounded-md"
            />
          ) : (
            <div className="text-sm dark:text-primary reset-tw">
              <Markdown>{message.content}</Markdown>
            </div>
          )}
          <span className="text-xs text-gray-400 dark:text=[#b1a6c0]">
            {momemt(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
