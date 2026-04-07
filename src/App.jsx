import { useState, useEffect } from "react";
import "./merged.css";

/* ===== Header ===== */
const Header = () => (
  <header className="esk-header">
    <div className="esk-container esk-header-inner">
      <a href="/" className="esk-header-logo">mospi-esankhyiki</a>
      <nav>
        <ul className="esk-header-nav">
          <li><a href="https://pypi.org/project/mospi-esankhyiki/" target="_blank" rel="noreferrer">PyPI</a></li>
          <li><a href="https://github.com/nso-india/mospi-esankhyiki" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href="https://esankhyiki.mospi.gov.in" target="_blank" rel="noreferrer">Portal</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

/* ===== Footer ===== */
const Footer = () => (
  <footer className="esk-footer">
    <div className="esk-footer-brand">mospi-esankhyiki</div>
    <div className="esk-footer-links">
      <a href="https://mospi.gov.in" target="_blank" rel="noreferrer">MoSPI</a>
      <a href="https://esankhyiki.mospi.gov.in" target="_blank" rel="noreferrer">eSankhyiki</a>
      <a href="https://github.com/nso-india/mospi-esankhyiki" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://pypi.org/project/mospi-esankhyiki/" target="_blank" rel="noreferrer">PyPI</a>
    </div>
    <p className="esk-footer-copy">
      &copy; {new Date().getFullYear()} Ministry of Statistics and Programme Implementation
    </p>
  </footer>
);

/* ===== Copy Icon ===== */
const CopyIcon = ({ copied }) =>
  copied ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
  );

