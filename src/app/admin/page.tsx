"use client";

import { useState, useEffect } from "react";
import {
  LogIn, LogOut, Plus, Trash2, Edit3, Save, X,
  FolderCode, BookOpen, FileText, Eye, EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Project, Publication, BlogPost, AdminSection } from "@/types";

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simple: the password IS the token for our Bearer auth
    const res = await fetch("/api/projects", {
      headers: { authorization: `Bearer ${password}` },
    });
    if (res.ok) {
      onLogin(password);
      sessionStorage.setItem("admin_token", password);
    } else {
      setError("Invalid password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-6">
      <div className="w-full max-w-sm bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="font-syne font-extrabold text-2xl mb-1">ONP<span className="text-accent">.</span></div>
          <p className="font-mono text-[0.72rem] text-[var(--muted)] uppercase tracking-widest">Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="admin-input pr-10"
              required
            />
            <button type="button" onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] cursor-none">
              {show ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {error && <p className="font-mono text-[0.72rem] text-red-400">{error}</p>}
          <Button type="submit" variant="primary" className="w-full" loading={loading}>
            <LogIn size={14} /> Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminDashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<AdminSection>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const headers = { "Content-Type": "application/json", authorization: `Bearer ${token}` };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [pRes, pubRes, bRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/publications"),
        fetch("/api/blog"),
      ]);
      const [p, pub, b] = await Promise.all([pRes.json(), pubRes.json(), bRes.json()]);
      setProjects(p.data || []);
      setPublications(pub.data || []);
      setPosts(b.data || []);
      setLoading(false);
    };
    load();
  }, []);

  const tabs = [
    { id: "projects" as AdminSection, label: "Projects", icon: FolderCode, count: projects.length },
    { id: "publications" as AdminSection, label: "Publications", icon: BookOpen, count: publications.length },
    { id: "blog" as AdminSection, label: "Blog Posts", icon: FileText, count: posts.length },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="font-syne font-extrabold text-lg">ONP<span className="text-accent">.</span> <span className="font-mono text-[0.72rem] text-[var(--muted)] font-normal">admin</span></div>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut size={12} /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[var(--border)] pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 font-mono text-[0.75rem] px-4 py-2 rounded-lg transition-all cursor-none ${
                activeTab === tab.id
                  ? "bg-accent/15 text-accent border border-accent/30"
                  : "text-[var(--muted)] hover:text-[var(--text)] border border-transparent"
              }`}
            >
              <tab.icon size={13} />
              {tab.label}
              <span className="font-mono text-[0.65rem] opacity-60">({tab.count})</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 font-mono text-[var(--muted)]">Loading...</div>
        ) : (
          <>
            {activeTab === "projects" && (
              <ProjectsAdmin
                projects={projects}
                setProjects={setProjects}
                headers={headers}
              />
            )}
            {activeTab === "publications" && (
              <PublicationsAdmin
                publications={publications}
                setPublications={setPublications}
                headers={headers}
              />
            )}
            {activeTab === "blog" && (
              <BlogAdmin
                posts={posts}
                setPosts={setPosts}
                headers={headers}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Projects Admin ───────────────────────────────────────────────────────────

function ProjectsAdmin({ projects, setProjects, headers }: {
  projects: Project[];
  setProjects: (p: Project[]) => void;
  headers: Record<string, string>;
}) {
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);
  const blank: Omit<Project, "id"> = {
    title: "", description: "", type: "", tags: [],
    featured: false, createdAt: new Date().toISOString().slice(0, 10), status: "ongoing",
  };
  const [form, setForm] = useState<Omit<Project, "id">>(blank);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE", headers });
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleSave = async () => {
    if (editing) {
      const res = await fetch("/api/projects", {
        method: "PUT", headers,
        body: JSON.stringify({ ...form, id: editing.id }),
      });
      const data = await res.json();
      setProjects(projects.map((p) => (p.id === editing.id ? data.data : p)));
      setEditing(null);
    } else {
      const res = await fetch("/api/projects", { method: "POST", headers, body: JSON.stringify(form) });
      const data = await res.json();
      setProjects([...projects, data.data]);
      setAdding(false);
    }
    setForm(blank);
  };

  const openEdit = (p: Project) => { setEditing(p); setForm(p); setAdding(false); };
  const openAdd = () => { setAdding(true); setEditing(null); setForm(blank); };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-syne font-bold text-xl">Projects</h2>
        <Button variant="outline" size="sm" onClick={openAdd}><Plus size={12} /> Add Project</Button>
      </div>

      {(adding || editing) && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 mb-6 space-y-4">
          <h3 className="font-syne font-bold">{editing ? "Edit Project" : "New Project"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <input className="admin-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="admin-input" placeholder="Type (e.g. Deep Learning)" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          </div>
          <textarea className="admin-input resize-none" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input className="admin-input" placeholder="Tags (comma separated)" value={Array.isArray(form.tags) ? form.tags.join(", ") : ""} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((t) => t.trim()) })} />
            <input className="admin-input" placeholder="GitHub URL" value={form.githubUrl || ""} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input className="admin-input" placeholder="Demo URL" value={form.demoUrl || ""} onChange={(e) => setForm({ ...form, demoUrl: e.target.value })} />
            <select className="admin-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Project["status"] })}>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <label className="flex items-center gap-2 font-mono text-sm text-[var(--muted)] cursor-none">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured project
          </label>
          <div className="flex gap-3">
            <Button variant="primary" size="sm" onClick={handleSave}><Save size={12} /> Save</Button>
            <Button variant="ghost" size="sm" onClick={() => { setEditing(null); setAdding(false); }}><X size={12} /> Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-syne font-bold">{p.title}</span>
                {p.featured && <Badge variant="accent">Featured</Badge>}
                <Badge variant={p.status === "completed" ? "success" : p.status === "ongoing" ? "accent" : "muted"}>{p.status}</Badge>
              </div>
              <p className="text-[var(--muted)] text-sm line-clamp-1">{p.description}</p>
            </div>
            <div className="flex gap-2 flex-none">
              <Button variant="ghost" size="sm" onClick={() => openEdit(p)}><Edit3 size={12} /></Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}><Trash2 size={12} /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Publications Admin ───────────────────────────────────────────────────────

function PublicationsAdmin({ publications, setPublications, headers }: {
  publications: Publication[];
  setPublications: (p: Publication[]) => void;
  headers: Record<string, string>;
}) {
  const [editing, setEditing] = useState<Publication | null>(null);
  const [adding, setAdding] = useState(false);
  const blank: Omit<Publication, "id"> = {
    title: "", venue: "", year: new Date().getFullYear().toString(),
    description: "", status: "in-progress", authors: [], tags: [],
  };
  const [form, setForm] = useState<Omit<Publication, "id">>(blank);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this publication?")) return;
    await fetch(`/api/publications?id=${id}`, { method: "DELETE", headers });
    setPublications(publications.filter((p) => p.id !== id));
  };

  const handleSave = async () => {
    if (editing) {
      const res = await fetch("/api/publications", { method: "PUT", headers, body: JSON.stringify({ ...form, id: editing.id }) });
      const data = await res.json();
      setPublications(publications.map((p) => (p.id === editing.id ? data.data : p)));
      setEditing(null);
    } else {
      const res = await fetch("/api/publications", { method: "POST", headers, body: JSON.stringify(form) });
      const data = await res.json();
      setPublications([...publications, data.data]);
      setAdding(false);
    }
    setForm(blank);
  };

  const openEdit = (p: Publication) => { setEditing(p); setForm(p); setAdding(false); };
  const openAdd = () => { setAdding(true); setEditing(null); setForm(blank); };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-syne font-bold text-xl">Publications</h2>
        <Button variant="outline" size="sm" onClick={openAdd}><Plus size={12} /> Add Publication</Button>
      </div>

      {(adding || editing) && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 mb-6 space-y-4">
          <h3 className="font-syne font-bold">{editing ? "Edit Publication" : "New Publication"}</h3>
          <input className="admin-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input className="admin-input" placeholder="Venue / Conference" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
            <input className="admin-input" placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
          </div>
          <textarea className="admin-input resize-none" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input className="admin-input" placeholder="Authors (comma separated)" value={form.authors.join(", ")} onChange={(e) => setForm({ ...form, authors: e.target.value.split(",").map((a) => a.trim()) })} />
            <input className="admin-input" placeholder="Tags (comma separated)" value={form.tags.join(", ")} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((t) => t.trim()) })} />
          </div>
          <select className="admin-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Publication["status"] })}>
            <option value="published">Published</option>
            <option value="under-review">Under Review</option>
            <option value="in-progress">In Progress</option>
            <option value="technical-report">Technical Report</option>
          </select>
          <div className="flex gap-3">
            <Button variant="primary" size="sm" onClick={handleSave}><Save size={12} /> Save</Button>
            <Button variant="ghost" size="sm" onClick={() => { setEditing(null); setAdding(false); }}><X size={12} /> Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {publications.map((p) => (
          <div key={p.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-start justify-between gap-4">
            <div>
              <span className="font-syne font-bold block mb-1">{p.title}</span>
              <span className="text-[var(--muted)] text-sm">{p.venue} · {p.year}</span>
            </div>
            <div className="flex gap-2 flex-none">
              <Button variant="ghost" size="sm" onClick={() => openEdit(p)}><Edit3 size={12} /></Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}><Trash2 size={12} /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Blog Admin ───────────────────────────────────────────────────────────────

function BlogAdmin({ posts, setPosts, headers }: {
  posts: BlogPost[];
  setPosts: (p: BlogPost[]) => void;
  headers: Record<string, string>;
}) {
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [adding, setAdding] = useState(false);
  const blank: Omit<BlogPost, "id" | "slug" | "readTime"> = {
    title: "", excerpt: "", content: "", tags: [],
    publishedAt: new Date().toISOString().slice(0, 10), published: false,
  };
  const [form, setForm] = useState<Omit<BlogPost, "id" | "slug" | "readTime">>(blank);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/blog?id=${id}`, { method: "DELETE", headers });
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleSave = async () => {
    if (editing) {
      const res = await fetch("/api/blog", { method: "PUT", headers, body: JSON.stringify({ ...form, id: editing.id, slug: editing.slug }) });
      const data = await res.json();
      setPosts(posts.map((p) => (p.id === editing.id ? data.data : p)));
      setEditing(null);
    } else {
      const res = await fetch("/api/blog", { method: "POST", headers, body: JSON.stringify(form) });
      const data = await res.json();
      setPosts([...posts, data.data]);
      setAdding(false);
    }
    setForm(blank);
  };

  const openEdit = (p: BlogPost) => { setEditing(p); setForm(p); setAdding(false); };
  const openAdd = () => { setAdding(true); setEditing(null); setForm(blank); };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-syne font-bold text-xl">Blog Posts</h2>
        <Button variant="outline" size="sm" onClick={openAdd}><Plus size={12} /> New Post</Button>
      </div>

      {(adding || editing) && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 mb-6 space-y-4">
          <h3 className="font-syne font-bold">{editing ? "Edit Post" : "New Post"}</h3>
          <input className="admin-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="admin-input" placeholder="Excerpt (1-2 sentences)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <textarea className="admin-input resize-none font-mono text-xs" rows={12} placeholder="Content (Markdown supported)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input className="admin-input" placeholder="Tags (comma separated)" value={Array.isArray(form.tags) ? form.tags.join(", ") : ""} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((t) => t.trim()) })} />
            <input className="admin-input" type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} />
          </div>
          <label className="flex items-center gap-2 font-mono text-sm text-[var(--muted)] cursor-none">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published (visible to visitors)
          </label>
          <div className="flex gap-3">
            <Button variant="primary" size="sm" onClick={handleSave}><Save size={12} /> Save</Button>
            <Button variant="ghost" size="sm" onClick={() => { setEditing(null); setAdding(false); }}><X size={12} /> Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-syne font-bold">{p.title}</span>
                <Badge variant={p.published ? "success" : "muted"}>{p.published ? "Published" : "Draft"}</Badge>
              </div>
              <span className="text-[var(--muted)] text-sm">{p.publishedAt} · {p.readTime} min read</span>
            </div>
            <div className="flex gap-2 flex-none">
              <Button variant="ghost" size="sm" onClick={() => openEdit(p)}><Edit3 size={12} /></Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}><Trash2 size={12} /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (stored) setToken(stored);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
  };

  if (!token) return <LoginForm onLogin={setToken} />;
  return <AdminDashboard token={token} onLogout={handleLogout} />;
}
