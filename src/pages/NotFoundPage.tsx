import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="space-y-3 py-10 text-center">
      <h1 className="text-2xl font-bold">That page does not exist</h1>
      <p>You may have followed an old link, or mistyped the address.</p>
      <Link to="/" className="inline-block rounded-md border px-3 py-2 font-semibold">Back to all applications</Link>
    </section>
  );
}