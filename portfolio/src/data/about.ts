export type Entry = {
    title: string;
    org: string;
    period?: string;
    place?: string;
    note?: string;
    points?: string[];
    link?: {label: string; href: string};
};

export const experience: Entry[] = [
    {
        title: "Software Engineer",
        org: "WolkAbout",
        period: "Nov 2025 – Present",
        place: "Novi Sad, Serbia",
        note: "Joined as a Software Engineer Intern in November 2025.",
        points: [
            "Working with the R&D team on an agentic AI workflow, integrating LangChain and the Model Context Protocol (MCP) to connect LLMs to live industrial data sources.",
            "Fine-tuned a prompt-screening guardrail classifier with LoRA on 1,200 production and synthetic adversarial prompts. It replaced an LLM-based check and cut latency from 5 s to 1 s at equal recall on unsafe prompts.",
            "Built and maintained a simulator that lets engineers validate the platform's data ingestion pipelines without physical industrial hardware.",
            "Integrated services into the platform with the core engineering team to extend its industrial interoperability.",
        ],
    },
];

export const education: Entry[] = [
    {
        title: "BSc, Software Engineering",
        org: "Faculty of Technical Sciences, University of Novi Sad",
        period: "Oct 2023 – Sep 2027",
        place: "Novi Sad, Serbia",
        note: "Grade 9.30 / 10.0",
    },
    {
        title: "Natural Sciences, Serbian–French bilingual class",
        org: "Jovan Jovanović Zmaj Grammar School",
        period: "Sep 2019 – May 2023",
        place: "Novi Sad, Serbia",
        note: "Grade 5.0 / 5.0",
        points: [
            "Erasmus+ \"TIME for Digitalization\": built digital teaching resources with schools from Romania and Greece, contributing to an open library of 28+ resources in an EU-funded project.",
            "Led a French-language theater performance with schoolmates and organized it as a fundraiser for a friend in need.",
        ],
    },
    {
        title: "Primary school",
        org: "Đorđe Natošević Primary School",
        place: "Novi Sad, Serbia",
        points: [
            "Won a trip to Disneyland Paris at age 7 in the writing competition \"We, the little ones, tell you, the big ones\", and was featured in the newspaper article \"Adults, look up to them!\".",
        ],
    },
];

export const programs: Entry[] = [
    {
        title: "Zero-Knowledge Proofs School",
        org: "Mathematical Academy (Matematička akademija)",
        period: "Oct – Dec 2026",
        place: "Belgrade",
        points: ["Course on zero-knowledge proof systems, supporting my undergraduate thesis."],
    },
    {
        title: "Global Consumer Intelligence (GCI): Data Science & AI Program",
        org: "University of Tokyo, Matsuo-Iwasawa Laboratory",
        period: "Sep – Dec 2026",
        place: "Online",
    },
    {
        title: "Computational Finance Seminar",
        org: "Petnica Science Center",
        period: "Aug 2026",
        place: "Petnica, Valjevo",
        points: ["Mentored research project, defended at the seminar: do WTI, Brent and NVIDIA prices mean-revert? Used AR(1) estimation, unit-root and ARCH tests, and Monte Carlo simulation."],
        link: {label: "Code", href: "https://github.com/vasicm4/futures-analysis"},
    },
    {
        title: "ARTIFACT Summer School",
        org: "AI Institute of Serbia",
        period: "Jul 2025",
        place: "Belgrade",
        points: ["AI for flood risk and disaster prevention: CNNs, LSTMs and graph networks for flood modeling, plus a team pitch for a startup competition."],
    },
    {
        title: "Hot AI Summer",
        org: "Startit",
        points: ["Workshops and lectures on applied AI with industry practitioners."],
    },
];

export const skills: {label: string; items: string[]}[] = [
    {label: "Languages", items: ["Python", "C++", "Go", "Rust", "Java", "C#", "SQL", "TypeScript"]},
    {label: "ML & HPC", items: ["PyTorch", "CuPy", "NumPy", "CUDA C/C++", "Intel TBB", "LangChain", "MCP", "MLflow"]},
    {label: "Systems", items: ["AWS", "GCP", "Docker", "Kubernetes", "PostgreSQL", "Apache Druid", ".NET", "Spring Boot", "gRPC", "Linux", "Git", "CI/CD"]},
    {label: "Certifications", items: ["NVIDIA DLI: Accelerated Computing with CUDA C/C++", "NVIDIA DLI: Scaling Workloads Across Multiple GPUs"]},
    {label: "Spoken", items: ["Serbian (native)", "English (C1, Cambridge CAE)", "French (B2, DELF)"]},
];
