"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { BodyContainer } from "@/components/body-container";
import { CardContainer } from "@/components/card-container";
import { Header } from "@/components/header";
import { CustomTable } from "@/components/table";
import { useTransaction } from "@/hooks/transactions";
import { ITransaction, TransactionType } from "@/types/transaction";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [headerOpen, setHeaderOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<ITransaction | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: paginatedData,
    isLoading,
    refetch,
  } = useTransaction.ListAll(currentPage, itemsPerPage);

  const finances: ITransaction[] = (paginatedData?.data || []).map((t: ITransaction) => ({
    ...t,
    data: new Date(t.data),
  }));

  const totalPages = paginatedData?.lastPage || 1;

  const createMutation = useTransaction.Create();
  const updateMutation = useTransaction.Update();
  const deleteMutation = useTransaction.Delete();

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleAddTransaction = (transaction: ITransaction) => {
    createMutation.mutate(transaction, {
      onSuccess: () => {
        setHeaderOpen(false);
        refetch();
      },
      onError: () => toast.error("Erro ao adicionar transação."),
    });
  };

  const handleOpenEditModal = (transaction: ITransaction) => {
    setTransactionToEdit(transaction);
    setEditModalOpen(true);
  };

  const handleUpdateTransaction = (updatedTransaction: ITransaction) => {
    updateMutation.mutate(
      { id: updatedTransaction.id!, transaction: updatedTransaction },
      {
        onSuccess: () => {
          setEditModalOpen(false);
          setTransactionToEdit(null);
          refetch();
        },
        onError: () => toast.error("Erro ao atualizar transação."),
      }
    );
  };

  const handleOpenDeleteModal = (transaction: ITransaction) => {
    setTransactionToDelete(transaction);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!transactionToDelete?.id) return;
    deleteMutation.mutate(transactionToDelete.id, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        setTransactionToDelete(null);
        refetch();
      },
      onError: () => toast.error("Erro ao remover transação."),
    });
  };

  function EditTransactionModal() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState<TransactionType>("INCOME");

    useEffect(() => {
      if (transactionToEdit) {
        setTitle(transactionToEdit.title);
        setPrice(transactionToEdit.price.toString());
        setCategory(transactionToEdit.category);
        setType(transactionToEdit.type);
      }
    }, [transactionToEdit]);

    const handleSave = () => {
      if (!title || !price || !category) return;
      const updatedTransaction: ITransaction = {
        ...(transactionToEdit as ITransaction),
        title,
        price: parseFloat(price),
        category,
        type,
        data: new Date(),
      };
      handleUpdateTransaction(updatedTransaction);
    };

    return (
      <Dialog open={editModalOpen} onOpenChange={() => setEditModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Preço</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Categoria</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  function ConfirmDeleteModal() {
    return (
      <Dialog open={deleteModalOpen} onOpenChange={() => setDeleteModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Tem certeza que deseja excluir a transação{" "}
            <strong>{transactionToDelete?.title}</strong>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
            <Button className="ml-2" onClick={handleConfirmDelete}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Header
        open={headerOpen}
        onOpenChange={setHeaderOpen}
        onAddTransaction={handleAddTransaction}
      />
      <BodyContainer>
        <CardContainer transaction={finances} />
        {isLoading ? (
          <p className="text-center py-10 text-gray-500">Carregando transações...</p>
        ) : (
          <>
            <CustomTable
              transactions={finances}
              onRemove={handleOpenDeleteModal}
              onEdit={handleOpenEditModal}
            />

            <div className="flex justify-center items-center gap-4 mt-4">
              <Button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                variant="outline"
              >
                Anterior
              </Button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                variant="outline"
              >
                Próximo
              </Button>
            </div>
          </>
        )}
      </BodyContainer>

      {editModalOpen && <EditTransactionModal />}
      {deleteModalOpen && <ConfirmDeleteModal />}
    </div>
  );
}
