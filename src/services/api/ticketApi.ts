import api from "./axios";

export interface CreateTicketPayload {
  namaTiket: string;
  hargaWeekdays: number;
  hargaWeekend: number;
  deskripsi: string;
  status: string;
  ketentuan: string[];
  gambar: string[];
}

export interface CreatePackageTicketPayload {
  namaTiket: string;
  hargaWeekdays: number;
  hargaWeekend: number;
  deskripsi: string;
  status: string;
  ketentuan: string[];
  gambar: string[];
  wahanaIds: string[];
}

export async function getTickets() {
  const response = await api.get("/tiket-wahana");
  return response.data;
}

export async function getPackageTickets() {
  const response = await api.get("/tiket/paket");
  return response.data;
}

export async function getTicketById(id: string) {
  const response = await api.get(`/tiket-wahana/${id}`);
  return response.data;
}

export async function createTicket(payload: CreateTicketPayload) {
  const response = await api.post("/tiket-wahana", payload);
  return response.data;
}

export async function createPackageTicket(payload: CreatePackageTicketPayload) {
  const formData = new FormData();

  formData.append("namaTiket", payload.namaTiket);
  formData.append("hargaWeekdays", String(payload.hargaWeekdays));
  formData.append("hargaWeekend", String(payload.hargaWeekend));
  formData.append("deskripsi", payload.deskripsi);
  formData.append("status", payload.status);

  payload.ketentuan.forEach((term) => {
    formData.append("ketentuan", term);
  });

  payload.gambar.forEach((image) => {
    formData.append("gambar", image);
  });

  payload.wahanaIds.forEach((id) => {
    formData.append("wahanaIds", id);
  });

  const response = await api.post("/tiket/paket", formData);
  return response.data;
}

export async function updateTicket(id: string, payload: CreateTicketPayload) {
  const response = await api.patch(`/tiket-wahana/${id}`, payload);
  return response.data;
}

export async function deleteTicket(id: string) {
  try {
    const response = await api.delete(`/tiket-wahana/${id}`);
    return response.data;
  } catch (error) {
    const response = await api.delete(`/tiket/${id}`);
    return response.data;
  }
}

export async function deletePackageTicket(id: string) {
  try {
    const response = await api.delete(`/tiket/paket/${id}`);
    return response.data;
  } catch (error) {
    const response = await api.delete(`/tiket-paket/${id}`);
    return response.data;
  }
}