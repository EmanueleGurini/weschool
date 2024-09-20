"use client";
import { useCallback, useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import { createClient } from "utils/supabase/client";
import ToastYes from "@/components/ToastYes";
import ToastNo from "@/components/ToastNo";
import Link from "next/link";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [toastYes, setToastYes] = useState<boolean>(false);
  const [toastNo, setToastNo] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      setToastNo(true);
      setMessage("Error loading user data!");
      setTimeout(() => {
        setToastNo(false);
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    avatar_url,
  }: {
    fullname: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      setToastYes(true);
      setMessage("Profile updated!");
      setTimeout(() => {
        setToastYes(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setToastNo(true);
      setMessage("Error updating the data!");
      setTimeout(() => {
        setToastNo(false);
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  const passwordRequirementsRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{6,}$/;

  async function updatePassword() {
    if (!newPassword || !confirmPassword) {
      setToastNo(true);
      setMessage("Please enter both password fields!");
      setTimeout(() => {
        setToastNo(false);
        setMessage("");
      }, 3000);
      return;
    }

    if (!passwordRequirementsRegex.test(newPassword)) {
      setToastNo(true);
      setMessage(
        "The password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character."
      );
      setTimeout(() => {
        setToastNo(false);
        setMessage("");
      }, 3000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setToastNo(true);
      setMessage("Passwords do not match!");
      setTimeout(() => {
        setToastNo(false);
        setMessage("");
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setToastYes(true);
      setMessage("Password updated successfully!");
      setTimeout(() => {
        setToastYes(false);
        setMessage("");
      }, 3000);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setToastNo(true);
      setMessage("Error updating password!");
      setTimeout(() => {
        setToastNo(false);
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {toastNo && (
        <ToastNo setMessage={setMessage} setClose={setToastNo}>
          {message}
        </ToastNo>
      )}
      {toastYes && (
        <ToastYes setMessage={setMessage} setClose={setToastYes}>
          {message}
        </ToastYes>
      )}
      <div className="flex min-h-screen items-center justify-center p-6 bg-color10">
        <div className="max-w-md w-full p-8 rounded-lg bg-white">
          <h2 className="text-center pb-4 text-2xl font-bold leading-9 tracking-tight text-color100">
            Profile Settings
          </h2>
          <div className="flex justify-center">
            <Avatar
              uid={user?.id ?? null}
              url={avatar_url}
              size={200}
              onUpload={(url) => {
                setAvatarUrl(url);
                updateProfile({ fullname, avatar_url: url });
              }}
            />
          </div>

          <label
            htmlFor="email"
            className="block pt-4 pb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            value={user?.email}
            disabled
            className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <div>
            <label
              htmlFor="fullName"
              className="block pt-4 pb-1 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullname || ""}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset"
            />
          </div>

          <div>
            <button
              className="w-full mt-4 bg-color100 text-color0 py-2 rounded-md hover:bg-color80 focus:outline-none focus:ring-1  focus:ring-offset-2"
              onClick={() => updateProfile({ fullname, avatar_url })}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update Name"}
            </button>
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block pt-4 pb-1 text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block pt-4 pb-1 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <button
                className="w-full bg-color100 text-color0 py-2 rounded-md hover:bg-color80 focus:outline-none focus:ring-1  focus:ring-offset-2 mt-4"
                onClick={updatePassword}
                disabled={loading}
              >
                {loading ? "Loading ..." : "Update Password"}
              </button>
            </div>

            <div>
              <form action="/auth/signout" method="post">
                <button
                  className="w-full bg-contrast text-color100 py-2 rounded-md hover:bg-contrasthover focus:outline-none focus:ring-1"
                  type="submit"
                >
                  Log out
                </button>
              </form>
            </div>

            <div className="flex justify-center">
              <Link
                className="text-sm font-bold text-color100 underline"
                href={`/?cacheBuster=${crypto.randomUUID()}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/?cacheBuster=${crypto.randomUUID()}`;
                }}
              >
                Go back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
