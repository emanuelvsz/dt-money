"use client";
import { useState } from "react";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { Header } from "@/components/Header";
import { CustomTable, Finance } from "@/components/Table";

const financesMock: Finance[] = [
  {
    title: "Desenvolvimento de site institucional",
    price: 1200.0,
    category: "Venda",
    date: "2025-05-20",
  },
  {
    title: "Aplicativo de delivery personalizado",
    price: 3800.0,
    category: "Venda",
    date: "2025-05-18",
  },
  {
    title: "Compra de licença Figma",
    price: -240.0,
    category: "Compra",
    date: "2025-05-16",
  },
  {
    title: "Consultoria de SEO para e-commerce",
    price: -650.0,
    category: "Compra",
    date: "2025-05-14",
  },
];

export default function Home() {
  const [finances, setFinances] = useState<Finance[]>(financesMock);
  const [open, setOpen] = useState(false);

  const handleAddFinance = (finance: Finance) => {
    setFinances((prev) => [finance, ...prev]);
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Header open={open} onOpenChange={setOpen} onAddFinance={handleAddFinance} />
      <BodyContainer>
        <CardContainer finances={finances} />
        <CustomTable finances={finances} />
      </BodyContainer>
    </div>
  );
}
