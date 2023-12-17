
import express from 'express';

import { Transaction } from '../DB/model.js';

const transactionRouter = express.Router();

transactionRouter.post('/addtransaction', async (req, res) => {
  try {
    const { user_Id, Name, title, amount, optionId, date } = req.body;

    const newTransaction = new Transaction({
      user_Id,
      Name,
      title,
      amount,
      optionId,
      date: new Date(),
    });

    await newTransaction.save();

    res.status(201).send({ message: 'Transaction added successfully' });
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).send({ message: 'Error adding transaction' });
  }
});


transactionRouter.get('/user/:userId/history', async (req, res) => {
  try {
    const { userId } = req.params;

    const userTransactions = await Transaction.find({ user_Id: userId }).sort({ createdAt: -1 });

    res.status(200).send({ transactionHistory: userTransactions });
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).send({ message: 'Error fetching transaction history' });
  }
});


transactionRouter.delete('/delete/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

    if (!deletedTransaction) {
      return res.status(404).send({ message: 'Transaction not found' });
    }

    res.status(200).send({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).send({ message: 'Error deleting transaction' });
  }
});

export default transactionRouter;
