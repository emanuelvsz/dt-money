import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "@/services/transactions";
import { ITransaction } from "@/types/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "qkTransaction";

const Create = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

const Delete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

const Update = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, transaction }: { id: string; transaction: Partial<ITransaction> }) =>
      updateTransaction(id, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

const ListAll = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: [QUERY_KEY, page, limit],
    queryFn: () => getTransactions({ page, limit }),
  });
};

export const useTransaction = {
  Create,
  ListAll,
  Delete,
  Update,
};
