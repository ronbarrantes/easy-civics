import Link from "next/link";

export default function Error() {
  return (
    <div>
      <h1>Weird error</h1>{" "}
      <p>
        Something really bad happened and I have no idea what, go back to the
        begining
      </p>
      <Link href="/">Go back to the begining</Link>
    </div>
  );
}
