import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 font-sans py-10">
      {/* card container */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        
        {/* header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Create an Account</h1>
          <p className="mt-2 text-sm text-slate-500">
            Please fill in the details below to register.
          </p>
        </div>

        {/* form */}
        <form className="space-y-5">
          {/* full name input*/}
          <div>
            <label 
              htmlFor="fullName" 
              className="block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* uname input */}
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
              placeholder="Choose a username"
              required
            />
          </div>

          {/* email input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* password input */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 mt-2"
          >
            Register
          </button>
        </form>

        {/* login link */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link 
            href="/login" 
            className="font-semibold text-blue-600 transition-colors hover:text-blue-800"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}