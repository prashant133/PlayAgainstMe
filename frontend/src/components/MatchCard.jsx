import { useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

export default function MatchCard({
  location,
  date,
  time,
  pay,
  playerJoined,
  creatorName,
}) {
  const { user } = useAuthUser();
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      console.log("Match accepted by:", user.name, "at:", location);
    }
  };

  const playersJoinedCount = playerJoined ? 1 : 0;

  const playersText =
    playersJoinedCount === 0 ? "No players joined yet" : "1 player joined";

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Top */}
      <div>
        <div className="mb-5 flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-900">
            {location || "Futsal Match"}
          </h2>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            Futsal
          </span>
        </div>

        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span>📅</span>
            <span>{date}</span>
          </li>
          <li className="flex items-center gap-2">
            <span>⏰</span>
            <span>{time}</span>
          </li>
          <li className="flex items-center gap-2">
            <span>💰</span>
            <span>Pay: {pay}</span>
          </li>
          <li className="flex items-center gap-2">
            <span>👥</span>
            <span>{playersText}</span>
          </li>
        </ul>
      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
        <p className="text-xs text-gray-500">
          by{" "}
          <span className="font-medium text-gray-700">
            {creatorName || "Match Host"}
          </span>
        </p>

        <button
          onClick={handleClick}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition
            ${
              isLoggedIn
                ? "border-purple-600 text-purple-700 hover:bg-purple-50"
                : "border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-700"
            }`}
        >
          <span>🔒</span>
          <span>{isLoggedIn ? "Accept Match" : "Sign in to Accept"}</span>
        </button>
      </div>
    </article>
  );
}
