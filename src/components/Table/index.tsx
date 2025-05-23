import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Finance {
  title: string;
  price: number;
  category: string;
  date: string;
}

interface Props {
  finances: Finance[];
}

export function CustomTable({ finances }: Props) {
  return (
    <Table className="w-full border-collapse">
      <TableHeader>
        <TableRow className="text-[20px]">
          <TableHead className="px-[60px] text-[#969CB2]">Title</TableHead>
          <TableHead className="px-[60px] text-[#969CB2]">Price</TableHead>
          <TableHead className="px-[60px] text-[#969CB2]">Category</TableHead>
          <TableHead className="px-[60px] text-right text-[#969CB2]">
            Date
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {finances.map((finance) => {
          const priceColorClass =
            finance.price >= 0 ? "text-green-500" : "text-red-500";

          return (
            <TableRow
              key={finance.title}
              style={{ backgroundColor: "#fff", height: "80px" }}
            >
              <TableCell className="px-[60px] font-medium border-t-[10px] border-[#f0f2f5] text-[#969CB2]">
                {finance.title}
              </TableCell>
              <TableCell
                className={`px-[60px] border-t-[10px] border-[#f0f2f5] ${priceColorClass}`}
              >
                {finance.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell className="px-[60px] border-t-[10px] border-[#f0f2f5] text-[#969CB2]">
                {finance.category}
              </TableCell>
              <TableCell className="px-[60px] text-right border-t-[10px] border-[#f0f2f5] text-[#969CB2]">
                {finance.date}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
