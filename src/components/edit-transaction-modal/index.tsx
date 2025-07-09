import { ITransaction, TransactionType } from "@/types/transaction";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit: ITransaction | null;
  onUpdate: (updatedTransaction: ITransaction) => void;
}

export function EditTransactionModal({ isOpen, onClose, transactionToEdit, onUpdate }: EditTransactionModalProps) {
  const [title, setTitle] = useState(transactionToEdit?.title || "");
  const [price, setPrice] = useState(transactionToEdit?.price.toString() || "");
  const [category, setCategory] = useState(transactionToEdit?.category || "");
  const [type, setType] = useState<TransactionType>(transactionToEdit?.type || "INCOME");

  useEffect(() => {
    if (transactionToEdit) {
      setTitle(transactionToEdit.title);
      setPrice(transactionToEdit.price.toString());
      setCategory(transactionToEdit.category);
      setType(transactionToEdit.type);
    }
  }, [transactionToEdit]);

  const handleSave = () => {
    if (!title || !price || !category || !type) return;
    onUpdate({
      ...transactionToEdit!,
      title,
      price: parseFloat(price),
      category,
      type,
      data: new Date(),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
