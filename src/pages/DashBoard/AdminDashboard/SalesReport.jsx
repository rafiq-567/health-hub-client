import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import autoTable separately
import dayjs from 'dayjs';
import axios from 'axios';

const SalesReport = () => {
    const [salesData, setSalesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dateRange, setDateRange] = useState({ from: '', to: '' });

    useEffect(() => {
        axios.get('https://server-mauve-seven.vercel.app/sales')
            .then(res => {
                setSalesData(res.data);
                setFilteredData(res.data);
            })
            .catch(err => console.error('Failed to fetch sales data', err));
    }, []);

    const handleFilter = () => {
        const { from, to } = dateRange;
        const filtered = salesData.filter(sale => {
            const saleDate = dayjs(sale.date);
            return (!from || saleDate.isAfter(dayjs(from).subtract(1, 'day'))) &&
                (!to || saleDate.isBefore(dayjs(to).add(1, 'day')));
        });
        setFilteredData(filtered);
    };

    const exportXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "SalesReport");
        XLSX.writeFile(workbook, "SalesReport.xlsx");
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(18);
        doc.text('Sales Report', 14, 16);
        
        // Prepare table data
        const headers = [["Medicine", "Seller Email", "Buyer Email", "Price", "Date"]];
        const data = filteredData.map(item => [
            item.medicineName,
            item.sellerEmail,
            item.buyerEmail,
            `$${item.totalPrice}`,
            dayjs(item.date).format('YYYY-MM-DD')
        ]);

        // Use autoTable plugin
        autoTable(doc, {
            head: headers,
            body: data,
            startY: 25,
            styles: {
                fontSize: 8,
                cellPadding: 2,
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold'
            }
        });

        doc.save("SalesReport.pdf");
    };

   

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Sales Report</h2>

            {/* Filter */}
            <div className="flex gap-4 mb-4 items-end">
                <div>
                    <label className="block">From:</label>
                    <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                        className="border px-2 py-1 rounded"
                    />
                </div>
                <div>
                    <label className="block">To:</label>
                    <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                        className="border px-2 py-1 rounded"
                    />
                </div>
                <button
                    onClick={handleFilter}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Filter
                </button>
            </div>

            {/* Export Options */}
            <div className="mb-4 flex gap-3">
                <CSVLink
                    data={filteredData}
                    filename={"SalesReport.csv"}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                    Export CSV
                </CSVLink>
                <button
                    onClick={exportXLSX}
                    className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                >
                    Export XLSX
                </button>
                <button
                    onClick={exportPDF}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                    Export PDF
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-300 text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-3 py-2">Medicine</th>
                            <th className="border px-3 py-2">Seller</th>
                            <th className="border px-3 py-2">Buyer</th>
                            <th className="border px-3 py-2">Price</th>
                            <th className="border px-3 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((sale, i) => (
                            <tr key={i}>
                                <td className="border px-3 py-2">{sale.medicineName}</td>
                                <td className="border px-3 py-2">{sale.sellerEmail}</td>
                                <td className="border px-3 py-2">{sale.buyerEmail}</td>
                                <td className="border px-3 py-2">${sale.totalPrice}</td>
                                <td className="border px-3 py-2">{dayjs(sale.date).format('YYYY-MM-DD')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesReport;
