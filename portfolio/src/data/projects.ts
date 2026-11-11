export type Project = {
    name: string;
    repo: string;
    /** One line, shown on featured cards and as the row lead. */
    tagline: string;
    /** Shown in the archive list; falls back to tagline. */
    description?: string;
    tech: string[];
    /** Display period, e.g. "Sep – Oct 2026". */
    period: string;
    /** Year the project is grouped under in the archive. */
    year: number;
    featured?: boolean;
    post?: string;
    team?: boolean;
};

const gh = (name: string) => `https://github.com/vasicm4/${name}`;

// Newest first. Featured projects appear as cards at the top of the page;
// everything else is listed by year below them.
export const projects: Project[] = [
    {
        name: "forkasm",
        repo: gh("forkasm"),
        tagline: "Fork a running WebAssembly sandbox (memory, globals, WASI state and filesystem) in about 100 µs, so an AI agent can branch mid-task and keep the best path.",
        tech: ["Rust", "WebAssembly", "WASI", "userfaultfd"],
        period: "Oct – Nov 2026",
        year: 2026,
        featured: true,
        post: "/blog/forkasm",
    },
    {
        name: "Keyword Spotting: Accent Robustness",
        repo: gh("kws-accent-robustness"),
        tagline: "How much worse does a keyword-spotting CNN get on Serbian-accented speech, and what cheaply fixes it? Few-shot fine-tuning on 1 clip per word recovers a point of accuracy on unseen speakers.",
        tech: ["Python", "PyTorch", "torchaudio", "MLflow"],
        period: "Sep – Oct 2026",
        year: 2026,
        featured: true,
    },
    {
        name: "PicoGPT",
        repo: gh("pico-gpt"),
        tagline: "A decoder-only Transformer written as explicit matrix math in CuPy, with hand-derived backward passes for every layer, verified against PyTorch to a relative error below 1e-5.",
        tech: ["Python", "CuPy", "PyTorch"],
        period: "Jun – Jul 2026",
        year: 2026,
        featured: true,
    },
    {
        name: "Futures Analysis",
        repo: gh("futures-analysis"),
        tagline: "Do WTI, Brent and NVIDIA prices mean-revert? Research project from the Petnica Computational Finance Seminar.",
        description: "Tests whether weekly WTI, Brent and NVIDIA prices behave as white noise, mean-revert or follow a stochastic trend, using AR(1) estimation, unit-root and ARCH tests, and Monte Carlo simulation. Defended at the Petnica Computational Finance Seminar.",
        tech: ["Python", "statsmodels", "Jupyter"],
        period: "Aug 2026",
        year: 2026,
    },
    {
        name: "HNX Lake",
        repo: gh("hnx-lake"),
        tagline: "Serverless medallion data lake on AWS for Hacker News and X.",
        description: "Bronze → Silver → Gold data lake for Hacker News and X, with scheduled Lambda jobs writing Parquet to S3, provisioned in Terraform with a private VPC and least-privilege IAM.",
        tech: ["AWS", "Terraform", "Python"],
        period: "Apr – Jul 2026",
        year: 2026,
    },
    {
        name: "Aegis IoT",
        repo: gh("aegis-iot"),
        tagline: "Highly available, secure distributed system for real-time IoT sensor ingestion and monitoring.",
        description: "Distributed system for real-time ingestion, processing and monitoring of IoT sensor data. Services receive encrypted readings, validate and store them in PostgreSQL, and push alarms to clients in real time over SignalR.",
        tech: ["C#", ".NET 8", "PostgreSQL", "SignalR", "Docker"],
        period: "May – Jun 2026",
        year: 2026,
    },
    {
        name: "Chaotic Cupid",
        repo: gh("chaotic-cupid"),
        tagline: "Real-time matchmaking simulation where a background service routes love letters between users.",
        description: "A background worker matches users on compatibility and routes \"love letters\" between them over a SignalR hub; recipients must acknowledge each letter before getting another, and can block other users.",
        tech: ["C#", ".NET 9", "SignalR"],
        period: "May – Jun 2026",
        year: 2026,
    },
    {
        name: "IP-System",
        repo: gh("ip-system"),
        tagline: "Thread-safe industrial task processing engine.",
        description: "Event-driven, asynchronous producer-consumer engine with a priority job queue, configurable worker pool, retries and timeout handling for concurrent compute and I/O jobs.",
        tech: ["C#", ".NET"],
        period: "Apr – Jun 2026",
        year: 2026,
    },
    {
        name: "Graph Visualiser",
        repo: gh("graph-visualizer"),
        tagline: "Plugin-based web tool for exploring graphs from CSV, JSON or XML.",
        description: "Loads graphs through data-source plugins and shows them in three synchronized views (Tree, Bird's Eye, Main), with search, attribute filters and a built-in CLI. Runs on both Django and Flask.",
        tech: ["Python", "Django", "Flask"],
        period: "Mar 2026",
        year: 2026,
        team: true,
    },
    {
        name: "Voom",
        repo: gh("visor-inc-voom"),
        tagline: "Full-stack ride-sharing platform across web and Android.",
        description: "JWT role-based auth, real-time ride tracking and chat over WebSockets, and OSRM route and price estimation. I wrote service, repository and Selenium end-to-end tests.",
        tech: ["Spring Boot", "Angular", "Android", "PostgreSQL"],
        period: "Dec 2025 – Feb 2026",
        year: 2026,
        team: true,
    },
    {
        name: "Parallel Portfolio Optimization",
        repo: gh("portfolio-optimization"),
        tagline: "Genetic algorithm that evolves portfolios to maximize the Sharpe ratio.",
        description: "Genetic algorithm for asset allocation that maximizes the Sharpe ratio; the Intel TBB version parallelizes fitness evaluation.",
        tech: ["C++", "Intel TBB", "Python"],
        period: "Aug – Sep 2025",
        year: 2025,
    },
    {
        name: "Black Box Optimization",
        repo: gh("black-box-optimization"),
        tagline: "Genetic algorithm that tunes neural network weights when the error function has no analytic form.",
        tech: ["Python", "NumPy", "Jupyter"],
        period: "Aug 2025",
        year: 2025,
    },
    {
        name: "LSM Key-Value Storage Engine",
        repo: gh("key-value-engine"),
        tagline: "Log-structured merge-tree storage engine.",
        description: "LSM-tree key-value engine with a WAL, memtable, SSTables, Bloom filters and an LRU cache, plus HyperLogLog, Count-Min Sketch and SimHash.",
        tech: ["Go"],
        period: "Oct 2024 – Feb 2025",
        year: 2025,
    },
];
