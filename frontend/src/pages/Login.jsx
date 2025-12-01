import { API_BASE_URL } from "../config/config";

export default function Login() {
  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Sign in to PlayAgainstMe
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Use your Google account to continue
        </p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
            <span className="text-lg">G</span>
          </span>
          <span>Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-xs text-gray-400">
          By continuing you agree to our Terms &amp; Privacy Policy.
        </p>
      </div>
    </div>
  );
}
