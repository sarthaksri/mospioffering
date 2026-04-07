import { useEffect, useState } from "react";
import "./App.css";
import nsoLogo from "./assets/brand_nso.svg";

const Header = () => (
  <header className="udt-header">
    <div className="udt-container udt-header-inner">
      <a href="/" className="udt-header-logo">
        mospi-unitdata
      </a>
      <nav>
        <ul className="udt-header-nav">
          <li>
            <a href="https://pypi.org/project/mospi-unitdata/" target="_blank" rel="noreferrer">
              PyPI
            </a>
          </li>
          <li>
            <a href="https://github.com/nso-india/mospi-unitdata" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://microdata.gov.in" target="_blank" rel="noreferrer">
              Portal
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="udt-footer">
    <div className="udt-footer-brand">mospi-unitdata</div>
    <div className="udt-footer-links">
      <a href="https://mospi.gov.in" target="_blank" rel="noreferrer">
        MoSPI
      </a>
      <a href="https://microdata.gov.in" target="_blank" rel="noreferrer">
        Unitdata Portal
      </a>
      <a href="https://github.com/nso-india/mospi-unitdata" target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href="https://pypi.org/project/mospi-unitdata/" target="_blank" rel="noreferrer">
        PyPI
      </a>
    </div>
    <p className="udt-footer-copy">
      &copy; {new Date().getFullYear()} Ministry of Statistics and Programme Implementation
    </p>
  </footer>
);

const CopyIcon = ({ copied }) =>
  copied ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );

