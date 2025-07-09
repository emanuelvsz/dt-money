import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITransaction } from "@/types/transaction";

interface Props {
  transactions: ITransaction[];
  onRemove: (transaction: ITransaction) => void;
  onEdit?: (transaction: ITransaction) => void;
}

export function CustomTable({ transactions, onRemove, onEdit }: Props) {
  if (transactions.length === 0) {
    return <div>Você ainda não registrou nenhuma despesa</div>;
  }

  return (
    <Table className="w-full border-collapse">
      <TableHeader>
        <TableRow className="text-[20px]">
          <TableHead className="px-[60px] text-[#969CB2]">Title</TableHead>
          <TableHead className="px-[60px] text-[#969CB2]">Price</TableHead>
          <TableHead className="px-[60px] text-[#969CB2]">Category</TableHead>
          <TableHead className="px-[60px] text-right text-[#969CB2]">Date</TableHead>
          <TableHead className="w-32 text-center text-[#969CB2]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const priceColorClass =
            transaction.price >= 0 ? "text-green-500" : "text-red-500";

          return (
            <TableRow
              key={transaction.id || transaction.title}
              style={{ backgroundColor: "#fff", height: "80px" }}
            >
              <TableCell className="px-[60px] font-medium border-t-[10px] border-[#f0f2f5] text-[#969CB2]">
                {transaction.title}
              </TableCell>
              <TableCell
                className={`px-[60px] border-t-[10px] border-[#f0f2f5] ${priceColorClass}`}
              >
                {transaction.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell className="px-[60px] border-t-[10px] border-[#f0f2f5] text-[#969CB2]">
                {transaction.category}
              </TableCell>
              <TableCell className="px-[60px] text-right border-t-[10px] border-[#f0f2f5] text-[#969CB2]">
                {transaction.data?.toISOString().split("T")[0]}
              </TableCell>
              <TableCell className="w-32 border-t-[10px] border-[#f0f2f5] text-center space-x-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(transaction)}
                    className="text-blue-500 hover:text-blue-700 transition"
                    aria-label={`Edit ${transaction.title}`}
                    title="Editar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 inline"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5h6m-3 0v6m-3-1v-2m0 6v2m-4 0v-6m0 0H7"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => onRemove(transaction)}
                  className="text-red-500 hover:text-red-700 transition"
                  aria-label={`Remove ${transaction.title}`}
                  title="Excluir"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
