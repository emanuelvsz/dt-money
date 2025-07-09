import { ITransaction } from "@/types/transaction";

import { toast } from "react-toastify";
import { api } from "../api";

export async function getTransactions({ page, limit }: { page: number; limit: number }) {
    try {
      const response = await api.get(`/transaction?page=${page}&limit=${limit}`);
      return response.data; 
    } catch (error) {
        throw new Error("Erro ao buscar transações: " + error);
    }
}

export async function deleteTransaction(id: string) {
  try {
    const response = await api.delete(`/transaction/${id}`);
    toast.success("Transação removida com sucesso!");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao deletar transação: " + error);
  }
}

export async function createTransaction(transaction: ITransaction) {
    try {
        const response = await api.post('/transaction', transaction);
        toast.success("Transação adicionada com sucesso!")
        return response.data;
    } catch (error) {
        throw new Error("Erro ao criar transação: " + error);
    }
}

export async function updateTransaction(id: string, transaction: Partial<ITransaction>) {
  try {
    const response = await api.patch(`/transaction/${id}`, transaction);
    toast.success("Transação atualizada com sucesso!");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar transação: " + error);
  }
}