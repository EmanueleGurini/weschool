"use client";

import React, { useState } from "react";
import { createClient } from "utils/supabase/client";

interface IClasses {
  course_id: string;
  course_name: string;
}
export interface IFormPost {
  id: string;
  classes: IClasses[];
}

export default function FormPost({ id, classes }: IFormPost) {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    class_name: "",
    description: "",
    name: ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.tagName === 'SELECT') {
      const target = e.target as HTMLSelectElement;
      const selectedOption = target.options[target.selectedIndex];
      setFormData({
        ...formData,
        class_name: target.value,
        name: selectedOption.textContent ?? '',
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from("notes")
        .insert({
          author_id: id,
          class_id: formData.class_name,
          title: formData.title,
          description: formData.description,
          date: formData.date,
          name: formData.name
        })
        .select();

      if (error) {
        console.error("Error:", error.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  };

  return (
    <div className="max-w-lg mb-4 mx-auto bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-primary">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-color80"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="class_name">
            Class Name
          </label>
          <select
            id="class_name"
            name="class_name"
            value={formData.class_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-color80 focus:ring-1 focus:ring-color80"
            required
          >
            <option value="" hidden>
              Select Class...
            </option>
            {classes.map((classItem, index) => (
              <option key={index} value={classItem.course_id}>
                {classItem.course_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-color80 focus:ring-1 focus:ring-color80"
            rows={4}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-color80 focus:ring-1 focus:ring-color80"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-contrast text-white py-2 px-4 rounded-lg shadow-lg hover:bg-contrasthover focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      {success && <p className="text-center text-contrast font-semibold mt-2 ">Post Created!</p>}
    </div>
  );
}
