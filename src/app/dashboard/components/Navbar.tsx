import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 w-full z-50 px-6">
      <div className="flex-1">
        <a className="text-2xl font-bold text-primary">ProductCRUD</a>
      </div>
      <div className="flex-none">
        <ThemeToggle />
      </div>
    </div>
  );
}
