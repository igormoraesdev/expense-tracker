import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-indigo-500/20 mt-32">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-indigo-300/60 text-sm">
          <p>
            © {new Date().getFullYear()} Expense Tracker. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
