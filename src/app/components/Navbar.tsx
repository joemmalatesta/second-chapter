import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className="w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8da7602e0a9f61aee3ad032dcfbb783d74d5a4f4f62f3589f503e89ef8e40b1?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
        alt=""
        className="hero-background absolute object-cover object-bottom h-32 w-full opacity-35 -z-10"
      />
      <div className="text-[#6c584c] flex justify-between w-11/12 mx-auto">
        <Link href={"/"} className="flex items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/082f1e6041eba8b410214d2f6e149632ad3ad0259b10608f262f5c39023080d8?placeholderIfAbsent=true&apiKey=61c5806b97e2479f978f0dd7f873e640"
            alt="Second Chapter Logo"
            className="w-32 object-cover"
          />
          <div className="brand-name">
            <span className="brand-first">Second</span>
            <span className="brand-last">Chapter</span>
          </div>
        </Link>
        <Link
          href={"/profile"}
          className="flex flex-col justify-center items-center"
        >
          <img
            src="/user-circle.svg
          "
            alt="User icon"
            className="user-icon w-10"
          />
          <span className="login-text">
            {session?.user ? "Profile" : "Login"}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