function App() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("pip install mospi-unitdata");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % quickstartSteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll(".ani").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const quickstartSteps = [
    {
      label: "Install",
      desc: "Add the package from PyPI",
      code: `pip install mospi-unitdata`,
    },
    {
      label: "Generate API key",
      desc: "Create it from your Unitdata Portal profile",
      code: `1. Create or sign in to your account on https://microdata.gov.in
2. Verify your email address
3. Login: https://microdata.gov.in/NADA/index.php/auth/login
4. Open profile: https://microdata.gov.in/NADA/index.php/auth/profile
5. Generate or copy your API key`,
    },
    {
      label: "Import and download",
      desc: "Pass a local folder and your API key",
      code: `from MospiUnitdata import getDatasets

getDatasets(
    "C:/data/mospi-unitdata",
    "YOUR_API_KEY",
)`,
    },
    {
      label: "Choose a survey",
      desc: "Browse pages, pick an id, and fetch all files",
      code: `277:Annual Survey of Industries 2019-20
275:Annual Survey of Industries 2020-21
256:Annual Survey of Industries 2023-24
...
Total pages:13, Page:1 of 13,
Enter Survey index number (put n to Navigate to Next Page):`,
    },
  ];

  const highlights = [
    {
      title: "Install from PyPI",
      desc: "Use a standard `pip install mospi-unitdata` workflow with Python 3.9+.",
    },
    {
      title: "Authenticate with API key",
      desc: "Generate your key from the Unitdata Portal profile page and pass it directly to the package.",
    },
    {
      title: "Browse surveys interactively",
      desc: "Step through dataset pages in the terminal before selecting a survey id to download.",
    },
    {
      title: "Download to local folder",
      desc: "Provide a target path and the client saves each file from the selected survey there.",
    },
    {
      title: "Single public function",
      desc: "The documented entry point is `getDatasets(folderPath, apiKey)`.",
    },
    {
      title: "Portal-backed files",
      desc: "Downloads come from the official `microdata.gov.in` APIs instead of packaged sample data.",
    },
  ];

  const inputCode = `from MospiUnitdata import getDatasets

save_path = "C:/Users/you/Downloads/mospi-data"
api_key = "YOUR_API_KEY"

getDatasets(save_path, api_key)`;

  const outputCode = `277:Annual Survey of Industries 2019-20
275:Annual Survey of Industries 2020-21
256:Annual Survey of Industries 2023-24
...
Total pages:13, Page:1 of 13,
Enter Survey index number (put n to Navigate to Next Page): 256

C:/Users/you/Downloads/mospi-data/file_1.zip: Downloaded successfully!
C:/Users/you/Downloads/mospi-data/file_2.pdf: Downloaded successfully!`;

  return (
    <div className="udt-page">
      <Header />

      <section className="udt-hero">
        <div className="udt-hero-glow" />
        <div className="udt-container">
          <div className="udt-hero-inner">
            <div className="udt-hero-left">
              <h1 className="udt-hero-title">
                <span className="udt-hero-pkg">mospi-unitdata</span>
                <span className="udt-hero-sub">
                  Python client for the official MoSPI Unitdata Portal
                </span>
              </h1>
              <p className="udt-hero-desc">
                Browse portal datasets interactively and download survey files from
                <code>https://microdata.gov.in</code>
              </p>
              <div className="udt-install-row">
                <div className="udt-install-box" onClick={copyInstall}>
                  <span className="udt-install-dollar">$</span>
                  <code>pip install mospi-unitdata</code>
                  <button className="udt-install-copy" title="Copy">
                    <CopyIcon copied={copiedInstall} />
                  </button>
                </div>
                <div className="udt-hero-links">
                  <a
                    href="https://pypi.org/project/mospi-unitdata/"
                    target="_blank"
                    rel="noreferrer"
                    className="udt-btn udt-btn-primary"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    PyPI
                  </a>
                  <a
                    href="https://github.com/nso-india/mospi-unitdata"
                    target="_blank"
                    rel="noreferrer"
                    className="udt-btn udt-btn-outline"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.49 11.49 0 0 1 12 5.798c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0Z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            <div className="udt-hero-right">
              <img src={nsoLogo} alt="NSO" className="udt-hero-logo" />
              <span className="udt-hero-logo-title">NSO</span>
              <span className="udt-hero-logo-sub">National Statistical Office</span>
            </div>
          </div>
        </div>
      </section>

      <section className="udt-section udt-quickstart-section ani">
        <div className="udt-container">
          <h2 className="udt-section-title">Quick Start</h2>
          <p className="udt-section-desc">
            The package follows a short portal-driven workflow: install, generate an API key,
            call <code>getDatasets()</code>, then choose the survey id you want to download.
          </p>
          <div className="udt-quickstart-cta">
            <a
              href="https://microdata.gov.in/NADA/index.php/auth/login"
              target="_blank"
              rel="noreferrer"
              className="udt-btn udt-btn-secondary"
            >
              Get your API key now
            </a>
          </div>
          <div
            className="udt-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="udt-carousel-nav">
              {quickstartSteps.map((step, i) => (
                <button
                  key={step.label}
                  className={`udt-carousel-tab ${activeStep === i ? "active" : ""}`}
                  onClick={() => setActiveStep(i)}
                >
                  <span className="udt-carousel-tab-num">{i + 1}</span>
                  <div className="udt-carousel-tab-text">
                    <code>{step.label}</code>
                    <span>{step.desc}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="udt-carousel-content">
              <div className="udt-code-block">
                <div className="udt-code-header">
                  <div className="udt-code-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="udt-code-filename">quickstart.txt</span>
                </div>
                <pre className="udt-code-body" key={activeStep}>
                  <code>{quickstartSteps[activeStep].code}</code>
                </pre>
              </div>
            </div>
            <div className="udt-carousel-progress">
              {quickstartSteps.map((step, i) => (
                <button
                  key={step.label}
                  className={`udt-carousel-dot ${activeStep === i ? "active" : ""}`}
                  onClick={() => setActiveStep(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="udt-section udt-datasets-section ani">
        <div className="udt-container">
          <h2 className="udt-section-title">Why Use It</h2>
          <p className="udt-section-desc">
            A small wrapper around the official portal workflow: authenticate, browse, choose a survey,
            and download the files you need.
          </p>
          <div className="udt-dataset-grid">
            {highlights.map((item) => (
              <div className="udt-dataset-card" key={item.title}>
                <span className="udt-dataset-id">highlight</span>
                <h3 className="udt-dataset-name">{item.title}</h3>
                <p className="udt-dataset-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="udt-section udt-examples-section ani">
        <div className="udt-container">
          <h2 className="udt-section-title">Example</h2>
          <p className="udt-section-desc">
            The input code and terminal output are shown separately so the interactive flow is easier to scan.
          </p>
          <div className="udt-example-grid">
            <div className="udt-example-panel">
              <div className="udt-example-label udt-example-label-input">Input</div>
              <div className="udt-code-block">
                <div className="udt-code-header">
                  <div className="udt-code-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="udt-code-filename">input.py</span>
                </div>
                <pre className="udt-code-body">
                  <code>{inputCode}</code>
                </pre>
              </div>
            </div>
            <div className="udt-example-panel">
              <div className="udt-example-label udt-example-label-output">Output</div>
              <div className="udt-code-block udt-code-block-output">
                <div className="udt-code-header">
                  <div className="udt-code-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="udt-code-filename">output.txt</span>
                </div>
                <pre className="udt-code-body udt-code-body-output">
                  <code>{outputCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="udt-section udt-formats-section ani">
        <div className="udt-container">
          <h2 className="udt-section-title">Requirements</h2>
          <div className="udt-formats-grid">
            <div className="udt-format-card">
              <div className="udt-format-icon">Py</div>
              <code className="udt-format-val">&gt;= 3.9</code>
              <span className="udt-format-label">Supported Python version</span>
            </div>
            <div className="udt-format-card">
              <div className="udt-format-icon">KEY</div>
              <code className="udt-format-val">API key</code>
              <span className="udt-format-label">Generated from your portal profile</span>
            </div>
            <div className="udt-format-card">
              <div className="udt-format-icon">REQ</div>
              <code className="udt-format-val">requests</code>
              <span className="udt-format-label">Runtime HTTP dependency</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
