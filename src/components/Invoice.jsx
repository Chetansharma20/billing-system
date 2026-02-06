import React from 'react';
import logo from '../assets/zelio.png';
import whatsappIcon from '../assets/whatsapp-icon.png';

// Hardcoded Shop Details
// Hardcoded Shop Details
const SHOP_DETAILS = {
    name: "VIGHNAHARTA MOTORS",
    address: "Vaijapur-Gangapur Road, Vaijapur - 423701",
    mobile: "+91 9730171267",
    gstin: "27GJVPM3300M1ZN",
    hsn: "87116010",
    pan: "GJVPM3300M",
    email: ""
};

const Invoice = React.forwardRef(({ data }, ref) => {
    const {
        customerName,
        mobileNumber,
        address,
        customerGst,
        customerPan,
        vehicleModel,
        chassisNo,
        motorNo,
        batteryNo,
        chargerNo,
        color,
        price,
        gstType = 'cgst_sgst',
        date,
        invoiceNumber
    } = data || {};

    const formattedDate = date ? new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }) : '';

    // GST Calculations
    // Price entered is the base price (before GST)
    const basePrice = parseFloat(price) || 0;

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (gstType === 'cgst_sgst') {
        cgst = basePrice * 0.025; // 2.5%
        sgst = basePrice * 0.025; // 2.5%
    } else {
        igst = basePrice * 0.05; // 5%
    }

    const totalGst = cgst + sgst + igst;
    const totalAmount = basePrice + totalGst;

    const numberToWords = (num) => {
        const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        const convert = (n) => {
            if (n === 0) return '';
            if (n < 20) return a[n];
            if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
            if (n < 1000) return a[Math.floor(n / 100)] + 'Hundred ' + (n % 100 !== 0 ? convert(n % 100) : '');
            if (n < 100000) return convert(Math.floor(n / 1000)) + 'Thousand ' + (n % 1000 !== 0 ? ' ' + convert(n % 1000) : '');
            if (n < 10000000) return convert(Math.floor(n / 100000)) + 'Lakh ' + (n % 100000 !== 0 ? ' ' + convert(n % 100000) : '');
            return convert(Math.floor(n / 10000000)) + 'Crore ' + (n % 10000000 !== 0 ? ' ' + convert(n % 10000000) : '');
        };

        const whole = Math.floor(num);
        const fraction = Math.round((num - whole) * 100);

        if (whole === 0 && fraction === 0) return 'Zero Rupees Only';

        let res = '';
        if (whole > 0) {
            res = convert(whole) + 'Rupees ';
        }
        if (fraction > 0) {
            res += (whole > 0 ? 'and ' : '') + convert(fraction) + 'Paise ';
        }
        return res + 'Only';
    };

    return (
        <div ref={ref} className="bg-amber-50 p-4 text-slate-900 font-sans box-border h-full flex flex-col justify-between">
            {/* Invoice Header */}
            <div>
                <div className="border-b-4 border-black pb-1 mb-2 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                        {/* Left: Logo */}
                        <div className="flex-shrink-0 relative -top-3">
                            <img src={logo} alt="Zelio Ebikes" className="h-28 w-auto object-contain drop-shadow-md " />
                        </div>

                        {/* Center: Shop Name & Address */}
                        <div className="flex-1 text-center">
                            <h1 className="text-3xl font-black font-serif uppercase leading-tight tracking-wide mb-1" style={{ color: '#C49A2F' }}>
                                {SHOP_DETAILS.name}
                            </h1>
                            <p className="text-[11px] text-slate-700 leading-tight max-w-md mx-auto">
                                {SHOP_DETAILS.address}
                            </p>
                            <p className="text-[10px] text-gray-700 mt-0.5">
                                {/* <span className="font-semibold">Mobile:</span> {SHOP_DETAILS.mobile} | */}
                                <span className="font-bold ml-3">GSTIN:</span> {SHOP_DETAILS.gstin} |
                                <span className="font-bold ml-3">PAN Number:</span> {SHOP_DETAILS.pan}
                            </p>
                        </div>

                        {/* Right: Invoice Details */}
                        <div className="flex-shrink-0 text-right">
                            {/* <h2 className="text-lg font-black text-gray-900 mb-1 leading-tight uppercase tracking-wide">TAX INVOICE</h2> */}
                            <div className="text-[11px] text-gray-700 space-y-0.5 font-medium">
                                <p><span className="font-bold">Date:</span> {formattedDate}</p>
                                <p><span className="font-bold">Invoice No:</span> {invoiceNumber || 'INV-0001'}</p>
                                <p><span className="font-semibold">Pro Annasaheb Moin</span> </p>
                                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', lineHeight: '1' }}>
                                    <img src={whatsappIcon} alt="WhatsApp" width="16" height="16" style={{ flexShrink: 0, display: 'block' }} />
                                    <span style={{ lineHeight: '1' }}>{SHOP_DETAILS.mobile}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Details */}
                <div className="mb-3 bg-white p-3 rounded-lg border-2 border-black shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 mb-2 border-b-2 border-black pb-1 uppercase">Details of Customer </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-medium"><span className="font-bold text-gray-900">Name:</span> {customerName}</p>
                            <p className="font-medium"><span className="font-bold text-gray-900">Mobile:</span> {mobileNumber}</p>
                            {customerGst && <p className="font-medium"><span className="font-bold text-gray-900">GSTIN:</span> <span className="uppercase">{customerGst}</span></p>}
                        </div>
                        <div>
                            <p className="font-medium"><span className="font-bold text-gray-900">Address:</span> {address}</p>
                            {customerPan && <p className="font-medium"><span className="font-bold text-gray-900">PAN:</span> <span className="uppercase">{customerPan}</span></p>}
                        </div>
                    </div>
                </div>

                {/* Product Details Table */}
                <div className="mb-3">
                    <table className="w-full border-collapse border-3 border-black text-sm shadow-md">
                        <thead>
                            <tr className="bg-slate-200 text-slate-900">
                                <th className="border-3 border-black p-2 text-center w-12 font-black">Sr.</th>
                                <th className="border-3 border-black p-2 font-black">Description of Goods</th>
                                <th className="border-3 border-black p-2 text-center w-24 font-black">HSN Code</th>
                                <th className="border-3 border-black p-2 text-center w-16 font-black">Qty</th>
                                <th className="border-3 border-black p-2 text-right w-32 font-black">Rate (₹)</th>
                                <th className="border-3 border-black p-2 text-right w-32 font-black">Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <tr>
                                <td className="border-2 border-black p-2 text-center align-top font-semibold">1</td>
                                <td className="border-2 border-black p-2 align-top">
                                    <p className="font-bold text-slate-900">{vehicleModel?.toUpperCase()} - {color?.charAt(0).toUpperCase() + color?.slice(1).toLowerCase()}</p>
                                    <p className="text-xs text-slate-600 mt-1 italic">Electric Scooter (Low-Speed) Two-Wheeler</p>

                                    {/* Vehicle Specific Details - Sequential */}
                                    <div className="mt-3 text-xs text-slate-800 space-y-1 font-medium">
                                        {chassisNo && <p><span className="font-bold">Chassis No:</span> {chassisNo}</p>}
                                        {motorNo && <p><span className="font-bold">Motor No:</span> {motorNo}</p>}
                                        {batteryNo && <p><span className="font-bold">Battery No:</span> {batteryNo}</p>}
                                        {chargerNo && <p><span className="font-bold">Charger No:</span> {chargerNo}</p>}
                                    </div>
                                </td>
                                <td className="border-2 border-black p-2 text-center align-top font-semibold">{SHOP_DETAILS.hsn}</td>
                                <td className="border-2 border-black p-2 text-center align-top font-semibold">1</td>
                                <td className="border-2 border-black p-2 text-right align-top font-semibold">{basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className="border-2 border-black p-2 text-right align-top font-semibold">{basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                            {/* Empty rows filler if needed, but not necessary here */}
                        </tbody>
                        <tfoot>
                            <tr className="bg-slate-100">
                                <td colSpan="5" className="border-2 border-black p-2 text-right font-bold">Taxable Amount (₹)</td>
                                <td className="border-2 border-black p-2 text-right font-bold">{basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                            {gstType === 'cgst_sgst' ? (
                                <>
                                    <tr className="bg-slate-100">
                                        <td colSpan="5" className="border-2 border-black p-2 text-right font-bold">CGST @ 2.5% (₹)</td>
                                        <td className="border-2 border-black p-2 text-right font-bold">{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    </tr>
                                    <tr className="bg-slate-100">
                                        <td colSpan="5" className="border-2 border-black p-2 text-right font-bold">SGST @ 2.5% (₹)</td>
                                        <td className="border-2 border-black p-2 text-right font-bold">{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    </tr>
                                </>
                            ) : (
                                <tr className="bg-slate-100">
                                    <td colSpan="5" className="border-2 border-black p-2 text-right font-bold">IGST @ 5% (₹)</td>
                                    <td className="border-2 border-black p-2 text-right font-bold">{igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                </tr>
                            )}
                            <tr className="bg-slate-200 text-slate-900">
                                <td colSpan="5" className="border-3 border-black p-3 text-right font-black text-base">Total Amount (₹)</td>
                                <td className="border-3 border-black p-3 text-right font-black text-base">{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                            <tr className="bg-white">
                                <td colSpan="6" className="border-3 border-black p-2 text-left">
                                    <span className="font-bold">Total Amount in Words: </span>
                                    <span className="italic uppercase text-xs">{numberToWords(totalAmount)}</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <p className="text-xs text-gray-600 mt-2 italic">* GST calculated as per selected type.</p>
                </div>
            </div>

            {/* Footer / Terms */}
            <div className="mt-4">
                <div className="border-t-4 border-black pt-3">
                    {/* Terms & Conditions */}
                    <div className="text-xs text-gray-700 mb-4">
                        <h4 className="font-black text-gray-900 mb-2 uppercase text-sm">Terms & Conditions:</h4>
                        <ol className="list-decimal list-inside space-y-1 font-medium">
                            <li>Goods once sold will not be taken back.</li>
                            <li>Motor and controller carry a warranty of 2 years.</li>
                            <li>Battery and charger carry a warranty of 1 year.</li>
                            <li>No warranty is provided for physical damage or breakage.</li>
                        </ol>
                    </div>

                    {/* Signatures */}
                    <div className="flex justify-between items-end mt-4">
                        {/* Left: Customer Signature */}
                        <div className="text-left">
                            <div className="h-16 mb-1 border-b-2 border-dashed border-slate-600 w-48"></div>
                            <p className="font-bold text-sm text-slate-900">Customer Signature</p>
                            <p className="text-xs text-gray-600 font-semibold">Date: {formattedDate}</p>
                        </div>

                        {/* Right: Authorized Signature */}
                        <div className="text-right">
                            <div className="h-16 mb-1 border-b-2 border-dashed border-black w-48"></div>
                            <p className="font-bold text-sm text-slate-900">Authorized Signatory</p>
                            <p className="text-xs text-gray-600 font-semibold">{SHOP_DETAILS.name}</p>
                            <p className="text-xs text-gray-600 font-semibold">(Pro Annasaheb Moin)</p>

                        </div>
                    </div>
                </div>
 
            </div>
        </div>
    );
});

// Memoize Invoice component to prevent unnecessary re-renders
export default React.memo(Invoice);
