"use client";

export function EmailForm() {
  return (
    <form className="mt-6 flex max-w-md gap-3" onSubmit={(event) => event.preventDefault()}>
      <input
        aria-label="email"
        placeholder="Enter Your Email"
        className="flex-1 rounded-full border border-white/8 bg-white/[0.02] px-4 py-3 text-white placeholder-zinc-500"
        type="email"
      />
      <button className="rounded-full bg-lime-300 px-5 py-3 font-semibold text-black" type="submit">
        Submit
      </button>
    </form>
  );
}