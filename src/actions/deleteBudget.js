import React from 'react';
import { deleteItem, getAllMatchingItems } from '../helpers';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

const deleteBudget = ({ params }) => {
  try {
    deleteItem({
      key: 'budgets',
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: 'expenses',
      key: 'budgetId',
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: 'expenses',
        id: expense.id,
      });
    });
    toast.success('Budget deleted successfully!');
  } catch (error) {
    throw new Error('There was a problem deleting your budget');
  }

  return redirect('/');
};

export default deleteBudget;
