"use client";
import { useEffect, useState } from "react";
import { createClient } from "utils/supabase/client";
import ChatMessage from "./ChatMessage";
import AlwaysScrollIntoView from "./AlwaysScrollIntoView";
import type { FormEvent, ChangeEvent, TouchEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";

interface Message {
  content: string;
  user_id: string;
  id: string;
  created_at: string;
  studentName: string;
  timeCreate: string;
}
interface ChatProps {
  session: Session;
  class_id: string;
  studentName: string;
}

const Chat = ({ session, class_id, studentName }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (
    e: FormEvent<HTMLFormElement> | TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (isLoading || !session?.user) return false;

    try {
      setIsLoading(true);
      const supabase = createClient();
      await supabase
        .from("messages")
        .insert([
          {
            content: message,
            user_id: session.user.id,
            class_id,
            studentName,
            timeCreate: time(new Date().toISOString()),
          },
        ]);

      setMessage("");
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const supabase = createClient();

      const { data: messages, error } = await supabase
        .from("messages")
        .select()
        .eq("class_id", class_id)
        .order("created_at", { ascending: false });

      if (!error) {
        setMessages(messages);
      } else {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const supabase = createClient();

    const messagesChannel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload: any) => {
          setMessages((m) => [payload.new as Message, ...m]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
    };
  }, []);

  function time(timestamp: string) {
    const date = new Date(timestamp);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <div
      className="w-screen h-screen flex flex-col"
      style={{
        backgroundImage: "url(/img/bg-chat.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col-reverse flex-auto p-6 overflow-y-auto space-y-6 space-y-reverse min-h-[0px] text-slate-900">
        <AlwaysScrollIntoView />

        {messages.length > 0 &&
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              fromCurrentUser={msg.user_id === session!.user!.id}
              content={msg.content ?? ""}
              created_at={msg.timeCreate}
              studentName={msg.studentName}
            />
          ))}
      </div>

      <form
        className="relative p-2 px-6 items-center flex flex-row flex-none bg-color60 gap-x-3"
        onSubmit={handleSendMessage}
      >
        <Link
          className="bg-color100 text-white p-2 rounded hover:bg-color80 min-w-24 flex justify-center"
          href="/dashboard/student"
        >
          Go Back
        </Link>
        <input
          className={`flex-grow bg-white rounded p-2 focus:outline-none w-1 md:w-full ${
            isLoading ? "text-slate-600" : "text-slate-900"
          }`}
          autoFocus
          type="text"
          value={message}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />

        <button
          className="rounded text-white p-2 bg-color100 hover:bg-color80 disabled:bg-slate-400"
          type="submit"
          disabled={isLoading || !message || !message.length}
          onTouchEnd={handleSendMessage}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
