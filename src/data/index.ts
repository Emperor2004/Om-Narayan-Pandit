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
    title: "Intelligent Scene Understanding with Spatial AI",
    description:
      "End-to-end pipeline for real-time scene understanding combining object detection, depth estimation, and semantic segmentation for Industry 5.0 applications.",
    longDescription:
      "This project builds a modular spatial intelligence pipeline that processes video streams in real time. It combines YOLOv8 for object detection, DepthAnything for monocular depth estimation, and a custom semantic fusion layer. The system is designed with Industry 5.0 human-robot collaboration in mind, outputting structured spatial maps that downstream systems can consume via a FastAPI microservice.",
    type: "Deep Learning · Computer Vision",
    tags: ["PyTorch", "YOLO", "OpenCV", "DepthAnything", "FastAPI", "Docker"],
    featured: true,
    githubUrl: "https://github.com/omnarayanpandit",
    demoUrl: "#",
    createdAt: "2025-01-15",
    status: "ongoing",
  },
  {
    id: "cgan-medical",
    title: "Conditional GAN for Medical Image Synthesis",
    description:
      "cGAN architecture for generating augmented medical images to tackle dataset scarcity in clinical AI, with FID score evaluation and mode collapse mitigation.",
    type: "Generative AI",
    tags: ["PyTorch", "GANs", "PIL", "Matplotlib", "Scikit-learn"],
    featured: false,
    githubUrl: "https://github.com/omnarayanpandit",
    createdAt: "2024-10-01",
    status: "completed",
  },
  {
    id: "dqn-portfolio",
    title: "DQN Agent for Financial Portfolio Management",
    description:
      "Deep Q-Network trained on historical market data to optimize multi-asset portfolio allocation. Includes custom Gymnasium environment with realistic transaction costs.",
    type: "Reinforcement Learning",
    tags: ["PyTorch", "Gymnasium", "Pandas", "NumPy", "Plotly"],
    featured: false,
    githubUrl: "https://github.com/omnarayanpandit",
    createdAt: "2024-08-20",
    status: "completed",
  },
  {
    id: "phishing-nlp",
    title: "Phishing Email Classifier with Transformer Fine-tuning",
    description:
      "Fine-tuned BERT for detecting phishing emails with explainability via attention visualization. Achieves 97.2% accuracy on benchmark datasets.",
    type: "NLP · Cybersecurity",
    tags: ["HuggingFace", "BERT", "Transformers", "SHAP", "Flask"],
    featured: false,
    githubUrl: "https://github.com/omnarayanpandit",
    createdAt: "2024-06-10",
    status: "completed",
  },
  {
    id: "business-analytics",
    title: "Predictive Analytics Dashboard for Business KPIs",
    description:
      "ML-powered dashboard forecasting business metrics using ensemble models with automated feature engineering and interactive Streamlit visualizations.",
    type: "Machine Learning",
    tags: ["XGBoost", "Streamlit", "Scikit-learn", "Pandas", "Plotly"],
    featured: false,
    githubUrl: "https://github.com/omnarayanpandit",
    demoUrl: "#",
    createdAt: "2024-04-01",
    status: "completed",
  },
  {
    id: "rl-sim",
    title: "Multi-Agent RL Simulation Environment",
    description:
      "Custom Gymnasium environment for multi-agent cooperative and competitive scenarios, with PPO and MADDPG implementations and TensorBoard logging.",
    type: "Reinforcement Learning",
    tags: ["Python", "Gymnasium", "PPO", "MADDPG", "TensorBoard"],
    featured: false,
    githubUrl: "https://github.com/omnarayanpandit",
    createdAt: "2024-02-15",
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
    "pdfUrl": "/assets/patents/Patent Publication for Plant Disease Detection DL.pdf"
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
