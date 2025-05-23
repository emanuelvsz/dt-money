// Header.tsx
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Finance } from "@/components/Table";

interface HeaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFinance: (finance: Finance) => void;
}

export function Header({ open, onOpenChange, onAddFinance }: HeaderProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSave = () => {
    if (!title || !price || !category) {
      return;
    }
    const newFinance: Finance = {
      title,
      price: parseFloat(price),
      category,
      date: new Date().toISOString().split("T")[0],
    };
    onAddFinance(newFinance);
    onOpenChange(false);
    setTitle("");
    setPrice("");
    setCategory("");
  };

  return (
    <header className="bg-header w-full h-[212px]">
      <div className="max-w-[1120px] mx-auto flex row justify-between pt-8">
        <Image src="/logo.png" width={172} height={40} alt="Logo Image" />
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-button text-white px-8 py-3 rounded-md hover:opacity-80">
              Nova transação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova transação</DialogTitle>
              <DialogDescription>Adicione uma nova transação financeira</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Preço
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoria
                </Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
