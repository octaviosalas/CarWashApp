export type ExpensesType = {
    _id: string;
    date: Date;
    amount: number;
    user: string;
    reason: string;
    expenseType: string;
    observation: string;
    __v: number;
}