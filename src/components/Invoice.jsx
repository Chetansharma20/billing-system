import React from 'react';
import logo from '../assets/zelio.png';

// Hardcoded Shop Details
const SHOP_DETAILS = {
    name: "VIGHNAHARTA MOTORS",
    address: "Vaijapur-Gangapur Road, Vaijapur - 423701 ",
    mobile: "+91 9730171267",
    // email: "contact@greenride.com",
    gstin: "27GJVPM3300M1ZN", // Hardcoded GST
    hsn: "87116010", // Hardcoded HSN for electric motorcycles,
    pan: "GJVPM3300M",
    email: "annasahebmoin8605@gmail.com"
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
        <div ref={ref} className="bg-amber-50 p-8 text-black font-sans box-border h-full flex flex-col justify-between">
            {/* Invoice Header */}
            <div>
                <div className="border-b-4 border-gray-800 pb-2 mb-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                        {/* Left: Logo */}
                        <div className="flex-shrink-0 relative -top-3">
                            <img src={logo} alt="Zelio Ebikes" className="h-28 w-auto object-contain drop-shadow-md " />
                        </div>

                        {/* Center: Shop Name & Address */}
                        <div className="flex-1 text-center">
                            <h1 className="text-3xl font-black text-black uppercase leading-tight tracking-wide mb-1" style={{
                                background: 'linear-gradient(135deg, #000000 0%, #D4AF37 50%, #000000 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                {SHOP_DETAILS.name}
                            </h1>
                            <p className="text-[11px] text-gray-700 leading-tight max-w-md mx-auto">
                                Vaijapur-Gangapur Road, <b>Vaijapur</b> - 423701
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
                                <p className="flex items-center justify-end gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#25D366" className="inline-block">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    {SHOP_DETAILS.mobile}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Details */}
                <div className="mb-6 bg-white p-4 rounded-lg border-2 border-gray-300 shadow-sm">
                    <h3 className="text-base font-bold text-gray-900 mb-2 border-b-2 border-gray-800 pb-1 uppercase">Details of Customer </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-medium"><span className="font-bold text-gray-900">Name:</span> {customerName}</p>
                            <p className="font-medium"><span className="font-bold text-gray-900">Mobile:</span> {mobileNumber}</p>
                            {customerGst && <p className="font-medium"><span className="font-bold text-gray-900">GSTIN:</span> {customerGst}</p>}
                        </div>
                        <div>
                            <p className="font-medium"><span className="font-bold text-gray-900">Address:</span> {address}</p>
                            {customerPan && <p className="font-medium"><span className="font-bold text-gray-900">PAN:</span> {customerPan}</p>}
                        </div>
                    </div>
                </div>

                {/* Product Details Table */}
                <div className="mb-6">
                    <table className="w-full border-collapse border-3 border-gray-800 text-sm shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-black">
                                <th className="border-3 border-gray-800 p-2 text-center w-12 font-black">Sr.</th>
                                <th className="border-3 border-gray-800 p-2 font-black">Description of Goods</th>
                                <th className="border-3 border-gray-800 p-2 text-center w-24 font-black">HSN Code</th>
                                <th className="border-3 border-gray-800 p-2 text-center w-16 font-black">Qty</th>
                                <th className="border-3 border-gray-800 p-2 text-right w-32 font-black">Rate (₹)</th>
                                <th className="border-3 border-gray-800 p-2 text-right w-32 font-black">Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <tr>
                                <td className="border-2 border-gray-600 p-2 text-center align-top font-semibold">1</td>
                                <td className="border-2 border-gray-600 p-2 align-top">
                                    <p className="font-bold text-gray-900">{vehicleModel?.toUpperCase()} - {color?.charAt(0).toUpperCase() + color?.slice(1).toLowerCase()}</p>
                                    <p className="text-xs text-gray-600 mt-1 italic">Electric Two Wheeler</p>

                                    {/* Vehicle Specific Details - Sequential */}
                                    <div className="mt-3 text-xs text-gray-800 space-y-1 font-medium">
                                        {chassisNo && <p><span className="font-bold">Chassis No:</span> {chassisNo}</p>}
                                        {motorNo && <p><span className="font-bold">Motor No:</span> {motorNo}</p>}
                                        {batteryNo && <p><span className="font-bold">Battery No:</span> {batteryNo}</p>}
                                        {chargerNo && <p><span className="font-bold">Charger No:</span> {chargerNo}</p>}
                                    </div>
                                </td>
                                <td className="border-2 border-gray-600 p-2 text-center align-top font-semibold">{SHOP_DETAILS.hsn}</td>
                                <td className="border-2 border-gray-600 p-2 text-center align-top font-semibold">1</td>
                                <td className="border-2 border-gray-600 p-2 text-right align-top font-semibold">{basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className="border-2 border-gray-600 p-2 text-right align-top font-semibold">{basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                            {/* Empty rows filler if needed, but not necessary here */}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100">
                                <td colSpan="5" className="border-2 border-gray-600 p-2 text-right font-bold">Taxable Amount (₹)</td>
                                <td className="border-2 border-gray-600 p-2 text-right font-bold">{basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                            {gstType === 'cgst_sgst' ? (
                                <>
                                    <tr className="bg-gray-100">
                                        <td colSpan="5" className="border-2 border-gray-600 p-2 text-right font-bold">CGST @ 2.5% (₹)</td>
                                        <td className="border-2 border-gray-600 p-2 text-right font-bold">{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td colSpan="5" className="border-2 border-gray-600 p-2 text-right font-bold">SGST @ 2.5% (₹)</td>
                                        <td className="border-2 border-gray-600 p-2 text-right font-bold">{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    </tr>
                                </>
                            ) : (
                                <tr className="bg-gray-100">
                                    <td colSpan="5" className="border-2 border-gray-600 p-2 text-right font-bold">IGST @ 5% (₹)</td>
                                    <td className="border-2 border-gray-600 p-2 text-right font-bold">{igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                </tr>
                            )}
                            <tr className="bg-gray-200 text-black">
                                <td colSpan="5" className="border-3 border-gray-800 p-3 text-right font-black text-base">Total Amount (₹)</td>
                                <td className="border-3 border-gray-800 p-3 text-right font-black text-base">{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                            <tr className="bg-white">
                                <td colSpan="6" className="border-3 border-gray-800 p-2 text-left">
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
            <div className="mt-8">
                <div className="border-t-4 border-gray-800 pt-6">
                    {/* Terms & Conditions */}
                    <div className="text-xs text-gray-700 mb-8">
                        <h4 className="font-black text-gray-900 mb-2 uppercase text-sm">Terms & Conditions:</h4>
                        <ol className="list-decimal list-inside space-y-1 font-medium">
                            <li>Goods once sold will not be taken back.</li>
                            <li>Motor and controller carry a warranty of 2 years.</li>
                            <li>Battery and charger carry a warranty of 1 year.</li>
                            <li>No warranty is provided for physical damage or breakage.</li>
                        </ol>
                    </div>

                    {/* Signatures */}
                    <div className="flex justify-between items-end mt-8">
                        {/* Left: Customer Signature */}
                        <div className="text-left">
                            <div className="h-24 mb-2 border-b-2 border-dashed border-gray-600 w-48"></div>
                            <p className="font-bold text-sm text-gray-900">Customer Signature</p>
                            <p className="text-xs text-gray-600 font-semibold">Date: {formattedDate}</p>
                        </div>

                        {/* Right: Authorized Signature */}
                        <div className="text-right">
                            <div className="h-24 mb-2 border-b-2 border-dashed border-gray-600 w-48"></div>
                            <p className="font-bold text-sm text-gray-900">Authorized Signatory</p>
                            <p className="text-xs text-gray-600 font-semibold">{SHOP_DETAILS.name}</p>
                            <p className="text-xs text-gray-600 font-semibold">(Pro.Annasaheb Chandrakant moin)</p>

                        </div>
                    </div>
                </div>
                <div className="text-center text-xs text-gray-500 mt-6 italic">
                    This is a computer generated invoice and does not require a physical signature.
                </div>
            </div>
        </div>
    );
});

// Memoize Invoice component to prevent unnecessary re-renders
export default React.memo(Invoice);
