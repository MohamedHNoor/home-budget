import React from 'react';
import { createExpense, deleteItem, getAllMatchingItems } from '../helpers';
import { useLoaderData } from 'react-router-dom';
import { AddExpenseForm, BudgetItem, Table } from '../components';
import { toast } from 'react-toastify';

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: 'budgets',
    key: 'id',
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: 'expenses',
    key: 'budgetId',
    value: params.id,
  });

  if (!budget) {
    throw new Error('The budget you are trying to find does not exist.');
  }
  return { budget, expenses };
}

// action
// action
export async function BudgetPageAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === 'createExpense') {
    try {
      // create an expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (error) {
      throw new Error('There was a problem creating your expense.');
    }
  }

  if (_action === 'deleteExpense') {
    try {
      deleteItem({
        key: 'expenses',
        id: values.expenseId,
      });
      return toast.success('Expense deleted!');
    } catch (e) {
      throw new Error('There was a problem deleting your expense.');
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div className='grid-lg' style={{ '--accent': budget.color }}>
      <h2 className='h2'>
        <span className='accent'>{budget.name}</span> Overview
      </h2>
      <div className='flex-lg'>
        <BudgetItem budget={budget} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className='grid-md'>
          <h2>
            <span className='accent'>{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
