import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  const handleMenuSelect = ({ key }) => {
    console.log("Selected menu:", key);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64">
        <Sidebar selectedKey="1" onSelect={handleMenuSelect} />
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
