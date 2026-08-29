import { transactionTableData } from "../../services/data/transactionTableData";

import PosLayout from "../../components/layout/Pos/PosLayout";
import AdminTransactionSummaryCard from "../../components/cards/AdminTransactionSummaryCard";
import AdminTransactionTable from "../../components/tables/AdminTransactionTable";

export default function PosTransactionList() {
  return (
    <PosLayout>
      <div className="grid gap-7">
        <AdminTransactionSummaryCard data={transactionTableData} />
        <AdminTransactionTable data={transactionTableData} />
      </div>
    </PosLayout>
  );
}