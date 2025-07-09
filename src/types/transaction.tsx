export type TransactionType = "INCOME" | "OUTCOME"

export interface ITransaction {
    id?: string;
    title: string;
    price: number;
    category: string;
    data: Date;
    type: TransactionType;
}

export type ITotal = {
    totalIncome: number;
    totalOutcome: number;
    total: number;
}
