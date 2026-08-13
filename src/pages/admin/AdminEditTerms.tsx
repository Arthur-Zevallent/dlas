import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/Admin/AdminLayout";

export default function AdminEditTerms() {
  const navigate = useNavigate();

  const [terms, setTerms] = useState<string[]>([
    "Anak tinggi badan <90cm tidak perlu membeli tiket, namun jika dalam masuk ke tempat wisata memiliki tinggi badan lebih dari itu, wajib membeli tiket di lokasi",
    "Batas waktu wisatawan masuk pada jam 16.00 dan jika datang lebih jam yang ditentukan, tidak dapat kami layani untuk masuk ke kawasan",
    "Meskipun jam 16.00 wisatawan terakhir boleh masuk, penutupan area sekitar jam 18.00",
  ]);

  const handleTextChange = (index: number, value: string) => {
    const updated = [...terms];
    updated[index] = value;
    setTerms(updated);
  };

  const handleAddTerm = () => {
    setTerms([...terms, ""]);
  };

  const handleDeleteTerm = (index: number) => {
    setTerms(terms.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    alert("Ketentuan berhasil diperbarui!");
    navigate("/admin/websitecontent");
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/50 p-10">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => navigate("/admin/websitecontent")}
            className="flex items-center gap-2 text-emerald-600 font-medium text-sm hover:text-emerald-700 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm px-6 py-2.5 rounded-full shadow-sm transition"
          >
            Perbarui Ketentuan
          </button>
        </div>

        {/* Form Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Ketentuan Umum D'las Lembah Asri
        </h2>

        {/* Input Items Container */}
        <div className="space-y-4 max-w-4xl">
          {terms.map((termText, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={termText}
                onChange={(e) => handleTextChange(index, e.target.value)}
                placeholder="Masukkan ketentuan umum..."
                className="flex-1 bg-white border border-gray-200 rounded-full px-6 py-3 text-xs text-gray-700 focus:outline-none focus:border-emerald-500 shadow-sm"
              />
              <button
                type="button"
                onClick={() => handleDeleteTerm(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                title="Hapus Ketentuan"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}

          {/* Add Item Button */}
          <button
            type="button"
            onClick={handleAddTerm}
            className="mt-4 inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-800 font-medium text-xs px-5 py-2.5 rounded-full hover:bg-gray-50 shadow-sm transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Tambah Ketentuan
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}