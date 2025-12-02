import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import api from "../lib/apiClient";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useAuthUser();
  const navigate = useNavigate();

  const [myMatches, setMyMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchMyMatches = async () => {
      try {
        const res = await api.get("/api/v1/match/mine");
        const data = res.data?.data;

        const created = Array.isArray(data?.createdMatches)
          ? data.createdMatches
          : [];

        setMyMatches(created);
      } catch (error) {
        console.log("Error fetching my matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyMatches();
  }, [user]);

  // DELETE match
  const handleDelete = async (matchId) => {
    try {
     
      await api.delete(`/api/v1/match/delete/${matchId}`);

    
      setMyMatches(myMatches.filter((match) => match._id !== matchId));
    } catch (error) {
      console.log("Error deleting match:", error);
      setError("Failed to delete match. Please try again.");
    }
  };

  // If user not logged in
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium text-slate-700">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-12">
      {/* PROFILE HEADER */}
      <section className="mb-12 flex flex-col items-center rounded-2xl bg-white p-10 shadow-sm md:flex-row md:items-end md:justify-between">
        {/* Profile Left Side */}
        <div className="flex items-center gap-6">
          <img
            src={user.profilePic}
            alt={user.name}
            className="h-24 w-24 rounded-full border border-slate-300 object-cover"
            referrerPolicy="no-referrer"
          />

          <div>
            <h2 className="text-3xl font-bold text-slate-900">{user.name}</h2>
            <p className="mt-1 text-slate-600">{user.email}</p>
          </div>
        </div>

        {/* Matches Created Count */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-10 py-6 text-center shadow-sm md:mt-0">
          <p className="text-4xl font-bold text-brand-500">
            {myMatches.length}
          </p>
          <p className="mt-1 text-sm text-slate-600">Matches Created</p>
        </div>
      </section>

      {/* MY MATCHES SECTION */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">My Matches</h3>
            <p className="text-slate-600">Manage your created matches</p>
          </div>

          <button
            onClick={() => navigate("/create-match")}
            className="inline-flex items-center gap-2 rounded-full bg-purple-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-purple-600"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-base">
              +
            </span>
            <span>Create Match</span>
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-slate-500">Loading your matches...</p>
        )}

        {/* MATCH CARDS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {myMatches.map((match) => (
            <article
              key={match._id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h4 className="text-lg font-semibold text-slate-900">
                {match.title || match.location}
              </h4>

              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">📅</span>
                  <span>{match.date}</span>
                </li>

                <li className="flex items-center gap-2">
                  <span className="text-brand-500">📍</span>
                  <span>{match.location}</span>
                </li>

                <li className="flex items-center gap-2">
                  <span className="text-brand-500">👥</span>
                  <span>
                    {match.playerJoined ? "1 participant" : "0 participants"}
                  </span>
                </li>
              </ul>

              {/* ACTION BUTTONS */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => navigate(`/update-match/${match._id}`)}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(match._id)} 
                  className="flex-1 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
