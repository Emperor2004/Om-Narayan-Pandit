import type {
  Project,
  Publication,
  BlogPost,
  SkillCategory,
  Achievement,
  TimelineItem,
} from "@/types";

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "spatial-ai",
    title: "Spatial AI Digital Twin for Human-Centric Industrial Operations",
    description:
      "A Spatial AI digital twin that monitors human activity in industrial environments in real time, combining pose estimation and activity recognition for worker safety and operational efficiency.",
    longDescription:
      "This project constructs a digital twin layer over industrial environments by processing live video streams for human activity understanding. Pose estimation models track worker postures and motion trajectories, feeding an activity recognition module that flags unsafe behaviours — such as unauthorised zone entry or ergonomic risk postures — and triggers automated safety alerts. The system is designed with Industry 5.0 human-centric principles in mind, outputting structured spatial event logs consumable by downstream safety dashboards. The architecture is modular, allowing camera feeds from multiple zones to be fused into a unified scene representation.",
    type: "Computer Vision · Deep Learning",
    tags: ["PyTorch", "OpenCV", "Pose Estimation", "Activity Recognition", "Python", "Industry 5.0"],
    featured: true,
    // githubUrl: "https://github.com/omnarayanpandit",
    // demoUrl: "#",
    createdAt: "2026-01-15",
    status: "prototype",
  },

  {
    id: "behaverl",
    title: "BehaveRL — Prospect Theory-Driven RL Trading Agent",
    description:
      "A PPO-based reinforcement learning trading agent shaped by Kahneman-Tversky Prospect Theory, with HMM market-regime detection and KernelSHAP policy explainability.",
    longDescription:
      "BehaveRL is a full-stack academic research project combining behavioural economics with deep reinforcement learning. A PPO agent (Stable-Baselines3) is trained on stock data sourced via Alpha Vantage and FRED APIs, with a custom reward function that encodes loss aversion and probability weighting from Prospect Theory (Kahneman-Tversky, 1979). Hidden Markov Models detect market regimes (bull/bear/sideways), dynamically adjusting the agent's risk parameter lambda. KernelSHAP provides post-hoc policy explainability, attributing decisions to input features. A rational baseline agent enables controlled comparison. Results and SHAP attributions are visualised on a dark-themed Flask dashboard. Validation suite reached 88/90 automated checks.",
    type: "Reinforcement Learning · Quantitative Finance",
    tags: ["Python", "Stable-Baselines3", "PyTorch", "SHAP", "HMM", "Flask", "Alpha Vantage", "FRED API"],
    featured: false,
    // githubUrl: "https://github.com/omnarayanpandit",
    // demoUrl: "#",
    createdAt: "2026-01-10",
    status: "ongoing",
  },

  {
    id: "bolo-bazaar",
    title: "Bolo Bazaar — Voice-First Rural Commerce & Credit Platform",
    description:
      "A voice-first commerce and informal credit platform for rural/semi-urban Indian vendors, built on IndicWhisper ASR with Hindi NLU, a digital udhar ledger, and SMS/USSD fallback.",
    longDescription:
      "Bolo Bazaar was conceived at the ET AI Hackathon 2026 to bridge the digital divide for rural vendors with limited literacy or smartphone access. The core pipeline uses IndicWhisper for Hindi automatic speech recognition, feeding a lightweight NLU layer for intent classification (list product, check credit, settle dues). A digital 'udhar' ledger replaces informal paper-based credit tracking between vendors and customers. For feature-phone users, the system degrades gracefully to SMS and USSD flows. The 48-hour implementation strategy included a structured monorepo, phased commit plan with conventional commit tags, and a quantified rural impact model estimating reach across semi-urban Indian markets.",
    type: "NLP · Voice AI · FinTech",
    tags: ["Python", "IndicWhisper", "ASR", "NLU", "Flask", "USSD", "SMS", "Hindi NLP"],
    featured: false,
    // githubUrl: "https://github.com/omnarayanpandit",
    // demoUrl: "#",
    createdAt: "2026-02-17",
    status: "prototype",
  },

  {
    id: "plant-disease-detection",
    title: "Plant Disease Detection via Deep Learning — Published Patent",
    description:
      "A CNN-based image classification system that detects and categorises plant diseases from leaf photographs, resulting in a published patent at the Indian Patent Office.",
    longDescription:
      "This system uses a convolutional neural network trained on labelled leaf image datasets to identify and classify plant diseases across multiple crop species. The model pipeline includes preprocessing (normalisation, augmentation), a custom CNN architecture with residual connections, and a softmax classification head covering common disease categories. The system achieved strong benchmark accuracy and was designed for deployment on low-resource edge devices used by farmers in the field. The research contribution and novelty of the automated detection method led to a patent publication: 'System and Method for Automated Plant Disease Detection Using Deep Learning Image Classification', Indian Patent Office, December 2025.",
    type: "Computer Vision · Deep Learning",
    tags: ["PyTorch", "CNN", "Image Classification", "OpenCV", "Python", "Edge AI"],
    featured: false,
    // githubUrl: "https://github.com/omnarayanpandit",
    // demoUrl: "#",
    createdAt: "2025-01-20",
    status: "completed",
  },

  {
    id: "financial-awareness-chatbot",
    title: "Financial Awareness Chatbot",
    description:
      "A privacy-focused conversational agent that addresses financial fraud queries and promotes safe digital banking practices for first-time users.",
    longDescription:
      "Designed for users new to digital financial services, this chatbot handles a curated intent set covering common fraud scenarios — phishing, UPI scams, fake loan apps, and OTP theft — alongside general safe-banking guidance. The NLU layer is built on a lightweight intent classifier trained on domain-specific conversation data in both English and Hinglish. The system is privacy-first by design: no user data is logged or stored, and all inference runs locally. Responses are structured to be actionable, with clear next steps and escalation paths to official fraud reporting channels. Deployed via a Flask backend with a clean web chat interface.",
    type: "NLP · Conversational AI · FinTech",
    tags: ["Python", "Flask", "NLU", "Intent Classification", "Chatbot", "Hinglish NLP"],
    featured: false,
    // githubUrl: "https://github.com/omnarayanpandit",
    // demoUrl: "#",
    createdAt: "2025-08-06",
    status: "completed",
  },

  {
    id: "blood-bank-management",
    title: "Blood Bank Management System",
    description:
      "A data-driven blood bank platform with automated inventory tracking, donor matching, and demand forecasting to reduce blood shortage response time.",
    longDescription:
      "This full-stack application addresses the operational inefficiencies in blood bank management by automating inventory lifecycle tracking — from donation intake to expiry monitoring. A donor matching module pairs requests with compatible available units in real time. Demand forecasting uses historical request patterns to predict shortages ahead of time, triggering proactive donor outreach. The admin dashboard provides live inventory status, expiry alerts, and request fulfilment metrics. Built with a React frontend, Node.js/Express backend, and MongoDB for flexible document storage, the system is designed to be deployable by small regional blood banks without significant infrastructure investment.",
    type: "Full-Stack · Data Engineering",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "Data Forecasting"],
    featured: false,
    // githubUrl: "https://github.com/omnarayanpandit",
    // demoUrl: "#",
    createdAt: "2025-02-09",
    status: "completed",
  },
];

