interface ChatMessageProps {
  fromCurrentUser: boolean;
  content: string;
  created_at: string;
  studentName: string;
}

const ChatMessage = ({ fromCurrentUser, content, created_at, studentName }: ChatMessageProps) => {
  return (
    <div className={`flex flex-row w-full ${fromCurrentUser && "justify-end"}`}>
      <div className={`relative max-w-xl break-words break-all rounded-lg p-3 ${fromCurrentUser ? "bg-contrasthover rounded-tr-none" : "bg-color20 rounded-tl-none"}`}>
        <div className="font-bold">
          {studentName}
        </div>
          {content}
        <div className="absolute -bottom-6 text-sm right-1">
          {created_at}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
