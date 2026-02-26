import TripForm from "@/components/TripForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Will I Be Late?
        </h1>
        <p className="text-secondary">
          Real-time MTA predictions powered by AI
        </p>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-8">
        <div className="max-w-md mx-auto">
          <TripForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 text-center border-t border-surface-light">
        <p className="text-secondary text-sm">Powered by MTA real-time data</p>
      </footer>
    </main>
  );
}
