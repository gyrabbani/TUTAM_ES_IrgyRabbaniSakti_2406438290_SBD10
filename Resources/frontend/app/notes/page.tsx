"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COLORS = [
  { name: "Blue", class: "bg-blue-100" },
  { name: "Yellow", class: "bg-amber-100" },
  { name: "Green", class: "bg-green-100" },
  { name: "Red", class: "bg-red-100" },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  
  // State untuk Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    color: "bg-amber-100"
  });

  // URL Backend Express
  const API_URL = "http://localhost:5000/api/notes";

  // --- 1. FETCH DATA DARI BACKEND (READ) ---
  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  // Jalankan fetchNotes saat halaman pertama kali dibuka
  useEffect(() => {
    fetchNotes();
  }, []);

  // --- 2. LOGIKA DELETE ---
  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      // Hapus note dari tampilan layar tanpa perlu refresh
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Gagal menghapus note:", error);
    }
  };

  // --- LOGIKA OPEN MODAL ---
  const openModal = (note?: any) => {
    if (note) {
      setEditingId(note.id);
      setFormData({ title: note.title, content: note.content, color: note.color });
    } else {
      setEditingId(null);
      setFormData({ title: "", content: "", color: "bg-amber-100" });
    }
    setIsModalOpen(true);
  };

  // --- 3. LOGIKA SUBMIT FORM (CREATE & UPDATE) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Update (PUT)
        const response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const updatedNote = await response.json();
        
        // Update tampilan
        setNotes(notes.map(note => note.id === editingId ? updatedNote : note));
      } else {
        // Create (POST)
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const newNote = await response.json();
        
        // Tambahkan note baru ke tampilan atas
        setNotes([newNote, ...notes]);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan note:", error);
    }
  };

  // Format tanggal dari PostgreSQL
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 relative">
      
      {/* Sidebar */}
      <aside className="w-20 sm:w-24 bg-white border-r border-slate-200 flex flex-col items-center py-8 fixed h-full z-10">
        <div className="font-extrabold text-xl mb-12 tracking-tight text-slate-800">
          Coretan
        </div>
        
        <button 
          onClick={() => openModal()}
          title="Add new note"
          className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-700 transition-all shadow-md hover:shadow-lg text-2xl font-light focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          +
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-20 sm:ml-24 p-8 sm:p-12">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-800">
            Hello, Irgy 👋
          </h1>
          <Link 
            href="/login"
            className="px-5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm"
          >
            Logout
          </Link>
        </header>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes.map((note) => (
            <div 
              key={note.id} 
              className={`${note.color} p-6 rounded-2xl shadow-sm flex flex-col aspect-square justify-between transition-transform hover:-translate-y-1 hover:shadow-md`}
            >
              <div>
                <h3 className="font-semibold text-lg text-slate-900 mb-3 leading-tight break-words">
                  {note.title}
                </h3>
                <p className="text-slate-800/80 text-sm leading-relaxed whitespace-pre-wrap break-words line-clamp-6">
                  {note.content}
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <span className="text-xs text-slate-600 font-medium">
                  {formatDate(note.created_at)}
                </span>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => openModal(note)}
                    className="flex-1 text-xs bg-black/5 hover:bg-black/10 text-slate-800 py-2 rounded-lg font-semibold transition-colors text-center"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(note.id)}
                    className="flex-1 text-xs bg-white/40 hover:bg-red-200 text-red-600 py-2 rounded-lg font-semibold transition-colors text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {notes.length === 0 && (
            <div className="col-span-full text-center text-slate-500 mt-10">
              Notes masih kosong nih. Klik tombol + untuk buat note baru!
            </div>
          )}
        </div>
      </main>

      {/* --- MODAL FORM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              {editingId ? "Edit Note" : "New Note"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input 
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  placeholder="Note title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-slate-900 focus:outline-none resize-none"
                  placeholder="Write your thoughts here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
                <div className="flex gap-3">
                  {COLORS.map(color => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setFormData({...formData, color: color.class})}
                      className={`w-8 h-8 rounded-full ${color.class} ${formData.color === color.class ? 'ring-2 ring-offset-2 ring-slate-900' : 'ring-1 ring-slate-200'}`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}