/* ===== Main App ===== */
function App() {
  const [activeExample, setActiveExample] = useState("plfs");
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("pip install mospi-esankhyiki");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % quickstartSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Scroll animations
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
      label: "list_datasets()",
      desc: "Discover available datasets",
      code: `import esankhyiki

# Step 1: Discover available datasets
datasets = esankhyiki.list_datasets()

# Returns overview of all MoSPI statistical datasets
# Output formats: "dict" (default), "df", "csv"
datasets_df = esankhyiki.list_datasets(format="df")`,
    },
    {
      label: "get_indicators()",
      desc: "See what is measured",
      code: `import esankhyiki

# Step 2: Get indicators for a dataset
indicators = esankhyiki.get_indicators("PLFS")
`,
    },
    {
      label: "get_metadata()",
      desc: "Get valid filter values",
      code: `import esankhyiki

# Step 3: Get valid filter values for an indicator
metadata = esankhyiki.get_metadata(
    "PLFS",
    indicator_code=1,
    frequency_code=1,
    year_type_code=1,
)
`,
    },
    {
      label: "get_data()",
      desc: "Fetch the actual data",
      code: `import esankhyiki

# Step 4: Fetch the data
data = esankhyiki.get_data("PLFS", {
    "indicator_code": 1,
    "frequency_code": 1,
    "year_type_code":1,
    "year": "2023-24",
    "state_code": 99,
    "gender_code": 3,
    "age_code": 1,
    "sector_code": 3,
    }, format="df")`,
    },
  ];

  const datasets = [
    { id: "PLFS", name: "Periodic Labour Force Survey", desc: "Jobs, unemployment, wages" },
    { id: "CPI", name: "Consumer Price Index", desc: "Retail inflation, price indices" },
    { id: "IIP", name: "Index of Industrial Production", desc: "Manufacturing, mining output" },
    { id: "ASI", name: "Annual Survey of Industries", desc: "Factory financials, employment" },
    { id: "NAS", name: "National Accounts Statistics", desc: "GDP, GVA, national income" },
    { id: "ENERGY", name: "Energy Statistics", desc: "Energy production and consumption" },
    { id: "AISHE", name: "Higher Education Survey", desc: "Universities, enrolment, GER" },
    { id: "ASUSE", name: "Unincorporated Enterprises", desc: "Informal sector, MSMEs" },
    { id: "GENDER", name: "Gender Statistics", desc: "Indicators across all domains" },
    { id: "NFHS", name: "National Family Health Survey", desc: "Health, fertility, mortality" },
    { id: "ENVSTATS", name: "Environment Statistics", desc: "Climate, biodiversity, pollution" },
    { id: "RBI", name: "RBI Statistics", desc: "Trade, forex, exchange rates" },
    { id: "NSS77", name: "NSS 77th Round", desc: "Agricultural households" },
    { id: "NSS78", name: "NSS 78th Round", desc: "Living conditions" },
    { id: "CPIALRL", name: "CPI for Rural Labourers", desc: "Rural inflation" },
    { id: "HCES", name: "Household Consumption", desc: "Spending, poverty, Gini" },
    { id: "TUS", name: "Time Use Survey", desc: "Time allocation, unpaid work" },
    { id: "EC", name: "Economic Census", desc: "District-wise establishments" },
  ];

  const examples = {
    plfs: {
      title: "Unemployment Rate",
      dataset: "PLFS",
      code: `import esankhyiki

# Discover valid filter values
meta = esankhyiki.get_metadata(
    "PLFS", indicator_code=3, frequency_code=1
)

# Fetch unemployment rate data
df = esankhyiki.get_data("PLFS", {
    "indicator_code": 3,      # Unemployment Rate
    "frequency_code": 1,      # Annual
    "year_type_code":1,
    "year": "2023-24",
    "state_code": 99,         # All India
    "gender_code": 3,         # Person (combined)
    "age_code": 1,
    "sector_code": 3,         # Rural + Urban
}, format="df")`,
    },
    nas: {
      title: "GDP / National Accounts",
      dataset: "NAS",
      code: `import esankhyiki

meta = esankhyiki.get_metadata(
    "NAS",
    indicator_code=1,
    base_year="2022-23",
    frequency_code=1,
    series="Current",
)

df = esankhyiki.get_data("NAS", {
    "indicator_code": 1,
    "base_year": "2022-23",
    "series": "Current",
    "frequency_code": 1,
}, format="df")`,
    },
    cpi: {
      title: "Consumer Price Index",
      dataset: "CPI",
      code: `import esankhyiki

# CPI auto-routes by level
meta = esankhyiki.get_metadata(
    "CPI",
    base_year="2024",
    level="Group",
    series="Current",
)

df = esankhyiki.get_data("CPI", {
    "base_year": "2024",
    "year": "2026",
    "series": "Current",
}, format="df")`,
    },
    gender: {
      title: "Gender Statistics",
      dataset: "GENDER",
      code: `import esankhyiki

indicators = esankhyiki.get_indicators("GENDER")

# Sex ratio (indicator_code=2)
df = esankhyiki.get_data("GENDER", {
    "indicator_code": 2
}, format="df")`,
    },
  };

  return (
    <div className="esk-page">
      <Header />

      {/* ===== HERO ===== */}
      <section className="esk-hero">
        <div className="esk-hero-glow" />
        <div className="esk-container">
          <div className="esk-hero-inner">
            <div className="esk-hero-left">
              <h1 className="esk-hero-title">
                <span className="esk-hero-pkg">mospi-esankhyiki</span>
                <span className="esk-hero-sub">
                  Python client for India's official statistics
                </span>
              </h1>
              <p className="esk-hero-desc">
                Access statistical indicators across employment, prices, industry,
                GDP, health, education, environment, and trade from the
                National Statistical Office, directly from Python.
              </p>
              <div className="esk-install-row">
                <div className="esk-install-box" onClick={copyInstall}>
                  <span className="esk-install-dollar">$</span>
                  <code>pip install mospi-esankhyiki</code>
                  <button className="esk-install-copy" title="Copy">
                    <CopyIcon copied={copiedInstall} />
                  </button>
                </div>
                <div className="esk-hero-links">
                  <a href="https://pypi.org/project/mospi-esankhyiki/" target="_blank" rel="noreferrer" className="esk-btn esk-btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    PyPI
                  </a>
                  <a href="https://github.com/nso-india/mospi-esankhyiki" target="_blank" rel="noreferrer" className="esk-btn esk-btn-outline">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            <div className="esk-hero-right">
              <img src="/brand_nso.svg" alt="NSO" className="esk-hero-logo" />
              <span className="esk-hero-logo-title">NSO</span>
              <span className="esk-hero-logo-sub">National Statistical Office</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK START CAROUSEL ===== */}
      <section className="esk-section esk-quickstart-section ani">
        <div className="esk-container">
          <h2 className="esk-section-title">Quick Start</h2>
          <p className="esk-section-desc">
            The API follows a sequential discovery workflow. Filter codes are
            dataset-specific; always discover them through the workflow.
          </p>
          <div 
            className="esk-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="esk-carousel-nav">
              {quickstartSteps.map((step, i) => (
                <button
                  key={i}
                  className={`esk-carousel-tab ${activeStep === i ? "active" : ""}`}
                  onClick={() => setActiveStep(i)}
                >
                  <span className="esk-carousel-tab-num">{i + 1}</span>
                  <div className="esk-carousel-tab-text">
                    <code>{step.label}</code>
                    <span>{step.desc}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="esk-carousel-content">
              <div className="esk-code-block">
                <div className="esk-code-header">
                  <div className="esk-code-dots"><span /><span /><span /></div>
                  <span className="esk-code-filename">quickstart.py</span>
                </div>
                <pre className="esk-code-body" key={activeStep}>
                  <code>{quickstartSteps[activeStep].code}</code>
                </pre>
              </div>
            </div>
            <div className="esk-carousel-progress">
              {quickstartSteps.map((_, i) => (
                <button
                  key={i}
                  className={`esk-carousel-dot ${activeStep === i ? "active" : ""}`}
                  onClick={() => setActiveStep(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DATASETS ===== */}
      <section className="esk-section esk-datasets-section ani">
        <div className="esk-container">
          <h2 className="esk-section-title">Available Datasets</h2>
          <p className="esk-section-desc">
            Covering employment, prices, industry, national accounts, health,
            education, environment, and trade
          </p>
          <div className="esk-dataset-grid">
            {datasets.map((d) => (
              <div className="esk-dataset-card" key={d.id}>
                <span className="esk-dataset-id">{d.id}</span>
                <h3 className="esk-dataset-name">{d.name}</h3>
                <p className="esk-dataset-desc">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXAMPLES ===== */}
      <section className="esk-section esk-examples-section ani">
        <div className="esk-container">
          <h2 className="esk-section-title">Examples</h2>
          <p className="esk-section-desc">
            Real-world queries across different datasets
          </p>
          <div className="esk-examples-layout">
            <div className="esk-examples-sidebar">
              {Object.entries(examples).map(([key, ex]) => (
                <button
                  key={key}
                  className={`esk-example-btn ${activeExample === key ? "active" : ""}`}
                  onClick={() => setActiveExample(key)}
                >
                  <span className="esk-example-btn-ds">{ex.dataset}</span>
                  <span className="esk-example-btn-title">{ex.title}</span>
                </button>
              ))}
            </div>
            <div className="esk-examples-code">
              <div className="esk-code-block">
                <div className="esk-code-header">
                  <div className="esk-code-dots"><span /><span /><span /></div>
                  <span className="esk-code-filename">
                    {examples[activeExample].dataset.toLowerCase()}_example.py
                  </span>
                </div>
                <pre className="esk-code-body">
                  <code>{examples[activeExample].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUTPUT FORMATS ===== */}
      <section className="esk-section esk-formats-section ani">
        <div className="esk-container">
          <h2 className="esk-section-title">Output Formats</h2>
          <div className="esk-formats-grid">
            <div className="esk-format-card">
              <div className="esk-format-icon">{"{ }"}</div>
              <code className="esk-format-val">"dict"</code>
              <span className="esk-format-label">Python dict (default)</span>
            </div>
            <div className="esk-format-card">
              <div className="esk-format-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></svg>
              </div>
              <code className="esk-format-val">"df"</code>
              <span className="esk-format-label">pandas DataFrame</span>
            </div>
            <div className="esk-format-card">
              <div className="esk-format-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </div>
              <code className="esk-format-val">"csv"</code>
              <span className="esk-format-label">CSV string</span>
            </div>
          </div>
        </div>
      </section>



      

      <Footer />
    </div>
  );
}

export default App;
