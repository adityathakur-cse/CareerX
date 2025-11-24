import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    return (
        <>
          <div className="relative w-full min-h-[75vh] flex items-center justify-center bg-gradient-to-br from-white via-yellow-50 to-yellow-100 px-6">
              {/* Card */}
              <div className="bg-white/80 backdrop-blur-xl border border-2 border-yellow-300/40 shadow-[0_8px_25px_rgba(0,0,0,0.07)] rounded-3xl p-10 max-w-2xl text-center">
                  <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-700 to-yellow-400 bg-clip-text text-transparent drop-shadow-sm">
                      Welcome to CareerX
                  </h1>
                  <p className="text-gray-700 mt-4 text-lg leading-relaxed">
                      Your gateway to internships, industrial training, and placement opportunities. Discover the
                      right path to build your future career.
                  </p>
                  <button className="mt-6 px-8 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 transition font-semibold text-white shadow-md hover:shadow-lg">
                      Launching Soon
                  </button>
              </div>
              {/* Soft Decorative Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300/30 blur-3xl rounded-full"></div>
              <div className="absolute bottom-0 left-10 w-52 h-52 bg-yellow-200/40 blur-3xl rounded-full"></div>
          </div>
        </>
    );
}

export default App;
