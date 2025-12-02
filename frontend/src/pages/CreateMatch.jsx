import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/apiClient";
import useAuthUser from "../hooks/useAuthUser";

export default function CreateMatch() {
  const { user } = useAuthUser();
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pay, setPay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium text-slate-700">
        Please sign in to create a match.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!location || !date || !time || !pay) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/v1/match/create", {
        location,
        date,
        time,
        pay,
      });

      navigate("/profile");
    } catch (err) {
      console.error("Error creating match:", err);
      setError("Failed to create match. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 pb-20 pt-12">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Create a New Match
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Fill in the details to create a new match.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="Baneshwor Futsal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              Date
            </label>
            <input
              type="text"
              placeholder="2025/11/27"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
            <p className="text-xs text-slate-500 mt-1">Use format YYYY/MM/DD</p>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              Time
            </label>
            <input
              type="text"
              placeholder="2:30 pm"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* Pay Enum Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              Pay Split
            </label>

            <select
              value={pay}
              onChange={(e) => setPay(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            >
              <option value="">Select pay split</option>
              <option value="Loosers pay">Loosers pay</option>
              <option value="50-50">50-50</option>
              <option value="70-30">70-30</option>
              <option value="60-40">60-40</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-brand-600 disabled:opacity-70"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-base">
                +
              </span>
              <span>{loading ? "Creating..." : "Create Match"}</span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