// ─── Publications ─────────────────────────────────────────────────────────────

export const publications: Publication[] = [
  {
    "id": "plant-disease-dl-patent-2025",
    "title": "System and Method for Automated Plant Disease Detection Using Deep Learning Image Classification",
    "venue": "Patent Office Journal, India (Issue 50/2025)",
    "year": "2025",
    "description": "A deep learning–based image classification system for automated plant disease detection, aimed at enabling accurate, scalable, and real-time diagnosis to support precision agriculture and decision-making.",
    "status": "published",
    "authors": [
      "Nimit Prakash",
      "Om Narayan Pandit",
      "Vraj Patel",
      "Vedant Shitole",
      "Dr. Shrikrishna Kolhar"
    ],
    "tags": [
      "Deep Learning",
      "Computer Vision",
      "AgriTech",
      "Image Classification",
      "Artificial Intelligence"
    ],
    "pdfUrl": "/assets/patents/Patent_Publication_Plant_Disease_DL.pdf"
  },
  // {
  //   id: "nlp-cybersec-2025",
  //   title:
  //     "Towards Ethical and Explainable NLP Models for Cybersecurity Threat Detection",
  //   venue: "International Conference on AI Applications (ICAIA 2025)",
  //   year: "2025",
  //   description:
  //     "Proposes a framework for interpretable NLP systems in cybersecurity, focusing on explainability through attention mechanisms, integrated gradients, and responsible deployment guidelines.",
  //   status: "under-review",
  //   authors: ["Om Narayan Pandit", "Advisor Name"],
  //   tags: ["NLP", "Cybersecurity", "Explainability", "BERT"],
  //   arxivUrl: "#",
  // },
  // {
  //   id: "rl-domains-2025",
  //   title:
  //     "Reinforcement Learning for Real-World Optimization: Challenges in Financial and Industrial Domains",
  //   venue: "Working Paper",
  //   year: "2025",
  //   description:
  //     "Survey and empirical analysis of RL algorithm performance in non-stationary environments with limited compute, drawing lessons from financial portfolio optimization and industrial scheduling.",
  //   status: "in-progress",
  //   authors: ["Om Narayan Pandit"],
  //   tags: ["Reinforcement Learning", "Finance", "Industry 5.0", "DQN", "PPO"],
  // },
  // {
  //   id: "gans-medical-2024",
  //   title:
  //     "Generative Adversarial Networks in Medical Imaging: A Feasibility Study on Low-Resource Settings",
  //   venue: "B.Tech Technical Report · Department of Computer Science",
  //   year: "2024",
  //   description:
  //     "Evaluated GAN architectures for synthetic data generation in low-data clinical scenarios, with focus on training stability, mode collapse mitigation, and FID-based quality evaluation.",
  //   status: "technical-report",
  //   authors: ["Om Narayan Pandit"],
  //   tags: ["GANs", "Medical Imaging", "Deep Learning", "Data Augmentation"],
  //   pdfUrl: "#",
  // },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    id: "network-layer-internets-gps",
    title: "The Internet’s GPS: A Deep Dive into the Network Layer (OSI Layer 3)",
    slug: "internets-gps-network-layer-osi-layer-3",
    excerpt:
      "Ever wondered how your computer finds Google in milliseconds? This blog breaks down the Network Layer (OSI Layer 3) with intuitive explanations and a hands-on perspective on IP addressing and routing.",
    url: "https://medium.com/@panditom2003/the-internets-gps-a-deep-dive-into-the-network-layer-osi-layer-3-2d18fe9b1020",
    content: `## Introduction: How Does the Internet Find Its Way?

When you type "google.com" into your browser, the request travels across multiple networks and reaches the correct server in milliseconds. But how does your data know where to go?

This is where the **Network Layer (OSI Layer 3)** comes in — often called the *Internet’s GPS*. It is responsible for identifying devices and determining the best path for data to travel.

## What is the Network Layer?

The Network Layer is the third layer in the OSI model. Its primary responsibilities include:

- Logical addressing (IP addresses)
- Routing (path selection)
- Packet forwarding

Unlike lower layers that deal with physical transmission, this layer ensures data reaches the correct destination across interconnected networks.

## IP Addressing: The Identity of Devices

Every device on a network is assigned an **IP address**, which acts like a unique identifier.

There are two main types:
- **IPv4** (e.g., 192.168.1.1)
- **IPv6** (e.g., 2001:0db8:85a3::8a2e:0370:7334)

IP addresses help routers determine where to send packets.

## Routing: Finding the Best Path

Routing is the process of selecting the most efficient path from source to destination.

Routers:
- Maintain routing tables
- Use algorithms to determine optimal paths
- Forward packets accordingly

Think of routers like traffic controllers that constantly decide the best route for your data.

## How Data Travels Across the Internet

1. You enter a URL in your browser
2. DNS resolves it to an IP address
3. Packets are created and sent
4. Routers forward packets across networks
5. The destination server responds

All of this happens in milliseconds — thanks to the Network Layer.

## Hands-On Perspective

You can observe this process using simple tools:

- \`ping google.com\` → checks connectivity
- \`tracert google.com\` / \`traceroute\` → shows the path taken by packets

These tools reveal how your data travels across multiple nodes before reaching its destination.

## Key Takeaway

The Network Layer acts as the backbone of the internet, enabling seamless communication between devices across the globe. Without it, reliable and efficient data transfer would not be possible.`,
    tags: [
      "OSI Model",
      "Network Layer",
      "IP Address",
      "Routing",
      "Computer Networks"
    ],
    publishedAt: "2025-11-03",
    readTime: 5,
    published: true
  }
  //   {
  //     id: "rl-intuition",
  //     title: "Building Intuition for Reinforcement Learning: From Bandits to PPO",
  //     slug: "rl-intuition-bandits-to-ppo",
  //     excerpt:
  //       "A conceptual journey through RL — why rewards matter, what policy gradient really means, and how PPO solves the 'step size problem' elegantly.",
  //     content: `## Why Reinforcement Learning Feels Different

  // Most supervised learning problems have a ground truth. You predict, you compare, you backpropagate. But in RL, the agent must *discover* what good behavior looks like through interaction with an environment. This fundamental shift in paradigm is what makes RL both fascinating and notoriously hard to debug.

  // ## Multi-Armed Bandits: The Simplest Case

  // Imagine a slot machine with k arms, each with an unknown reward distribution. Your goal is to maximize cumulative reward over time. This is the exploration-exploitation tradeoff in its purest form:

  // - **Exploitation**: Pull the arm that has given the highest average reward so far.
  // - **Exploration**: Pull a random arm to gather more information.

  // The ε-greedy strategy is the simplest solution: with probability ε, explore randomly; otherwise exploit.

  // ## From Bandits to MDPs

  // Real-world problems have *state* — your actions change the environment, which changes what actions are possible next. Markov Decision Processes (MDPs) formalize this: a tuple (S, A, P, R, γ) where states, actions, transitions, rewards, and a discount factor define the problem.

  // The Bellman equation gives us the foundation for all value-based methods:

  // > V(s) = max_a [ R(s,a) + γ · Σ P(s'|s,a) · V(s') ]

  // ## Policy Gradient and the Problem of Step Size

  // Policy gradient methods directly optimize the policy. The REINFORCE algorithm is conceptually elegant — increase the probability of actions that led to high returns. But vanilla PG suffers from high variance and sensitivity to step size.

  // **PPO** (Proximal Policy Optimization) introduces a clipped objective that prevents the policy from changing too drastically in a single update. This "trust region" idea is what makes PPO remarkably stable for a wide range of tasks.

  // ## Key Takeaway

  // The progression from bandits → tabular RL → deep RL → PPO is a story of increasingly sophisticated ways to answer the same question: *how do we improve behavior from experience without breaking what already works?*`,
  //     tags: ["Reinforcement Learning", "PPO", "Deep Learning", "Tutorial"],
  //     publishedAt: "2025-06-10",
  //     readTime: 8,
  //     published: true,
  //   },
  //   {
  //     id: "gans-demystified",
  //     title: "GANs Demystified: Why the Discriminator is Your Best Teacher",
  //     slug: "gans-demystified-discriminator",
  //     excerpt:
  //       "Understanding GANs through the lens of game theory — the minimax game, mode collapse, and why Wasserstein distance changed everything.",
  //     content: `## The Adversarial Idea

  // Generative Adversarial Networks introduce a beautiful idea: instead of defining a loss function for generation explicitly, let a *learned critic* (the Discriminator) define it. The Generator and Discriminator play a minimax game:

  // > min_G max_D [ E[log D(x)] + E[log(1 - D(G(z)))] ]

  // This adversarial dynamic drives the generator to produce increasingly realistic samples.

  // ## Mode Collapse: The Silent Killer

  // The most frustrating failure mode in GAN training is mode collapse — where the generator learns to produce only a narrow range of outputs that fool the discriminator, ignoring large portions of the real data distribution.

  // Causes include: the generator finding a single "safe" region the discriminator can't distinguish, and the discriminator overfitting to those specific samples.

  // ## Wasserstein GAN: A Better Measure of Distance

  // The original GAN uses JS divergence, which can saturate and produce vanishing gradients. WGAN uses the Wasserstein distance (Earth Mover's Distance) instead — it provides meaningful gradients even when distributions have non-overlapping support.

  // The key change: remove the sigmoid from the discriminator (now called a "critic"), clip weights, and use a different loss. Later, WGAN-GP improved this further with gradient penalty instead of weight clipping.

  // ## Practical Tips for Stable GAN Training

  // - Use spectral normalization in the discriminator
  // - Try progressive growing for high-resolution synthesis
  // - Monitor FID (Fréchet Inception Distance) not just visual quality
  // - Balance generator and discriminator update frequency

  // ## Conclusion

  // GANs remain one of the most elegant ideas in deep learning. Understanding the game-theoretic foundation helps you debug training instability and choose the right variant for your task.`,
  //     tags: ["GANs", "Generative AI", "Deep Learning", "Tutorial"],
  //     publishedAt: "2025-04-22",
  //     readTime: 6,
  //     published: true,
  //   },
  //   {
  //     id: "industry-5-ai",
  //     title: "Industry 5.0 and the Role of Spatial AI in Human-Robot Collaboration",
  //     slug: "industry-5-spatial-ai-human-robot",
  //     excerpt:
  //       "While Industry 4.0 was about automation, Industry 5.0 brings humans back into the loop. Spatial AI is the key enabling technology.",
  //     content: `## Beyond Automation: The Industry 5.0 Vision

  // Industry 4.0 gave us smart factories — automated, connected, data-driven. But it also raised concerns about human displacement. Industry 5.0 pivots: it emphasizes human-centricity, sustainability, and resilience, with technology serving human goals rather than replacing human workers.

  // ## What is Spatial AI?

  // Spatial AI refers to systems that understand and reason about 3D space — not just detecting *what* is in a scene, but *where* things are, how they relate to each other, and how that space will evolve. Key capabilities include:

  // - **3D object detection**: Not bounding boxes, but volumetric understanding
  // - **Semantic mapping**: Building persistent, annotated maps of environments
  // - **Human pose estimation**: Understanding human intent and movement
  // - **Affordance detection**: What can be done with/to each object?

  // ## Applications in Human-Robot Collaboration

  // In a collaborative workspace, a robot needs to:
  // 1. Know where the human is (pose estimation)
  // 2. Predict where the human will move (trajectory forecasting)
  // 3. Adjust its own motion to avoid conflict zones (dynamic planning)
  // 4. Understand shared tasks (semantic scene graph)

  // Spatial AI integrates all of these into a coherent, real-time world model.

  // ## The Research Frontier

  // Current challenges include: real-time performance on edge hardware, generalization to novel environments, robust performance under occlusion, and handling the long-tail of rare but critical scenarios.

  // My current project explores this intersection — building a modular spatial understanding pipeline that feeds into a planning system designed for collaborative industrial settings.`,
  //     tags: ["Industry 5.0", "Spatial AI", "Robotics", "Computer Vision"],
  //     publishedAt: "2025-02-14",
  //     readTime: 7,
  //     published: true,
  //   },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    name: "ML / DL Frameworks",
    skills: ["PyTorch", "TensorFlow", "Keras", "HuggingFace", "Scikit-learn", "JAX"],
    color: "accent",
  },
  {
    name: "Computer Vision & NLP",
    skills: ["OpenCV", "YOLOv8", "CLIP", "BERT", "Transformers", "Detectron2"],
    color: "cyan",
  },
  {
    name: "Reinforcement Learning",
    skills: ["Gymnasium", "Stable-Baselines3", "PPO", "DQN", "MADDPG", "RLlib"],
    color: "pink",
  },
  {
    name: "Languages & Tools",
    skills: ["Python", "TypeScript", "Git", "Docker", "Linux", "FastAPI"],
    color: "accent",
  },
  {
    name: "Data & Visualization",
    skills: ["NumPy", "Pandas", "Matplotlib", "Plotly", "TensorBoard", "W&B"],
    color: "cyan",
  },
  {
    name: "Research & Gen AI",
    skills: ["GANs", "Diffusion Models", "LLMs", "Prompt Engineering", "PEFT / LoRA", "RAG"],
    color: "pink",
  },
];

