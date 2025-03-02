import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [data, setData] = useState([
    { category: 'Food', amount: 200 },
    { category: 'Rent', amount: 800 },
    { category: 'Transport', amount: 150 },
    { category: 'Entertainment', amount: 100 },
  ]);

  const columns = useMemo(
    () => [
      { Header: 'Category', accessor: 'category' },
      {
        Header: 'Amount ($)',
        accessor: 'amount',
        Cell: ({ row, value }) => (
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const newData = [...data];
              newData[row.index].amount = parseFloat(e.target.value) || 0;
              setData(newData);
            }}
            style={{ width: '100px' }}
          />
        ),
      },
    ],
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.amount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>Personal Finance Dashboard</h1>
      <div className="dashboard-content">
        <div className="table-section">
          <h2>Expenses</h2>
          <table {...getTableProps()} className="expense-table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="chart-section">
          <h2>Expense Distribution</h2>
          <Pie data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;