export type ExpensesType = {
    _id: string;
    date: Date;
    amount: number;
    user: string;
    reason: string;
    expenseType: { 
        _id: string,
        name: string
    }
    observation: string;
    __v: number;
}

export type TypeOfExpensesType = {
    _id: string;
    name: string;
    user: string;
    __v: number;
}

