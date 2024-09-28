const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
        <h2 className="text-2xl mb-6">Sign In</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-white bg-opacity-20"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-white bg-opacity-20"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-black rounded hover:bg-green-600 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
