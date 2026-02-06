import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// Hardcoded Shop Details
// Hardcoded Shop Details
const SHOP_DETAILS = {
    name: "VIGHNAHARTA MOTORS",
    address: "Vaijapur-Gangapur Road, Vaijapur - 423701",
    mobile: "+91 9730171267",
    gstin: "27GJVPM3300M1ZN",
    hsn: "87116010",
    pan: "GJVPM3300M",
    email: "" // Email removed as per request for cleaner look if not provided
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFFBEB', // Amber 50
        padding: 20,
        fontSize: 10,
    },
    // Header Section
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 3,
        borderBottomColor: '#000000', // Changed to Black
        paddingBottom: 8,
        marginBottom: 10,
    },
    logoContainer: {
        width: 80,
    },
    logo: {
        width: 70,
        height: 70,
        objectFit: 'contain',
    },
    shopDetails: {
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    shopName: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Times-Roman',
        color: '#C49A2F', // Updated to Gold per user request
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    shopAddress: {
        fontSize: 9,
        color: '#4B5563', // Gray 600
        marginBottom: 2,
    },
    shopGst: {
        fontSize: 8,
        color: '#4B5563',
    },
    invoiceDetails: {
        width: 120,
        textAlign: 'right',
    },
    invoiceText: {
        fontSize: 9,
        color: '#374151',
        marginBottom: 2,
    },
    boldText: {
        fontWeight: 700,
    },
    // Customer Section
    customerSection: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000000', // Changed to Black
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 700,
        color: '#111827',
        borderBottomWidth: 1,
        borderBottomColor: '#000000', // Changed to Black
        paddingBottom: 4,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    customerGrid: {
        flexDirection: 'row',
    },
    customerCol: {
        flex: 1,
    },
    customerRow: {
        fontSize: 9,
        marginBottom: 3,
        color: '#374151',
    },
    // Table Section
    table: {
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#E2E8F0', // Slate 200
        borderWidth: 2,
        borderColor: '#000000', // Changed to Black
    },
    tableHeaderCell: {
        padding: 6,
        fontWeight: 900,
        fontSize: 9,
        color: '#000000', // Changed to Black
        borderRightWidth: 1,
        borderRightColor: '#000000', // Changed to Black
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#000000', // Changed to Black
    },
    tableCell: {
        padding: 6,
        fontSize: 9,
        borderRightWidth: 1,
        borderRightColor: '#000000', // Changed to Black
    },
    tableCellSr: { width: '6%', textAlign: 'center' },
    tableCellDesc: { width: '34%' },
    tableCellHsn: { width: '12%', textAlign: 'center' },
    tableCellQty: { width: '8%', textAlign: 'center' },
    tableCellRate: { width: '20%', textAlign: 'right' },
    tableCellAmount: { width: '20%', textAlign: 'right', borderRightWidth: 0 },
    // Footer rows
    footerRow: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9', // Slate 100
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#000000', // Changed to Black
    },
    footerLabel: {
        width: '80%',
        padding: 6,
        textAlign: 'right',
        fontWeight: 700,
        fontSize: 9,
        borderRightWidth: 1,
        borderRightColor: '#000000', // Changed to Black
    },
    footerValue: {
        width: '20%',
        padding: 6,
        textAlign: 'right',
        fontWeight: 700,
        fontSize: 9,
    },
    totalRow: {
        flexDirection: 'row',
        backgroundColor: '#E2E8F0', // Slate 200 (Lighter Grey)
        borderWidth: 2,
        borderColor: '#000000', // Changed to Black
    },
    totalLabel: {
        width: '80%',
        padding: 8,
        textAlign: 'right',
        fontWeight: 900,
        fontSize: 11,
        color: '#000000', // Changed to Black
        borderRightWidth: 1,
        borderRightColor: '#000000', // Changed to Black
    },
    totalValue: {
        width: '20%',
        padding: 8,
        textAlign: 'right',
        fontWeight: 900,
        fontSize: 11,
        color: '#000000', // Changed to Black
    },
    wordsRow: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: '#000000', // Changed to Black
        padding: 6,
    },
    wordsText: {
        fontSize: 8,
        textTransform: 'uppercase',
        fontStyle: 'italic',
    },
    gstNote: {
        fontSize: 8,
        color: '#4b5563',
        fontStyle: 'italic',
        marginTop: 4,
    },
    // Terms Section
    termsSection: {
        borderTopWidth: 3,
        borderTopColor: '#000000', // Changed to Black
        paddingTop: 10,
        marginTop: 10,
    },
    termsTitle: {
        fontSize: 10,
        fontWeight: 900,
        color: '#111827',
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    termItem: {
        fontSize: 8,
        color: '#374151',
        marginBottom: 3,
    },
    // Signatures
    signaturesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    signatureBox: {
        width: 150,
    },
    signatureLine: {
        borderBottomWidth: 1,
        borderBottomStyle: 'dashed',
        borderBottomColor: '#000000',
        height: 40,
        marginBottom: 4,
    },
    signatureLabel: {
        fontSize: 9,
        fontWeight: 700,
        color: '#111827',
    },
    signatureSubLabel: {
        fontSize: 8,
        color: '#4b5563',
    },
    footer: {
        textAlign: 'center',
        fontSize: 8,
        color: '#6b7280',
        fontStyle: 'italic',
        marginTop: 15,
    },
    vehicleDetails: {
        marginTop: 6,
        fontSize: 8,
        color: '#374151',
    },
    vehicleRow: {
        marginBottom: 2,
    },
    whatsappContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    whatsappIcon: {
        width: 10,
        height: 10,
        marginRight: 3,
    },
});

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

