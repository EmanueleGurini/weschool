"use client";

import React, { useState } from "react";
import { createClient } from "utils/supabase/client";

interface IClasses {
  course_id: string;
  course_name: string;
}
interface IFormPost {
  id: string;
  classes: IClasses[];
}

export default function FormPost({ id, classes }: IFormPost) {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    class_name: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impedisce il comportamento di default del form (refresh della pagina)

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
        })
        .select();

      if (error) {
        console.error("Error:", error.message);
        // Mostra l'errore all'utente o gestiscilo in altro modo
      } else {
        window.location.reload(); // Solo se l'inserimento ha successo
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class_name">
            Class Name
          </label>
          <select
            id="class_name"
            name="class_name"
            value={formData.class_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
