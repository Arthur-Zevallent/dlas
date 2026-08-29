import { useState, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/Admin/AdminLayout";

const initialTerms = [
  {
    id: "1",
    number: "01",
    text: "Anak tinggi badan <90cm tidak perlu membeli tiket, namun jika dalam masuk ke tempat wisata memiliki tinggi badan lebih dari itu, wajib membeli tiket di lokasi",
  },
  {
    id: "2",
    number: "02",
    text: "Batas waktu wisatawan masuk pada jam 16.00 dan jika datang lebih jam yang ditentukan, tidak dapat kami layani untuk masuk ke kawasan",
  },
  {
    id: "3",
    number: "03",
    text: "Meskipun jam 16.00 wisatawan terakhir boleh masuk, penutupan area sekitar jam 18.00",
  },
];

export default function AdminContent() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mapImage, setMapImage] = useState<string>(
    "https://placehold.co/600x700/e2e8f0/475569?text=Denah+D'las+Lembah+Asri"
  );

  const handleUpdateDenahClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMapImage(imageUrl);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/50 py-10 px-4 flex flex-col items-center">
        <div className="text-center max-w-xl mb-8">
          <h3 className="text-2xl font-bold text-gray-900">
            Berbagai Konten Website
          </h3>
          <p className="mt-1.5 text-sm text-gray-500">
            Kelola beberapa konten untuk website anda
          </p>
        </div>
        <div className="w-full max-w-2xl space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-6">
              Ketentuan Umum di D'las Lembah Asri
            </h3>

            <div className="space-y-5">
              {initialTerms.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <span className="flex items-center justify-center min-w-[36px] h-9 rounded-full bg-gray-100 text-gray-400 font-medium text-xs">
                    {item.number}
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed pt-1.5 font-normal">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/websitecontent/edit-terms")}
              className="w-full mt-8 py-3 px-4 rounded-full border border-gray-200 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition"
            >
              Edit Ketentuan
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-6">
              Denah D'las Lembah Asri
            </h3>

            <div className="flex justify-center p-2">
              <img
                src={mapImage}
                alt="Denah D'las Lembah Asri"
                className="max-w-full h-auto object-contain rounded-2xl max-h-[500px]"
              />
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg, image/png, image/jpg"
              className="hidden"
            />

            <button
              type="button"
              onClick={handleUpdateDenahClick}
              className="w-full mt-8 py-3 px-4 rounded-full border border-gray-200 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition"
            >
              Update Denah
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}