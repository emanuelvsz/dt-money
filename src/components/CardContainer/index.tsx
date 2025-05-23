import { Card } from "../Card";
import { Finance } from "../Table";

interface CardContainerProps {
  finances: Finance[];
}

export function CardContainer({ finances }: CardContainerProps) {
  const income = finances
    .filter((f) => f.price > 0)
    .reduce((sum, f) => sum + f.price, 0);

  const outcome = finances
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
