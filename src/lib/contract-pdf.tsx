import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 50, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 },
  title: { fontSize: 14, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', marginTop: 12, marginBottom: 5, textTransform: 'uppercase' },
  bodyText: { marginBottom: 8, textAlign: 'justify' },
  bold: { fontWeight: 'bold' },
  listItem: { marginLeft: 15, marginBottom: 3 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  col: { width: '45%', borderTopWidth: 1, borderTopColor: '#000', paddingTop: 5 }
});

export const ContractPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>COMMERCIAL LOGISTICS & DELIVERY SERVICES AGREEMENT</Text>
      
      <Text style={styles.bodyText}>
        This Agreement is entered into as of {new Date().toLocaleDateString()}, by and between[cite: 2]:
      </Text>
      
      <Text style={styles.bodyText}>
        <Text style={styles.bold}>Patio Delivery Inc.</Text> (dba Motoclick), located at 309 Baldwin Avenue, Jersey City, NJ 07306[cite: 3].
      </Text>
      
      <Text style={styles.bodyText}>
        And <Text style={styles.bold}>{data.merchant_name || 'Merchant'}</Text>, located at {data.main_address}[cite: 4, 5].
      </Text>

      <Text style={styles.sectionTitle}>1. Relationship of the Parties</Text>
      <Text style={styles.bodyText}>
        The Parties are independent contractors. Nothing creates employment, partnership, or agency[cite: 8, 9, 13].
      </Text>

      <Text style={styles.sectionTitle}>3. Economic Terms</Text>
      <Text style={styles.listItem}>• Up to 2 miles: $6.10 flat rate + tip[cite: 33].</Text>
      <Text style={styles.listItem}>• 2 to 3 miles: $8.55 flat rate + tip[cite: 34].</Text>
      <Text style={styles.listItem}>• Late Night (after 12:00 AM): $1.50 surcharge[cite: 35, 36].</Text>

      <Text style={styles.sectionTitle}>7. Liability & Credit Policy</Text>
      <Text style={styles.bodyText}>
        Company shall provide a credit (lesser of replacement cost or $75) for transit damage or verified driver error[cite: 72, 73, 82]. 
        Claims must be reported within 48 hours[cite: 95].
      </Text>

      <View style={{ marginTop: 30, padding: 10, borderWidth: 1, borderColor: '#ccc', borderStyle: 'dashed' }}>
        <Text style={styles.bold}>CREDIT CARD AUTHORIZATION for Weekly Debit</Text>
        <View style={{ marginTop: 10 }}>
          <Text>Cardholder Name: {data.card_holder_name || '____________________'}</Text>
          <Text>Card Number: {data.card_number || '____________________'}</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ width: '50%' }}>Expiry (MM/AA): {data.card_expiry || '__________'}</Text>
            <Text style={{ width: '50%' }}>CVV: {data.card_cvv || '____'}</Text>
          </View>
          <Text style={{ marginTop: 5 }}>ZIP Code: {data.card_zip || '__________'}</Text>
          <Text style={{ marginTop: 5 }}>Contact Email: {data.card_contact_email || '____________________'}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.bold}>Patio Delivery Inc.</Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.bold}>{data.merchant_name}</Text>
          {data.signature_data ? (
             <Image source={{ uri: data.signature_data }} style={{ width: 120, height: 50, marginTop: 5 }} />
          ) : (
            <Text>Signature: ____________________</Text>
          )}
          <Text>Date: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>
    </Page>
  </Document>
);