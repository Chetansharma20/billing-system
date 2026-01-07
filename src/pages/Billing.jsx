import { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Save, Printer, LogOut, RefreshCw, Trash2, Download, MessageCircle, Copy } from 'lucide-react';

import { pdf } from '@react-pdf/renderer';
import html2pdf from 'html2pdf.js';
import Invoice from '../components/Invoice';
import InvoicePDF from '../components/InvoicePDF';
import logo from '../assets/zelio.png';
import whatsappIcon from '../assets/whatsapp-icon.png';

const INITIAL_STATE = {
    customerName: '',
    mobileNumber: '',
    address: '',
    customerGst: '',
    customerPan: '',
    vehicleModel: '',
    chassisNo: '',
    motorNo: '',
    batteryNo: '',
    chargerNo: '',
    color: '',
    price: '',
    gstType: 'cgst_sgst', // 'cgst_sgst' or 'igst'
    date: new Date().toISOString().split('T')[0],
    invoiceNumber: ''
};

const Billing = () => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();
    const componentRef = useRef();

    // Generate invoice number on component mount or when creating new invoice
    const generateInvoiceNumber = () => {
        const currentCounter = parseInt(localStorage.getItem('invoiceCounter') || '0', 10);
        const newCounter = currentCounter + 1;
        localStorage.setItem('invoiceCounter', newCounter.toString());
        return `INV-${newCounter.toString().padStart(4, '0')}`;
    };

    // Load from local storage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('billingFormData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate invoice number if not already set
        const dataToSave = {
            ...formData,
            invoiceNumber: formData.invoiceNumber || generateInvoiceNumber()
        };

        // Update form data with invoice number
        setFormData(dataToSave);

        // Save to localStorage
        localStorage.setItem('billingData', JSON.stringify(dataToSave));
    };

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('billingFormData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const clearForm = () => {
        if (window.confirm('Are you sure you want to clear the form?')) {
            setFormData(INITIAL_STATE);
        }
    };

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Invoice-${formData.customerName || 'New'}`,
    });

    const handleDownload = async () => {
        // Ensure invoice number is generated
        const dataToUse = {
            ...formData,
            invoiceNumber: formData.invoiceNumber || generateInvoiceNumber()
        };

        // Update state with invoice number
        if (!formData.invoiceNumber) {
            setFormData(dataToUse);
        }

        try {
            const blob = await pdf(
                <InvoicePDF
                    data={dataToUse}
                    logoBase64={logo}
                    whatsappBase64={whatsappIcon}
                />
            ).toBlob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Invoice-${dataToUse.invoiceNumber || dataToUse.customerName || 'New'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
    };

    const handleWhatsAppShare = async () => {
        // Ensure invoice number is generated
        const dataToUse = {
            ...formData,
            invoiceNumber: formData.invoiceNumber || generateInvoiceNumber()
        };

        if (!formData.invoiceNumber) {
            setFormData(dataToUse);
        }

        // Copy number to clipboard
        if (dataToUse.mobileNumber) {
            try {
                await navigator.clipboard.writeText(dataToUse.mobileNumber);
                // Could be replaced with a toast notification
                alert('Customer number copied to clipboard! Paste it in WhatsApp search.');
            } catch (err) {
                console.error('Failed to copy number:', err);
            }
        }

        try {
            // Generate PDF Blob
            const blob = await pdf(
                <InvoicePDF
                    data={dataToUse}
                    logoBase64={logo}
                    whatsappBase64={whatsappIcon}
                />
            ).toBlob();

            const file = new File([blob], `Invoice-${dataToUse.invoiceNumber || dataToUse.customerName || 'New'}.pdf`, { type: 'application/pdf' });

            // Check if native sharing is supported (Mobile)
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Invoice',
                    text: `Invoice for ${dataToUse.customerName}`,
                });
            } else {
                // Fallback for Desktop: Download & Open WhatsApp Web
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Invoice-${dataToUse.invoiceNumber || dataToUse.customerName || 'New'}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                const waUrl = `https://wa.me/${dataToUse.mobileNumber ? '91' + dataToUse.mobileNumber : ''}?text=Please find the attached invoice.`;
                window.open(waUrl, '_blank');
                alert('PDF downloaded. Please attach it to the WhatsApp chat opened in the new tab.');
            }
        } catch (error) {
            console.error('Error sharing:', error);
            if (error.name !== 'AbortError') {
                alert('Error sharing invoice. Please try downloading instead.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <nav className="bg-white shadow-sm mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <h1 className="text-xl font-bold text-gray-800">EV Billing System</h1>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
                        >
                            <LogOut className="h-5 w-5 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                                <Save className="h-5 w-5 mr-2 text-blue-600" />
                                Billing Details
                            </h2>
                            <button
                                onClick={clearForm}
                                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                title="Clear Form"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                                    <input
                                        type="text"
                                        name="customerName"
                                        value={formData.customerName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter customer name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter complete address"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer GST (Optional)</label>
                                    <input
                                        type="text"
                                        name="customerGst"
                                        value={formData.customerGst}
                                        onChange={handleChange}
                                        placeholder="e.g., 27ABCDE1234F1Z5"
                                        className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer PAN (Optional)</label>
                                    <input
                                        type="text"
                                        name="customerPan"
                                        value={formData.customerPan}
                                        onChange={handleChange}
                                        placeholder="e.g., ABCDE1234F"
                                        className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Vehicle Details</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model *</label>
                                        <input
                                            type="text"
                                            name="vehicleModel"
                                            value={formData.vehicleModel}
                                            onChange={handleChange}
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., Hero Electric Flash"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Color *</label>
                                        <input
                                            type="text"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleChange}
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., Red"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Chassis No. *</label>
                                        <input
                                            type="text"
                                            name="chassisNo"
                                            value={formData.chassisNo}
                                            onChange={handleChange}
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter chassis number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Motor No. *</label>
                                        <input
                                            type="text"
                                            name="motorNo"
                                            value={formData.motorNo}
                                            onChange={handleChange}
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter motor number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Battery No. *</label>
                                        <input
                                            type="text"
                                            name="batteryNo"
                                            value={formData.batteryNo}
                                            onChange={handleChange}
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter battery number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Charger No. *</label>
                                        <input
                                            type="text"
                                            name="chargerNo"
                                            value={formData.chargerNo}
                                            onChange={handleChange}
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter charger number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter base price"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">GST Type *</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center space-x-3 cursor-pointer p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="gstType"
                                            value="cgst_sgst"
                                            checked={formData.gstType === 'cgst_sgst'}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            CGST (2.5%) + SGST (2.5%) = 5%
                                        </span>
                                    </label>
                                    <label className="flex items-center space-x-3 cursor-pointer p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="gstType"
                                            value="igst"
                                            checked={formData.gstType === 'igst'}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            IGST (5%)
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Mobile Action Buttons */}
                            <div className="lg:hidden pt-4 space-y-3">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        handleSubmit(e);
                                        setTimeout(handleDownload, 100);
                                    }}
                                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center shadow-sm text-base font-medium"
                                >
                                    <Download className="h-5 w-5 mr-2" />
                                    Download Bill
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        handleSubmit(e);
                                        setTimeout(handlePrint, 100);
                                    }}
                                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center shadow-sm text-base font-medium"
                                >
                                    <Printer className="h-5 w-5 mr-2" />
                                    Print Bill
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        handleSubmit(e);
                                        setTimeout(handleWhatsAppShare, 100);
                                    }}
                                    className="w-full bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center shadow-sm text-base font-medium"
                                >
                                    <MessageCircle className="h-5 w-5 mr-2" />
                                    Share on WhatsApp
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Preview Section - Shows below form on mobile, side-by-side on desktop */}
                    <div className="flex flex-col lg:flex-none lg:block mt-8 lg:mt-0">
                        <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 flex-grow flex flex-col">
                            <div className="flex justify-between items-center mb-4 lg:mb-6">
                                <h2 className="text-lg lg:text-xl font-semibold text-gray-800 flex items-center">
                                    <Printer className="h-5 w-5 mr-2 text-green-600" />
                                    Bill Preview
                                </h2>
                                {/* Desktop Action Buttons */}
                                <div className="hidden lg:flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            handleSubmit(e);
                                            setTimeout(handleDownload, 100);
                                        }}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-sm"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            handleSubmit(e);
                                            setTimeout(handlePrint, 100);
                                        }}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center shadow-sm"
                                    >
                                        <Printer className="h-4 w-4 mr-2" />
                                        Print
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            handleSubmit(e);
                                            setTimeout(handleWhatsAppShare, 100);
                                        }}
                                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center shadow-sm"
                                        title="Share on WhatsApp"
                                    >
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        Share
                                    </button>
                                </div>
                            </div>

                            <div className="border rounded-lg bg-gray-50 p-2 lg:p-4 flex-grow overflow-auto max-h-[500px] lg:max-h-[800px]">
                                {/* Invoice Component Ref - Scaled smaller on mobile */}
                                <div className="bg-white shadow-sm mx-auto transform scale-50 origin-top lg:scale-75" style={{ width: '210mm', minHeight: '297mm' }}>
                                    <Invoice ref={componentRef} data={formData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Billing;
