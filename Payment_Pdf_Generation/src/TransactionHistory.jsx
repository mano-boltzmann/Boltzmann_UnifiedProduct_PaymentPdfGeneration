import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function TransactionHistory({ transactions, onClose }) {
  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin:       0.5,
      filename:     'transaction-history.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="transaction-section">
      <h3>Transaction History</h3>

      <div ref={pdfRef}>
        <div className="transaction-header">
          <div className="transaction-column">Description</div>
          <div className="transaction-column">Transaction Id</div>
          <div className="transaction-column">Price</div>
          <div className="transaction-column">Purchase Date</div>
          <div className="transaction-column">Action</div>
        </div>

        {transactions.length === 0 ? (
          <p>No transactions available</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-row">
              <div className="transaction-column">{transaction.product}</div>
              <div className="transaction-column">{transaction.id}</div>
              <div className="transaction-column">
                {transaction.currencySymbol}{transaction.price}
              </div>
              <div className="transaction-column">{transaction.date}</div>
              <div className="transaction-column">—</div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button className="proceed" onClick={handleDownloadPDF}>Download PDF</button>
        <button className="proceed" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
