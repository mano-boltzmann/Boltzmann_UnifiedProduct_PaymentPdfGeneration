import { useState } from 'react';
import html2pdf from 'html2pdf.js';
const App = () => {
  const [transactions] = useState([
    {
      id: 'T12354Y3289572485792',
      product: 'Free Plan',
      price: 0,
      currencySymbol: '₹',
      currency: 'INR',
      date: '13-04-2025',
      userName: 'Test User'
    },
    {
      id: 'T12354Y3289572485793',
      product: 'Premium Plan',
      price: 1800,
      currencySymbol: '₹',
      currency: 'INR',
      date: '13-05-2025',
      userName: 'Test User'
    },
    {
      id: 'T12342453254545454545',
      product: 'Premium Plan',
      price: 50,
      currencySymbol: '$',
      currency: 'USD',
      date: '13-05-2025',
      userName: 'Test User'
    }
  ]);
    const handleDownload = (transactionId) => {
    const transaction = transactions.find(t => t.id === transactionId);
    const name = document.getElementById("name").value;
    const userId = document.getElementById("userid").value;
    const gstNo = document.getElementById("gst").value;
    const { product, price, currency, currencySymbol, date, id } = transaction;
    const isINR = currency === "INR";
    const gstAmount = isINR ? price * 0.18 : 0;
    const totalPrice = price + gstAmount;
    const BASE64_WATERMARK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...'; 
    const invoiceHTML = `
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Inria+Serif&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <style>
            body {
              font-family: "Inria Serif", serif;
              background-color: #fff;
            }
            .invoice-container {
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              position: relative;
              background-image: url('/one.png');
              background-size: 400px 400px;
              background-repeat: no-repeat;
              background-position: center;
              overflow: hidden;
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 500px;
              height: 500px;
              opacity: 0.3;
              z-index: -1;
              pointer-events: none;
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }
            .logo {
              width: 259px;
              height: 83px;
            }
            .header-text {
              text-align: right;
              font-size: 12px;
            }
            .title {
              text-align: center;
              margin: 20px 0;
            }
            .bill {
              font-size: 16px;
            }
            .invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
              font-size: 16px;
            }
            .invoice-table th, .invoice-table td {
              border: 1px solid #ccc;
              padding: 10px;
              text-align: center;
              background-color: #F0EFF8;
            }
            .invoice-table th {
              background-color: #E6E0FF;
            }
            .final-breakdown {
              border-top: 3px solid #E6E0FF;
              padding-top: 10px;
            }
            .final-breakdown h3 {
              background-color: #E6E0FF;
              padding: 5px 10px;
              margin-bottom: 10px;
            }
            .row {
              display: flex;
              justify-content: space-between;
              padding: 5px 10px;
              margin-bottom: 13px;
            }
            .row.total {
              background-color: #E6E0FF;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .note {
              text-align: center;
              font-size: 12px;
              margin-top: 30px;
            }
            .thanks {
              text-align: center;
              margin-top: 20px;
            }
            .material-icons {
              font-size: 13px;
              vertical-align: middle;
              margin-left: 2px;
            }
            hr {
              color: #AB31D6;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <img src="${BASE64_WATERMARK}" class="watermark" alt="Watermark" />
            <header class="invoice-header">
              <img src="/boltzmann_logo.png" alt="Boltzmann Logo" class="logo" />
              <div class="header-text">
                <p><strong><a href="https://boltzmann.co/">www.boltzmann.co</a><span class="material-icons">language</span></strong></p>
                <p>contact@boltzmann.co<span class="material-icons">mail</span></p>
                <p>B Block, Asian Sun City, 309, Forest Dept Colony,<span class="material-icons">location_on</span><br/>Kondapur, Hyderabad, Telangana 500084</p>
              </div>
            </header>
            <hr />
            <h1 class="title">Subscription Invoice</h1>
            <div class="info">
              <p class="bill"><strong>Billed To:</strong> ${name}</p>
              <p class="bill"><strong>User ID:</strong> ${userId}</p>
              ${isINR ? `<p class="bill"><strong>GST No:</strong> ${gstNo}</p>` : ""}
            </div>
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Transaction Id</th>
                  <th>Price</th>
                  <th>Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${product}</td>
                  <td>${id}</td>
                  <td>${currencySymbol} ${price}</td>
                  <td>${date}</td>
                </tr>
              </tbody>
            </table>
            <div class="final-breakdown">
              <h3>Final Breakdown</h3>
              <div class="row">
                <span>Price</span>
                <span>${currencySymbol} ${price}</span>
              </div>
              ${isINR ? `<div class="row"><span>GST (18%)</span><span>${currencySymbol} ${gstAmount}</span></div>` : ""}
              <div class="row total">
                <span>Total Price</span>
                <span>${currencySymbol} ${totalPrice}</span>
              </div>
            </div>
            <p class="note">*This is a Computer Generated Receipt. No Signature Required.</p>
            <hr />
            <h3 class="thanks">Thank You</h3>
          </div>
        </body>
      </html>
    `;
    const opt = {
      margin: 1,
      filename: `Transaction_${id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(invoiceHTML).set(opt).save();
  };
  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value="Test User" readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="userid">User ID</label>
        <input type="text" id="userid" value="aWQWEWEGFRWGFQEWRDWGFREG" readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="gst">GST</label>
        <input type="text" id="gst" value="Q123E4RTFGFSDEF234F" readOnly />
      </div>
        <div className="transaction-section">
          <h3>Transaction History</h3>
          <div className="transaction-header">
            <div className="transaction-column">Description</div>
            <div className="transaction-column">Transaction Id</div>
            <div className="transaction-column">Price</div>
            <div className="transaction-column">Purchase Date</div>
            <div className="transaction-column">Action</div>
          </div>
          {transactions.map(transaction => (
            <div key={transaction.id} className="transaction-row">
              <div className="transaction-column">{transaction.product}</div>
              <div className="transaction-column">{transaction.id}</div>
              <div className="transaction-column">{transaction.currencySymbol}{transaction.price}</div>
              <div className="transaction-column">{transaction.date}</div>
              <div className="transaction-column">
                <button className="download-button" onClick={() => handleDownload(transaction.id)}>
                  <img width="20" height="20" src="/download.png" alt="download" />
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};
export default App;