// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import React from 'react';
// import { Button } from '@/components/ui/button';

// const DownloadChat = ({ selectedUser }) => {
//     const downloadChatAsPDF = () => {
//         const doc = new jsPDF();
//         doc.setFont('helvetica');

//         // Chat header
//         doc.setFontSize(16);
//         doc.text(`Chat between ${loggedInUser.name} and ${selectedUser.name}`, 10, 10);
//         doc.setFontSize(12);
//         doc.text(`Downloaded on: ${new Date().toLocaleString()}`, 10, 20);

//         // Preparing data for the table
//         const tableData = messages.map((msg) => [
//             msg.sender !== loggedInUser.number ? msg.text : '', // Receiver's messages (left)
//             msg.timestamp, // Timestamp
//             msg.sender === loggedInUser.number ? msg.text : '', // Sender's messages (right)
//         ]);

//         // Creating table
//         doc.autoTable({
//             head: [['Receiver', 'Timestamp', 'Sender']],
//             body: tableData,
//             startY: 30,
//             styles: { cellPadding: 5, fontSize: 10, valign: 'middle', halign: 'center' },
//             columnStyles: {
//                 0: { halign: 'left' },  // Left-align receiver's messages
//                 1: { halign: 'center' }, // Center-align timestamp
//                 2: { halign: 'right' }  // Right-align sender's messages
//             },
//         });

//         // Save as PDF
//         doc.save(`Chat_${loggedInUser.name}_${selectedUser.name}.pdf`);
//     };

//     return <Button onClick={downloadChatAsPDF}>Download Chat</Button>;
// };

// export default DownloadChat;
