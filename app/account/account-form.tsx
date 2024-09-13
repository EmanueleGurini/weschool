"use client";
import { useCallback, useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import { useRouter } from "next/navigation";
import { createClient } from "utils/supabase/client";
import ToastYes from "@/components/ToastYes";
import ToastNo from "@/components/ToastNo";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [toastYes, setToastYes] = useState<boolean>(false)
  const [toastNo, setToastNo] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

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
      setToastNo(true)
      setMessage("Error loading user data!");
      setTimeout(() => {
        setToastNo(false)
        setMessage('')
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
      setToastYes(true)
      setMessage("Profile updated!");
      setTimeout(() => {
        setToastYes(false)
        setMessage('')
      }, 3000);
    } catch (error) {
      setToastNo(true)
      setMessage("Error updating the data!");
      setTimeout(() => {
        setToastNo(false)
        setMessage('')
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  const passwordRequirementsRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{6,}$/;

  async function updatePassword() {
    if (!newPassword || !confirmPassword) {
      setToastNo(true)
      setMessage("Please enter both password fields!");
      setTimeout(() => {
        setToastNo(false)
        setMessage('')
      }, 3000);
      return;
    }

    if (!passwordRequirementsRegex.test(newPassword)) {
      setToastNo(true)
      setMessage("The password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character.");
      setTimeout(() => {
        setToastNo(false)
        setMessage('')
      }, 3000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setToastNo(true)
      setMessage("Passwords do not match!");
      setTimeout(() => {
        setToastNo(false)
        setMessage('')
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setToastYes(true)
      setMessage("Password updated successfully!");
      setTimeout(() => {
        setToastYes(false)
        setMessage('')
      }, 3000);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setToastNo(true)
      setMessage("Error updating password!");
      setTimeout(() => {
        setToastNo(false)
        setMessage('')
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {toastNo && <ToastNo setMessage={setMessage} setClose={setToastNo}>{message}</ToastNo>}
      {toastYes && <ToastYes setMessage={setMessage} setClose={setToastYes}>{message}</ToastYes>}
      <div className="flex min-h-screen items-center justify-center p-6 bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
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

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              value={user?.email}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullname || ""}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => updateProfile({ fullname, avatar_url })}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </button>
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
              onClick={updatePassword}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update Password"}
            </button>
          </div>

          <div>
            <form action="/auth/signout" method="post">
              <button
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                type="submit"
              >
                Sign out
              </button>
            </form>
          </div>

          <div className="flex justify-center">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => router.back()}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
