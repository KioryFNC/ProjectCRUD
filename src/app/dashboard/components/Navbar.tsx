import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">ProductCRUD</a>
      </div>
      <div className="flex-none">
        <ThemeToggle />
      </div>
    </div>
  );
}
