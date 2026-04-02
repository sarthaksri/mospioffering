import { Link } from "react-router-dom";
import { Header, Footer } from "../../components/Home/home";
import {
  Tab as ReactTabsTab,
  Tabs as ReactTabs,
  TabList,
  TabPanel,
} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import { useState, useEffect, useRef } from "react";

const MospiMcpPage = () => {
  const [activeTab, setActiveTab] = useState("chatgpt");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentScene, setCurrentScene] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const animationRef = useRef(null);

  // Auto-dismiss modal after 5 seconds
  useEffect(() => {
    if (showModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setShowModal(false);
    }
  }, [showModal, countdown]);

  // Datasets with links
  const datasets = [
    {
      id: "PLFS",
      name: "Periodic Labour Force Survey",
      description: "Employment, unemployment, and labour force metrics",
      category: "Labour",
      link: "https://esankhyiki.mospi.gov.in/macroindicators?product=plfs",
    },
    {
      id: "CPI",
      name: "Consumer Price Index",
      description:
        "Consumer Price Index by commodity groups and individual items",
      category: "Prices",
      link: "https://esankhyiki.mospi.gov.in/macroindicators?product=cpi",
    },
    {
      id: "ASI",
      name: "Annual Survey of Industries",
      description: "Factory sector performance and employment",
      category: "Industry",
      link: "https://esankhyiki.mospi.gov.in/macroindicators?product=asi",
    },
    {
      id: "IIP",
      name: "Index of Industrial Production",
      description: "Monthly and annual industrial production indices",
      category: "Industry",
      link: "https://esankhyiki.mospi.gov.in/macroindicators?product=iip",
    },
    {
      id: "NAS",
      name: "National Accounts Statistics",
      description: "GDP, GVA, national income, and macroeconomic aggregates",
      category: "Economy",
      link: "https://esankhyiki.mospi.gov.in/macroindicators?product=nas",
    },
    {
      id: "WPI",
      name: "Wholesale Price Index",
      description: "Producer and wholesale price movements",
      category: "Prices",
      link: "https://esankhyiki.mospi.gov.in/macroindicators?product=wpi",
    },
    {
      id: "ENERGY",
      name: "Energy Statistics",
      description: "Production, consumption, and energy resources",
      category: "Industry",
      link: "https://esankhyiki.mospi.gov.in/macroindicators?product=esi",
    },
  ];

  // Filter datasets based on active filter
  const filteredDatasets =
    activeFilter === "all"
      ? datasets
      : datasets.filter((d) => d.category === activeFilter);

  // Copy URL function
  const copyURL = () => {
    navigator.clipboard.writeText("https://mcp.mospi.gov.in");
    alert("Copied!");
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Hero animation
  useEffect(() => {
    const scenes = document.querySelectorAll(".hero-scene");
    const totalScenes = scenes.length;
    const sceneDurations = [2500, 2500, 2000]; // ms per scene

    const showScene = (index) => {
      scenes.forEach((scene, i) => {
        scene.classList.toggle("active", i === index);
      });
      setCurrentScene(index);
    };

    let sceneIndex = 0;
    showScene(sceneIndex);

    const nextScene = () => {
      sceneIndex = (sceneIndex + 1) % totalScenes;
      showScene(sceneIndex);
    };

    // Set up interval for scene transitions
    const interval = setInterval(() => {
      nextScene();
    }, sceneDurations[sceneIndex]);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  // Initialize intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <Header />
     
      {/* Modal Overlay */}
      {showModal && (
        <div className="mospi-modal-overlay" onClick={closeModal}>
          <div className="mospi-modal" onClick={(e) => e.stopPropagation()}>
            <button className="mospi-modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="mospi-modal-header">
              <div className="mospi-modal-icon">
                <img src="/chatgpt-icon.svg" alt="ChatGPT" />
              </div>
              <h3 className="mospi-modal-title">Already using MoSPI MCP on ChatGPT ?</h3>
            </div>
            <div className="mospi-modal-image">
              <img src="/MCP-IMAGE.png" alt="MCP Integration" />
              <div className="mospi-modal-highlight"></div>
            </div>
            <p className="mospi-modal-text">
              If you recently integrated the MoSPI MCP, please <span className="mospi-highlight">refresh the connector</span> on ChatGPT to apply the latest updates.
            </p>
            <div className="mospi-modal-footer">
              <button className="mospi-modal-btn" onClick={closeModal}>
                Got it {countdown > 0 && <span className="mospi-modal-countdown">({countdown})</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Animation */}
      <section className="mospi-hero" id="block-dilabmcp-content">
        <div className="mospi-container">
          <div className="mospi-hero-content">
            <div className="mospi-hero-text">
              <h1 className="mospi-hero-title">
                <span className="mospi-highlight-green">
                  MoSPI MCP
                  <sup
                    style={{
                      fontSize: "0.3em",
                      verticalAlign: "top",
                      position: "relative",
                      top: "0.5em",
                    }}
                  >
                    βeta
                  </sup>
                </span>
                Taking AI to Data 
              </h1>
              <p className="mospi-hero-subtitle">
                Connect Claude or ChatGPT directly to India's official
                government statistics. Query official datasets with verified,
                real-time data in every response.
              </p>
              <div className="mospi-hero-ctas">
                <a href="#connect" className="mospi-btn mospi-btn-primary">
                  Get Started
                </a>
                <a href="#catalog" className="mospi-btn mospi-btn-secondary">
                  Explore Datasets
                </a>
              </div>
            </div>
            <div className="mospi-hero-visual">
              <div className="hero-animation-container">
                {/* Scene 1: AI.ML 4 OS */}
                <div
                  className={`hero-scene scene-1 ${
                    currentScene === 0 ? "active" : ""
                  }`}
                >
                  <div className="main-text">AI/ML for Official Statistics</div>
                  <div className="accent-text">(AI.ML 4 OS)</div>
                </div>

                {/* Scene 3: From data to insights */}
                <div
                  className={`hero-scene scene-3 ${
                    currentScene === 3 ? "active" : ""
                  }`}
                >
                  <div className="tagline">
                    From data to insights
                    <span className="tagline-accent">just a prompt away</span>
                  </div>
                </div>

                {/* Scene 4: NSO Logo */}
                <div
                  className={`hero-scene scene-4 ${
                    currentScene === 3 ? "active" : ""
                  }`}
                >
                  <img src="/nso_logo.png" alt="NSO" className="nso-logo" />
                  <div className="nso-text">NSO</div>
                  <div className="nso-full">National Statistical Office</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MCP Explainer */}
      <section className="mospi-mcp-explainer fade-in">
        <div className="mospi-container">
          <div className="mospi-mcp-item">
            <img src="/mcp_logo.svg" alt="MCP" className="mospi-mcp-logo" />
            <div className="mospi-mcp-text">
              <h3>Model Context Protocol</h3>
              <p>
                MCP is an open standard developed by Anthropic that creates a
                universal way for AI assistants to connect with external data
                sources. Instead of relying solely on training data, AI can now
                fetch live, verified information in real time.
              </p>
            </div>
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
              className="mospi-mcp-link"
            >
              Learn more
            </a>
          </div>
          <div className="mospi-mcp-item">
            <img
              src="/esankyiki.png"
              alt="eSankhyiki"
              className="mospi-mcp-logo"
              style={{ width: "80px", height: "80px" }}
            />
            <div className="mospi-mcp-text">
              <h3>eSankhyiki Portal</h3>
              <p>
                eSankhyiki is the official statistical data portal of the
                Ministry of Statistics and Programme Implementation. It provides
                access to datasets covering economy, employment, prices, and
                more.
              </p>
            </div>
            <a
              href="https://esankhyiki.mospi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mospi-mcp-link"
            >
              Visit portal
            </a>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="mospi-section mospi-advantages-section fade-in">
        <div className="mospi-container">
          <h2 className="mospi-section-title">The MoSPI MCP Advantage</h2>
          <p className="mospi-section-description">
            Why government agencies, researchers, and analysts choose MoSPI MCP
          </p>
          <div className="mospi-advantages-grid">
            <div className="mospi-advantage-card">
              <div
                className="mospi-advantage-icon"
                style={{ background: "rgba(16,185,129,0.12)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div>
                <h3>Verified Official Data</h3>
                <p>
                  Every response comes from official sources: National Accounts,
                  PLFS, CPI, and more.
                </p>
                <span
                  className="mospi-advantage-highlight"
                  style={{ color: "#10b981" }}
                >
                  <span
                    style={{
                      background: "#10b981",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "6px",
                    }}
                  ></span>
                  Source Attributed
                </span>
              </div>
            </div>
            <div className="mospi-advantage-card">
              <div
                className="mospi-advantage-icon"
                style={{ background: "rgba(59,130,246,0.12)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div>
                <h3>Instant Insights</h3>
                <p>
                  Query economic indicators, employment data, price indices, and
                  health statistics using natural language.
                </p>
                <span
                  className="mospi-advantage-highlight"
                  style={{ color: "#3b82f6" }}
                >
                  <span
                    style={{
                      background: "#3b82f6",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "6px",
                    }}
                  ></span>
                  Real-time access
                </span>
              </div>
            </div>
            <div className="mospi-advantage-card">
              <div
                className="mospi-advantage-icon"
                style={{ background: "rgba(139,92,246,0.12)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <h3>Meets You in Your Workflow</h3>
                <p>
                  Query official statistics without leaving your AI workflow.
                  MCP protocol integration means no separate downloads or data
                  wrangling.
                </p>
                <span
                  className="mospi-advantage-highlight"
                  style={{ color: "#8b5cf6" }}
                >
                  <span
                    style={{
                      background: "#8b5cf6",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "6px",
                    }}
                  ></span>
                  Seamless Integration
                </span>
              </div>
            </div>
            <div className="mospi-advantage-card">
              <div
                className="mospi-advantage-icon"
                style={{ background: "rgba(245,158,11,0.12)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <div>
                <h3>Open Source</h3>
                <p>
                  Fully transparent implementation. Integrate with Claude,
                  ChatGPT, or build custom solutions using MCP.
                </p>
                <span
                  className="mospi-advantage-highlight"
                  style={{ color: "#f59e0b" }}
                >
                  <span
                    style={{
                      background: "#f59e0b",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "6px",
                    }}
                  ></span>
                  MIT Licensed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Connect */}
      <section
        id="connect"
        className="mospi-section mospi-ai-connect-section fade-in"
      >
        <div className="mospi-container">
          <h2 className="mospi-section-title">Connect Your AI</h2>
          <p className="mospi-section-description">
            Connect your AI assistant to official Indian government statistics.
          </p>
          <div className="mospi-connect-card">
            <div className="mospi-ai-tabs">
              <button
                className={`mospi-ai-tab ${
                  activeTab === "chatgpt" ? "active" : ""
                }`}
                onClick={() => setActiveTab("chatgpt")}
              >
                <img src="/chatgpt-icon.svg" alt="ChatGPT" />
                <span>ChatGPT</span>
              </button>
              <button
                className={`mospi-ai-tab ${
                  activeTab === "claude" ? "active" : ""
                }`}
                onClick={() => setActiveTab("claude")}
              >
                <img src="/claude-ai-icon.svg" alt="Claude" />
                <span>Claude</span>
              </button>
            </div>
            <div className="mospi-connect-panel">
              <div
                id="chatgpt-content"
                className="mospi-connect-content"
                style={{ display: activeTab === "chatgpt" ? "grid" : "none" }}
              >
                <div className="mospi-connect-video">
                  <video autoPlay muted loop playsInline controls>
                    <source src="/MoSPI.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="mospi-steps-list">
                  <h4>ChatGPT Integration</h4>
                  <p className="mospi-prereq-note">
                    Requires: ChatGPT Go or higher subscription
                  </p>
                  <ol>
                    <li>
                      Open ChatGPT and click on your profile icon (bottom-left)
                    </li>
                    <li>
                      Navigate to <strong>Settings</strong> &rarr;{" "}
                      <strong>Apps</strong> &rarr;{" "}
                      <strong>Advanced Settings</strong>
                    </li>
                    <li>
                      Toggle <strong>Developer Mode</strong> to "On"
                    </li>
                    <li>
                      Click <strong>Create App</strong>
                    </li>
                    <li>
                      Configure the app:
                      <ul className="config-list">
                        <li>
                          <strong>Name:</strong> MoSPI Statistics
                        </li>
                        <li>
                          <strong>Server URL:</strong>{" "}
                          <span className="copyable-url">
                            <code>https://mcp.mospi.gov.in</code>
                            <button className="copy-btn" onClick={copyURL}>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                            </button>
                          </span>
                        </li>
                        <li>
                          <strong>Authentication:</strong> No Authentication
                        </li>
                      </ul>
                    </li>
                    <li>Save the configuration</li>
                    <li>
                      In a new chat, click "+", select "More," and choose your
                      connector
                    </li>
                    <li>
                      Test by asking:{" "}
                      <em>
                        "What is the unemployment rate in India for 2023-24?"
                      </em>
                    </li>
                  </ol>
                </div>
              </div>
              <div
                id="claude-content"
                className="mospi-connect-content"
                style={{ display: activeTab === "claude" ? "grid" : "none" }}
              >
                <div className="mospi-connect-video">
                  <video autoPlay muted loop playsInline controls>
                    <source src="/mospi_claude.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="mospi-steps-list">
                  <h4>Claude Integration</h4>
                  <p className="mospi-prereq-note">
                    Requires: Claude Pro or Max subscription
                  </p>
                  <ol>
                    <li>Open the Claude interface</li>
                    <li>Click on your profile icon (bottom-left corner)</li>
                    <li>
                      Select <strong>Settings</strong> from the menu
                    </li>
                    <li>
                      Navigate to the <strong>Connectors</strong> tab
                    </li>
                    <li>
                      Click <strong>Add custom connector</strong>
                    </li>
                    <li>
                      Configure:
                      <ul className="config-list">
                        <li>
                          <strong>Name:</strong> MoSPI Statistics
                        </li>
                        <li>
                          <strong>Server URL:</strong>{" "}
                          <span className="copyable-url">
                            <code>https://mcp.mospi.gov.in</code>
                            <button className="copy-btn" onClick={copyURL}>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                            </button>
                          </span>
                        </li>
                      </ul>
                    </li>
                    <li>
                      Click <strong>Add</strong> to save
                    </li>
                    <li>
                      In a new chat, click "+" (Attach), go to Connectors, and
                      enable it
                    </li>
                    <li>
                      Test by asking:{" "}
                      <em>
                        "Show me the Consumer Price Index trend for the last 5
                        years"
                      </em>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="mospi-connect-elsewhere">
              <p>Looking to connect from another AI client?</p>
              <a
                href="https://github.com/nso-india/esankhyiki-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="mospi-github-link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Documentation on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Try Asking */}
      <section className="mospi-section mospi-demo-section fade-in">
        <div className="mospi-container">
          <h2 className="mospi-section-title">Try Asking</h2>
          <div className="mospi-query-cloud">
            <span className="mospi-query-pill mospi-query-pill-green">
              Unemployment rate in Bihar vs Kerala
            </span>
            <span className="mospi-query-pill mospi-query-pill-blue">
              Has namkeen price changed over the years?
            </span>
            <span className="mospi-query-pill mospi-query-pill-purple">
              Wholesale price of rice and wheat
            </span>
            <span className="mospi-query-pill mospi-query-pill-gray">
              Youth unemployment trends in India
            </span>
            <span className="mospi-query-pill mospi-query-pill-green">
              Has gold always been this expensive?
            </span>
            <span className="mospi-query-pill mospi-query-pill-blue">
              WPI for fuel and power
            </span>
            <span className="mospi-query-pill mospi-query-pill-purple">
              Female labour force participation rate
            </span>
            <span className="mospi-query-pill mospi-query-pill-gray">
              Wholesale vs retail onion prices
            </span>
            <span className="mospi-query-pill mospi-query-pill-green">
              Which state has highest unemployment?
            </span>
            <span className="mospi-query-pill mospi-query-pill-blue">
              Latest GDP growth rate
            </span>
          </div>
        </div>
      </section>

      {/* Data Catalog */}
      <section
        id="catalog"
        className="mospi-section mospi-catalog-section fade-in"
      >
        <div className="mospi-container">
          <h2 className="mospi-section-title">eSankhyiki MCP Data Catalogue</h2>
          <p className="mospi-section-description">
            Official datasets available through the MCP server
          </p>

          <div className="mospi-catalog-grid">
            {filteredDatasets.map((dataset) => (
              <a
                key={dataset.id}
                href={dataset.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mospi-catalog-card"
                data-category={dataset.category}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="mospi-catalog-card-header">
                  <span className="mospi-catalog-card-id">{dataset.id}</span>
                  <span className="mospi-catalog-card-category">
                    {dataset.category}
                  </span>
                </div>
                <h3 className="mospi-catalog-card-title">{dataset.name}</h3>
                <p className="mospi-catalog-card-desc">{dataset.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub */}
      <section className="mospi-github-section fade-in">
        <div className="mospi-container">
          <div className="mospi-github-content">
            <div className="mospi-github-text">
              <h4>Open Source</h4>
              <p>
                View the source code, report issues, or contribute to the
                project.
              </p>
            </div>
            <a
              href="https://github.com/nso-india/esankhyiki-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="mospi-github-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    
      <Footer />
    </div>
  );
};

export default MospiMcpPage;