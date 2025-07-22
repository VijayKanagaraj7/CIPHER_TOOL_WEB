import { RailFenceCipher } from "@/components/rail-fence-cipher";
import { RowTranspositionCipher } from "@/components/row-transposition-cipher";
import { ComparisonSection } from "@/components/comparison-section";
import { AboutSection } from "@/components/about-section";
import { Lock, Shield, Eye, Copy, Smartphone } from "lucide-react";

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Lock className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold cipher-text-gradient">
                CryptoVault
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => scrollToSection('rail-fence')}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-200"
              >
                Rail Fence
              </button>
              <button
                onClick={() => scrollToSection('row-transposition')}
                className="text-slate-300 hover:text-emerald-400 transition-colors duration-200"
              >
                Row Transposition
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-slate-300 hover:text-amber-400 transition-colors duration-200"
              >
                About
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 cipher-text-gradient">
              Advanced Cipher Encryption Tool
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore classical cryptography with our interactive Rail Fence and Row Transposition cipher implementations. 
              Encrypt your messages with customizable parameters and visualize the encryption process step by step.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-blue-400 mr-2" />
                <span>Secure Encryption</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 text-emerald-400 mr-2" />
                <span>Visual Process</span>
              </div>
              <div className="flex items-center">
                <Copy className="w-4 h-4 text-amber-400 mr-2" />
                <span>Copy Results</span>
              </div>
              <div className="flex items-center">
                <Smartphone className="w-4 h-4 text-purple-400 mr-2" />
                <span>Mobile Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Rail Fence Cipher Section */}
        <section id="rail-fence" className="animate-fade-in">
          <RailFenceCipher />
        </section>

        {/* Row Transposition Cipher Section */}
        <section id="row-transposition" className="animate-fade-in">
          <RowTranspositionCipher />
        </section>

        {/* Comparison Section */}
        <section className="animate-fade-in">
          <ComparisonSection />
        </section>

        {/* About Section */}
        <section id="about" className="animate-fade-in">
          <AboutSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-bold cipher-text-gradient">
                  CryptoVault
                </h4>
              </div>
              <p className="text-slate-400 text-sm">
                Interactive educational tool for exploring classical cryptography techniques.
              </p>
            </div>

            <div>
              <h5 className="font-medium text-slate-300 mb-3">Features</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full mr-2" />
                  Real-time encryption
                </li>
                <li className="flex items-center">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full mr-2" />
                  Visual cipher demonstration
                </li>
                <li className="flex items-center">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full mr-2" />
                  Mobile responsive design
                </li>
                <li className="flex items-center">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full mr-2" />
                  Copy to clipboard functionality
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium text-slate-300 mb-3">Resources</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">Cryptography Basics</a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">Algorithm Documentation</a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">Source Code</a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors">Educational Materials</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6 mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
              <p>© 2024 CryptoVault. Built for educational purposes.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                  React + TypeScript
                </span>
                <span className="flex items-center">
                  <Shield className="w-3 h-3 text-emerald-400 mr-1" />
                  Educational Use Only
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
