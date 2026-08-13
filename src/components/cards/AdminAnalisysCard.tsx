import { useState, useRef, useEffect } from "react";
import { Banknote, Coins, Download, Globe, QrCode } from "lucide-react";
import * as XLSX from "xlsx";

import Button from "../ui/Button";
import DateFilter from "./DateFilter";
import StatCard from "../ui/StatCard";

import { formatter } from "../../utils/formatter";
import type { Transaction } from "../../types/transaction";

interface Props {
  data: Transaction[];
  period: string;
  setPeriod: (value: string) => void;
}

export default function AdminAnalisysCard({ data, period, setPeriod }: Props) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const periodOptions = [
    { label: "Hari Ini", value: "today" },
    { label: "Minggu Ini", value: "week" },
    { label: "Bulan Ini", value: "month" },
    { label: "1 Tahun", value: "year" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDownloadOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalRevenue = data.reduce((sum, item) => sum + item.total, 0);
  const totalCash = data.reduce((sum, item) => sum + item.cash, 0);
  const totalNonCash = data.reduce((sum, item) => sum + item.nonCash, 0);
  const totalOnline = data.reduce((sum, item) => sum + item.online, 0);

  const handleDownloadExcel = () => {
    setIsDownloadOpen(false);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Transaksi");

    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `Laporan_Dashboard_DLas_${dateStr}.xlsx`);
  };

  const handleDownloadPDF = () => {
    setIsDownloadOpen(false);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-2xl font-semibold">Dashboard Analisis</h6>
          <p className="mt-1.5 text-md font-normal text-dark-gray">
            Lihat perkembangan wisata D'Las Lembah Asri
          </p>
        </div>

        <div className="flex items-center gap-3 print:hidden">
          <DateFilter
            value={period}
            options={periodOptions}
            onChange={setPeriod}
          />

          <div className="relative inline-block text-left" ref={dropdownRef}>
            <Button
              variant="outline"
              size="sm"
              className="h-11 border-border font-semibold shadow-md hover:bg-gray-100"
              startIcon={<Download size={18} />}
              onClick={() => setIsDownloadOpen((prev) => !prev)}
            >
              Download
            </Button>

            {isDownloadOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-[999]">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition font-medium cursor-pointer"
                >
                  PDF
                </button>
                <button
                  type="button"
                  onClick={handleDownloadExcel}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition font-medium cursor-pointer"
                >
                  Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <StatCard
          icon={<Banknote size={24} color="#238302" />}
          title="Pendapatan Penjualan Tiket"
          value={formatter.rupiah(totalRevenue)}
        />

        <StatCard
          icon={<Coins size={24} color="#238302" />}
          title="Penjualan Tunai"
          value={formatter.rupiah(totalCash)}
        />

        <StatCard
          icon={<QrCode size={24} color="#238302" />}
          title="Penjualan Non-Tunai"
          value={formatter.rupiah(totalNonCash)}
        />

        <StatCard
          icon={<Globe size={24} color="#238302" />}
          title="Penjualan Online"
          value={formatter.rupiah(totalOnline)}
        />
      </div>
    </div>
  );
}