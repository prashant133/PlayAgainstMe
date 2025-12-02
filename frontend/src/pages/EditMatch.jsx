// src/pages/EditMatch.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/apiClient";
import useAuthUser from "../hooks/useAuthUser";

export default function EditMatch() {
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const { id } = useParams();

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pay, setPay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch match details to prefill the form
    const fetchMatch = async () => {
      try {
        const res = await api.get(`/api/v1/match/${id}`);
        const match = res.data.data;

        setLocation(match.location);
        setDate(match.date);
        setTime(match.time);
        setPay(match.pay);
      } catch (err) {
        console.log("Error fetching match:", err);
        setError("Failed to fetch match details.");
      }
    };

    fetchMatch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!location || !date || !time || !pay) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await api.put(`/api/v1/match/update/${id}`, {
        location,
        date,
        time,
        pay,
      });

      navigate("/profile");
    } catch (err) {
      console.error("Error updating match:", err);
      setError("Failed to update match. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 pb-20 pt-12">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Edit Match</h1>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              Location
            </label>
            <input
              type="text"
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              Time
            </label>
            <input
              type="text"
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

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
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
              <span>{loading ? "Updating..." : "Update Match"}</span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
