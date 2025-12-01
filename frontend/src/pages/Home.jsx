import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MatchCard from "../components/MatchCard.jsx";
import api from "../lib/apiClient";
import useAuthUser from "../hooks/useAuthUser";

export default function Home() {
  const { user } = useAuthUser();
  const [activeTab, setActiveTab] = useState("available");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError("");

        const endpoint =
          activeTab === "available"
            ? "/api/v1/match/available"
            : "/api/v1/match";

        const res = await api.get(endpoint);

        const data = res.data.data || res.data;
        setMatches(data || []);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError("Failed to load matches.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [activeTab]);

  const handleCreateMatch = () => {
    // navigate("/create-match");
    console.log("Create Match clicked");
  };

  const headingText =
    activeTab === "available" ? "Available Matches" : "All Matches";
  const subText =
    activeTab === "available"
      ? "Find and accept matches in your area"
      : "Browse all the matches";

  return (
    <main className="mx-auto max-w-7xl px-6 pb-16 pt-12">
      {/* Tabs + create button */}
      <div className="mb-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex justify-center w-full md:w-auto">
          <div className="inline-flex rounded-full bg-purple-100 p-1">
            <button
              onClick={() => setActiveTab("available")}
              className={`px-5 py-2 text-sm font-medium rounded-full transition ${
                activeTab === "available"
                  ? "bg-purple-600 text-white shadow"
                  : "text-purple-700"
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 text-sm font-medium rounded-full transition ${
                activeTab === "all"
                  ? "bg-purple-600 text-white shadow"
                  : "text-purple-700"
              }`}
            >
              All Matches
            </button>
          </div>
        </div>

        <div className="flex w-full justify-center md:w-auto md:justify-end">
          {user && (
            <button
              onClick={handleCreateMatch}
              className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-base">
                +
              </span>
              <span>Create Match</span>
            </button>
          )}
        </div>
      </div>

      {/* Heading */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900">{headingText}</h1>
        <p className="mt-2 text-gray-600">{subText}</p>
      </section>

      {/* Loading / Error */}
      {loading && (
        <p className="text-center text-gray-500">Loading matches...</p>
      )}

      {error && !loading && <p className="text-center text-red-500">{error}</p>}

      {/* Cards */}
      {!loading && !error && (
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <MatchCard
              key={match._id}
              location={match.location}
              date={match.date}
              time={match.time}
              pay={match.pay}
              playerJoined={match.playerJoined}
              creatorName={match?.creator?.name}
            />
          ))}
        </section>
      )}
    </main>
  );
}
