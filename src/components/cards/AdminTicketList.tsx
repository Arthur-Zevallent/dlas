import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TicketCard from "./TicketCard";
import Button from "../ui/Button";

import type { Ticket } from "../../types/ticket";

import {
  getTickets,
  getPackageTickets,
  deleteTicket,
  deletePackageTicket,
} from "../../services/api/ticketApi";

import { mapTicketApiToTicket } from "../../services/api/ticketAdapter";

type Category = "Paket Hemat" | "Regular/Satuan";

interface AdminTicketListProps {
  onEdit?: (ticket: Ticket) => void;
  onDelete?: (ticket: Ticket) => void;
}

export default function AdminTicketList({ onDelete }: AdminTicketListProps) {
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category>("Regular/Satuan");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [packageTickets, setPackageTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const regularResponse = await getTickets();
      const regularData = Array.isArray(regularResponse)
        ? regularResponse
        : (regularResponse?.data ?? []);
      const mappedRegular = regularData.map((item: any) => ({
        ...mapTicketApiToTicket(item),
        rawId: item._id || item.id || item.idTiket,
      }));
      setTickets(mappedRegular);

      const packageResponse = await getPackageTickets();
      const packageData = Array.isArray(packageResponse)
        ? packageResponse
        : (packageResponse?.data ?? []);
      const mappedPackage = packageData.map((item: any) => ({
        ...mapTicketApiToTicket(item),
        rawId: item._id || item.id || item.idTiket,
      }));
      setPackageTickets(mappedPackage);
    } catch (error) {
      console.error("Gagal mengambil data tiket:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDelete = async (ticket: any) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus tiket "${ticket.title || ticket.name}"?`
    );

    if (!isConfirmed) return;

    const targetId = ticket.rawId || ticket.id;

    try {
      if (category === "Paket Hemat") {
        await deletePackageTicket(targetId);
        setPackageTickets((prev) =>
          prev.filter((item: any) => (item.rawId || item.id) !== targetId)
        );
      } else {
        await deleteTicket(targetId);
        setTickets((prev) =>
          prev.filter((item: any) => (item.rawId || item.id) !== targetId)
        );
      }

      if (onDelete) {
        onDelete(ticket);
      }
    } catch (error) {
      console.error("Gagal menghapus tiket:", error);
      alert("Gagal menghapus tiket. Silakan coba lagi.");
    }
  };

  const data = category === "Paket Hemat" ? packageTickets : tickets;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-full border border-border bg-white p-1 shadow-sm">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCategory("Paket Hemat")}
            className={`h-11 ${
              category === "Paket Hemat"
                ? "border border-border bg-dark-gray font-semibold text-black"
                : "border border-white bg-white font-medium text-dark-gray hover:bg-gray-50"
            }`}
          >
            Tiket Paket Hemat
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCategory("Regular/Satuan")}
            className={`h-11 ${
              category === "Regular/Satuan"
                ? "border border-border bg-dark-gray font-semibold text-black"
                : "border border-white bg-white font-medium text-dark-gray hover:bg-gray-50"
            }`}
          >
            Tiket Regular/Satuan
          </Button>
        </div>

        <Button
          variant="primary"
          size="sm"
          className="h-11 font-semibold"
          onClick={() => navigate("/admin/ticket/add")}
        >
          Tambah Tiket
        </Button>
      </div>

      {loading && (
        <div className="py-10 text-center text-sm text-dark-gray">
          Memuat data tiket...
        </div>
      )}

      {!loading && data.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={(ticket) => navigate(`/admin/ticket/edit/${ticket.id}`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className="py-10 text-center text-sm text-dark-gray">
          Belum ada tiket pada kategori ini.
        </div>
      )}
    </div>
  );
}