import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface RetornoAll {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): RetornoAll {
    const retorno = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return retorno;
  }

  public getBalance(): Balance {
    //    const balance: Balance = { income: 0, outcome: 0, total: 0 };
    const balance = this.transactions.reduce(
      function (acc, transaction) {
        acc[transaction.type] += transaction.value;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    balance.total = balance.income - balance.outcome;
    // this.transactions.push(balance);

    return balance;
  }

  public create(dados: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction(dados);
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
