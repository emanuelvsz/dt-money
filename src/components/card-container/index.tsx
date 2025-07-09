import { ITransaction } from "@/types/transaction";
import { Card } from "../card";

interface CardContainerProps {
  transaction: ITransaction[];
}

export function CardContainer({ transaction }: CardContainerProps) {
  const income = transaction
    .filter((f) => f.price > 0)
    .reduce((sum, f) => sum + f.price, 0);

  const outcome = transaction
    .filter((f) => f.price < 0)
    .reduce((sum, f) => sum + f.price, 0);

  const total = income + outcome;

  return (
    <div className="flex justify-between">
      <Card title="Entrada" value={income} type="income" />
      <Card title="Saída" value={Math.abs(outcome)} type="outcome" />
      <Card title="Total" value={total} type="total" />
    </div>
  );
}
