import { useState } from "react";
import PosLayout from "../../components/layout/Pos/PosLayout";
import PosSopSection from "../../components/cards/PosSopSection";
import PosSidebarStep from "../../components/cards/PosSidebarStep";
import VisitDatePicker from "../../components/ui/VisitDatePicker";
import TicketPackageCard from "../../components/cards/TicketPackageCard";
import TicketRegularCard from "../../components/cards/TicketRegularCard";
import TicketDetailModal from "../../components/modal/TicketDetailModal";
import TicketOrderModal from "../../components/modal/TicketOrderModal";
import TicketPaymentSuccessModal from "../../components/modal/TicketPaymentSuccessModal";
import { TICKET_PACKAGES } from "../../services/data/posTicketData";
import { REGULAR_TICKETS } from "../../services/data/posRegularTicketData";

export default function PosMain() {
  const [isSopCompleted, setIsSopCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<"paket" | "regular">("paket");
  const [visitDate, setVisitDate] = useState<Date | undefined>(new Date());

  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    data?: any;
  }>({
    isOpen: false,
  });

  const [orderModal, setOrderModal] = useState<{
    isOpen: boolean;
    data?: any;
  }>({
    isOpen: false,
  });

  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    data?: any;
  }>({
    isOpen: false,
  });

  const handleOpenOrder = (ticket: any) => {
    setOrderModal({
      isOpen: true,
      data: {
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        description: ticket.description,
        attractions: ticket.attractions,
        image: ticket.image,
      },
    });
  };

  return (
    <PosLayout>
      {!isSopCompleted ? (
        <PosSopSection onComplete={() => setIsSopCompleted(true)} />
      ) : (
        <div className="space-y-4 pb-12">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Sistem Layanan Tiket
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Mulai layani pengunjung anda dengan ketentuan yang ada
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 items-start pt-2">
            <div className="col-span-3 sticky top-30">
              <PosSidebarStep />
            </div>

            <div className="col-span-9 space-y-4">
              <VisitDatePicker
                selectedDate={visitDate}
                onDateChange={setVisitDate}
                onSearch={() => console.log("Cari tanggal:", visitDate)}
              />

              <div className="bg-[#F8F9FA] p-1.5 rounded-full border border-gray-100 flex items-center">
                <button
                  type="button"
                  onClick={() => setActiveTab("paket")}
                  className={`flex-1 py-2.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                    activeTab === "paket"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Tiket Paket Hemat
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("regular")}
                  className={`flex-1 py-2.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                    activeTab === "regular"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Tiket Regular
                </button>
              </div>

              {activeTab === "paket" ? (
                <div className="grid grid-cols-3 gap-5 pt-1">
                  {TICKET_PACKAGES.map((pkg) => (
                    <TicketPackageCard
                      key={pkg.id}
                      pkg={pkg}
                      onSelect={(item) => handleOpenOrder(item)}
                      onDetail={(item) =>
                        setDetailModal({
                          isOpen: true,
                          data: item,
                        })
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 pt-1">
                  {REGULAR_TICKETS.map((ticket) => (
                    <TicketRegularCard
                      key={ticket.id}
                      ticket={ticket}
                      onSelect={(item) => handleOpenOrder(item)}
                      onDetail={(item) =>
                        setDetailModal({
                          isOpen: true,
                          data: item,
                        })
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <TicketDetailModal
        isOpen={detailModal.isOpen}
        ticketData={detailModal.data}
        onClose={() => setDetailModal({ isOpen: false })}
        onContinueToOrder={() => {
          const selectedData = detailModal.data;
          setDetailModal({ isOpen: false });
          if (selectedData) handleOpenOrder(selectedData);
        }}
      />

      <TicketOrderModal
        isOpen={orderModal.isOpen}
        ticketData={orderModal.data}
        visitDate={visitDate}
        onClose={() => setOrderModal({ isOpen: false })}
        onSuccessPay={(summary) => {
          setSuccessModal({
            isOpen: true,
            data: summary,
          });
        }}
      />

      <TicketPaymentSuccessModal
        isOpen={successModal.isOpen}
        orderData={successModal.data}
        onClose={() => setSuccessModal({ isOpen: false })}
      />
    </PosLayout>
  );
}