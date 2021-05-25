import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(dados: Omit<Transaction, 'id'>): Transaction {
    if (dados.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total < dados.value) {
        throw Error('Not enough founds.');
      }
    }
    const repository = this.transactionsRepository.create(dados);
    return repository;
  }
}

export default CreateTransactionService;
