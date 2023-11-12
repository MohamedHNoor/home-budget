import React from 'react';
import { fetchData } from '../helpers';
import { useLoaderData } from 'react-router-dom';
import { Table } from '../components';

// loader
export function expensesLoader() {
  const expenses = fetchData('expenses');
  return { expenses };
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className='grid-lg'>
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className='grid-md'>
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