// ─── Achievements ─────────────────────────────────────────────────────────────

export const achievements: Achievement[] = [
  {
    id: "hackathon",
    icon: "🏆",
    title: "Hackathon Finalist",
    description: "Finalist in national AI/ML hackathon for intelligent automation solution",
    year: "2024",
  },
  {
    id: "research",
    icon: "🔬",
    title: "Research Contributor",
    description: "Active contributor to department AI research initiatives and publications",
    year: "2025",
  },
  {
    id: "certs",
    icon: "📚",
    title: "3+ Certifications",
    description: "Deep Learning Specialization (Coursera), RL Fundamentals, Advanced NLP",
    year: "2024",
  },
  {
    id: "opensource",
    icon: "💡",
    title: "Open Source",
    description: "Contributor to open-source ML tooling and publicly shared datasets",
    year: "2024",
  },
  {
    id: "mentor",
    icon: "🎓",
    title: "Peer Mentor",
    description: "Mentored junior students in ML foundations and project development",
    year: "2025",
  },
  {
    id: "paper",
    icon: "✍️",
    title: "Paper Under Review",
    description: "NLP for cybersecurity paper submitted to international conference",
    year: "2025",
  },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────

export const timeline: TimelineItem[] = [
  {
    id: "btech",
    date: "2023 – 2027",
    title: "B.Tech in Artificial Intelligence & Machine Learning",
    institution: "Symbiosis Institute of Technology, Pune",
    description:
      "Pursuing a specialized degree in AI & ML with hands-on experience in machine learning, deep learning, computer vision, NLP, and reinforcement learning. Actively involved in building real-world projects and strengthening problem-solving through technical research and viva preparation.",
    badge: "Ongoing",
    type: "education",
  },
  {
    id: "dbm",
    date: "2025 – 2026",
    title: "Diploma in Business Management",
    institution: "Symbiosis Institute of Technology, Pune",
    description:
      "Developing foundational knowledge in business strategy, management principles, and entrepreneurship. Focused on bridging technical expertise with business decision-making and product-oriented thinking.",
    badge: "Ongoing",
    type: "education",
  },
  // {
  //   id: "research-ai",
  //   date: "2023 – Present",
  //   title: "Independent AI Researcher",
  //   institution: "Self-directed Research",
  //   description:
  //     "Exploring advanced domains such as spatial AI, NLP for cybersecurity, and reinforcement learning for real-world optimization. Building production-ready ML systems and contributing to research-oriented problem solving.",
  //   badge: "Active",
  //   type: "experience",
  // },
  {
    id: "intermediate",
    date: "2020 – 2022",
    title: "Higher Secondary Education",
    institution: "Delhi Public School, NTPC Farakka",
    description:
      "Built a strong academic foundation in mathematics and science, with early exposure to programming concepts and logical problem-solving.",
    badge: "Completed",
    type: "education",
  },
  {
    id: "matriculation",
    date: "2018 – 2020",
    title: "Secondary Education",
    institution: "Delhi Public School, NTPC Farakka",
    description:
      "Developed core analytical thinking and academic discipline, laying the groundwork for future studies in science and technology.",
    badge: "Completed",
    type: "education",
  }

];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "1+", label: "Research Papers" },
  { value: "6", label: "Skill Domains" },
  { value: "2027", label: "Graduating Year" },
];