const formatCurrency = (num) => {
    return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const InvoicePDF = ({ data, logoBase64, whatsappBase64 }) => {
    const {
        customerName = '',
        mobileNumber = '',
        address = '',
        customerGst = '',
        customerPan = '',
        vehicleModel = '',
        chassisNo = '',
        motorNo = '',
        batteryNo = '',
        chargerNo = '',
        color = '',
        price = 0,
        gstType = 'cgst_sgst',
        date = '',
        invoiceNumber = 'INV-0001'
    } = data || {};

    const formattedDate = date ? new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }) : '';

    const basePrice = parseFloat(price) || 0;
    let cgst = 0, sgst = 0, igst = 0;

    if (gstType === 'cgst_sgst') {
        cgst = basePrice * 0.025;
        sgst = basePrice * 0.025;
    } else {
        igst = basePrice * 0.05;
    }

    const totalGst = cgst + sgst + igst;
    const totalAmount = basePrice + totalGst;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        {logoBase64 && <Image style={styles.logo} src={logoBase64} />}
                    </View>

                    {/* Shop Details */}
                    <View style={styles.shopDetails}>
                        <Text style={styles.shopName}>{SHOP_DETAILS.name}</Text>
                        <Text style={styles.shopAddress}>{SHOP_DETAILS.address}</Text>
                        <Text style={styles.shopGst}>
                            <Text style={styles.boldText}>GSTIN: </Text>{SHOP_DETAILS.gstin}  |
                            <Text style={styles.boldText}>  PAN Number: </Text>{SHOP_DETAILS.pan}
                        </Text>
                    </View>

                    {/* Invoice Details */}
                    <View style={styles.invoiceDetails}>
                        <Text style={styles.invoiceText}>
                            <Text style={styles.boldText}>Date: </Text>{formattedDate}
                        </Text>
                        <Text style={styles.invoiceText}>
                            <Text style={styles.boldText}>Invoice No: </Text>{invoiceNumber}
                        </Text>
                        <Text style={styles.invoiceText}>Pro Annasaheb Moin</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: -2 }}>
                            <View style={{ marginRight: 5, justifyContent: 'center', marginTop: 2 }}>
                                {whatsappBase64 && <Image style={{ width: 10, height: 9 }} src={whatsappBase64} />}
                            </View>
                            <View style={{ paddingTop: 3 }}>
                                <Text style={{ fontSize: 10, color: '#374151' }}>{SHOP_DETAILS.mobile}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Customer Details */}
                <View style={styles.customerSection}>
                    <Text style={styles.sectionTitle}>Details of Customer</Text>
                    <View style={styles.customerGrid}>
                        <View style={styles.customerCol}>
                            <Text style={styles.customerRow}>
                                <Text style={styles.boldText}>Name: </Text>{customerName}
                            </Text>
                            <Text style={styles.customerRow}>
                                <Text style={styles.boldText}>Mobile: </Text>{mobileNumber}
                            </Text>
                            {customerGst && (
                                <Text style={styles.customerRow}>
                                    <Text style={styles.boldText}>GSTIN: </Text>{customerGst.toUpperCase()}
                                </Text>
                            )}
                        </View>
                        <View style={styles.customerCol}>
                            <Text style={styles.customerRow}>
                                <Text style={styles.boldText}>Address: </Text>{address}
                            </Text>
                            {customerPan && (
                                <Text style={styles.customerRow}>
                                    <Text style={styles.boldText}>PAN: </Text>{customerPan.toUpperCase()}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Product Table */}
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, styles.tableCellSr]}>Sr.</Text>
                        <Text style={[styles.tableHeaderCell, styles.tableCellDesc]}>Description of Goods</Text>
                        <Text style={[styles.tableHeaderCell, styles.tableCellHsn]}>HSN Code</Text>
                        <Text style={[styles.tableHeaderCell, styles.tableCellQty]}>Qty</Text>
                        <Text style={[styles.tableHeaderCell, styles.tableCellRate]}>Rate (₹)</Text>
                        <Text style={[styles.tableHeaderCell, styles.tableCellAmount, { borderRightWidth: 0 }]}>Amount (₹)</Text>
                    </View>

                    {/* Table Body */}
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.tableCellSr]}>1</Text>
                        <View style={[styles.tableCell, styles.tableCellDesc]}>
                            <Text style={styles.boldText}>
                                {vehicleModel?.toUpperCase()} - {color?.charAt(0).toUpperCase() + color?.slice(1).toLowerCase()}
                            </Text>
                            <Text style={{ fontSize: 8, color: '#4b5563', fontStyle: 'italic', marginTop: 2 }}>
                                Electric Scooter (Low-Speed) Two-Wheeler
                            </Text>
                            <View style={styles.vehicleDetails}>
                                {chassisNo && <Text style={styles.vehicleRow}><Text style={styles.boldText}>Chassis No: </Text>{chassisNo}</Text>}
                                {motorNo && <Text style={styles.vehicleRow}><Text style={styles.boldText}>Motor No: </Text>{motorNo}</Text>}
                                {batteryNo && <Text style={styles.vehicleRow}><Text style={styles.boldText}>Battery No: </Text>{batteryNo}</Text>}
                                {chargerNo && <Text style={styles.vehicleRow}><Text style={styles.boldText}>Charger No: </Text>{chargerNo}</Text>}
                            </View>
                        </View>
                        <Text style={[styles.tableCell, styles.tableCellHsn]}>{SHOP_DETAILS.hsn}</Text>
                        <Text style={[styles.tableCell, styles.tableCellQty]}>1</Text>
                        <Text style={[styles.tableCell, styles.tableCellRate]}>{formatCurrency(basePrice)}</Text>
                        <Text style={[styles.tableCell, styles.tableCellAmount]}>{formatCurrency(basePrice)}</Text>
                    </View>

                    {/* Taxable Amount */}
                    <View style={styles.footerRow}>
                        <Text style={styles.footerLabel}>Taxable Amount (₹)</Text>
                        <Text style={styles.footerValue}>{formatCurrency(basePrice)}</Text>
                    </View>

                    {/* GST Rows */}
                    {gstType === 'cgst_sgst' ? (
                        <>
                            <View style={styles.footerRow}>
                                <Text style={styles.footerLabel}>CGST @ 2.5% (₹)</Text>
                                <Text style={styles.footerValue}>{formatCurrency(cgst)}</Text>
                            </View>
                            <View style={styles.footerRow}>
                                <Text style={styles.footerLabel}>SGST @ 2.5% (₹)</Text>
                                <Text style={styles.footerValue}>{formatCurrency(sgst)}</Text>
                            </View>
                        </>
                    ) : (
                        <View style={styles.footerRow}>
                            <Text style={styles.footerLabel}>IGST @ 5% (₹)</Text>
                            <Text style={styles.footerValue}>{formatCurrency(igst)}</Text>
                        </View>
                    )}

                    {/* Total */}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount (₹)</Text>
                        <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
                    </View>

                    {/* Amount in Words */}
                    <View style={styles.wordsRow}>
                        <Text style={styles.wordsText}>
                            <Text style={styles.boldText}>Total Amount in Words: </Text>
                            {numberToWords(totalAmount)}
                        </Text>
                    </View>
                </View>

                <Text style={styles.gstNote}>* GST calculated as per selected type.</Text>

                {/* Terms & Conditions */}
                <View style={styles.termsSection}>
                    <Text style={styles.termsTitle}>Terms & Conditions:</Text>
                    <Text style={styles.termItem}>1. Goods once sold will not be taken back.</Text>
                    <Text style={styles.termItem}>2. Motor and controller carry a warranty of 2 years.</Text>
                    <Text style={styles.termItem}>3. Battery and charger carry a warranty of 1 year.</Text>
                    <Text style={styles.termItem}>4. No warranty is provided for physical damage or breakage.</Text>
                </View>

                {/* Signatures */}
                <View style={styles.signaturesContainer}>
                    <View style={styles.signatureBox}>
                        <View style={styles.signatureLine}></View>
                        <Text style={styles.signatureLabel}>Customer Signature</Text>
                        <Text style={styles.signatureSubLabel}>Date: {formattedDate}</Text>
                    </View>
                    <View style={[styles.signatureBox, { alignItems: 'flex-end' }]}>
                        <View style={styles.signatureLine}></View>
                        <Text style={styles.signatureLabel}>Authorized Signatory</Text>
                        <Text style={styles.signatureSubLabel}>{SHOP_DETAILS.name}</Text>
                        <Text style={styles.signatureSubLabel}>(Pro Annasaheb Moin)</Text>
                    </View>
                </View>

                
            </Page>
        </Document>
    );
};

export default InvoicePDF;
