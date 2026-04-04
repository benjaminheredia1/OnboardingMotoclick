import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// ── Types ──────────────────────────────────────────────────────────────────
interface ContractData {
  merchant_name?: string;
  main_address?: string;
  card_holder_name?: string;
  card_number?: string;
  card_expiry?: string;
  card_cvv?: string;
  card_zip?: string;
  card_contact_email?: string;
  signature_data?: string;
}

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 8,
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 6,
    textTransform: "uppercase",
    color: "#93683D",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 3,
  },
  subSectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textDecoration: "underline",
    marginTop: 8,
    marginBottom: 3,
  },
  bodyText: { marginBottom: 6, textAlign: "justify" },
  bold: { fontWeight: "bold" },
  infoBox: {
    marginTop: 12,
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#eee",
  },
  infoBoxTitle: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  col: {
    width: "45%",
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 5,
  },
  creditBox: {
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
  },
  creditTitle: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 8,
    textTransform: "uppercase",
    textAlign: "center",
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 7.5,
    color: "#999",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  partyBlock: {
    marginLeft: 15,
    marginBottom: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#93683D",
  },
  note: { fontStyle: "italic", fontSize: 8.5, color: "#666" },
  warningNote: {
    fontStyle: "italic",
    fontSize: 8.5,
    color: "#666",
    textTransform: "uppercase",
  },
  bullet: { marginLeft: 20, marginBottom: 2 },
  exhibitTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 6,
    textTransform: "uppercase",
    color: "#93683D",
  },
});

// ── Helper ─────────────────────────────────────────────────────────────────
const BulletItem = ({ text }: { text: string }) => (
  <Text style={styles.bullet}>• {text}</Text>
);

// ── Main Component ──────────────────────────────────────────────────────────
export const ContractCommercialPDF = ({ data }: { data: ContractData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* ── HEADER ── */}
      <Text style={styles.title}>
        COMMERCIAL LOGISTICS & DELIVERY SERVICES AGREEMENT
      </Text>
      <Text style={styles.subtitle}>
        This Commercial Logistics & Delivery Services Agreement ("Agreement") is
        entered into as of the Effective Date executed via DocuSign ("Effective
        Date").
      </Text>

      {/* ── PARTIES ── */}
      <Text style={styles.bodyText}>This Agreement is by and between:</Text>

      <View style={styles.partyBlock}>
        <Text style={styles.bodyText}>
          <Text style={styles.bold}>Patio Delivery Inc.</Text>, a Delaware
          corporation, doing business as{" "}
          <Text style={styles.bold}>Motoclick</Text> ("Company"), with its
          principal place of business at 309 Baldwin Avenue, Jersey City, NJ
          07306.
        </Text>
      </View>

      <View style={styles.partyBlock}>
        <Text style={styles.bodyText}>
          <Text style={styles.bold}>
            And: {data.merchant_name || "________________________"}
          </Text>
          {"\n"}with its principal place of business at{" "}
          {data.main_address || "________________________"}.
        </Text>
      </View>

      <Text style={[styles.bodyText, styles.note]}>
        Company and Merchant may be referred to individually as a "Party" and
        collectively as the "Parties."
      </Text>

      {/* ── SECTION 1 ── */}
      <Text style={styles.sectionTitle}>1. RELATIONSHIP OF THE PARTIES</Text>

      <Text style={styles.subSectionTitle}>1.1 Independent Contractors</Text>
      <Text style={styles.bodyText}>
        The Parties are independent contractors. Nothing in this Agreement
        creates:
      </Text>
      {[
        "Employment",
        "Partnership",
        "Joint venture",
        "Franchise",
        "Agency",
        "Fiduciary relationship",
      ].map((item) => (
        <BulletItem key={item} text={item} />
      ))}

      <Text style={styles.subSectionTitle}>1.2 Operational Control</Text>
      <Text style={styles.bodyText}>
        Company retains exclusive control over:
      </Text>
      {[
        "Dispatch systems",
        "Routing methodology",
        "Driver engagement structure",
        "Technology platform",
        "Service coverage areas",
        "Operational policies",
      ].map((item) => (
        <BulletItem key={item} text={item} />
      ))}
      <Text style={[styles.bodyText, { marginTop: 4 }]}>
        Merchant shall not supervise, direct, or control drivers engaged by
        Company.
      </Text>

      {/* ── SECTION 2 ── */}
      <Text style={styles.sectionTitle}>2. SERVICES</Text>

      <Text style={styles.subSectionTitle}>2.1 Scope</Text>
      <Text style={styles.bodyText}>
        Company provides technology-enabled logistics coordination and courier
        facilitation services for delivery of Merchant's prepared products to
        end customers.
      </Text>
      <Text style={styles.bodyText}>Company does not:</Text>
      {[
        "Prepare food",
        "Manufacture products",
        "Control food safety",
        "Guarantee order volume",
      ].map((item) => (
        <BulletItem key={item} text={item} />
      ))}

      <Text style={styles.subSectionTitle}>2.2 Service Area</Text>
      <Text style={styles.bodyText}>
        Standard delivery radius is up to three (3) miles unless otherwise
        agreed in writing.
      </Text>

      {/* ── SECTION 3 ── */}
      <Text style={styles.sectionTitle}>3. ECONOMIC TERMS</Text>

      <Text style={styles.subSectionTitle}>3.1 Delivery Fees</Text>
      <Text style={styles.bodyText}>
        <Text style={styles.bold}>Up to 2 miles:</Text> $6.10 flat rate per
        delivery + tip
      </Text>
      <Text style={styles.bodyText}>
        <Text style={styles.bold}>Between 2 and 3 miles:</Text> $8.55 flat rate
        per delivery + tip
      </Text>

      <Text style={styles.subSectionTitle}>3.2 Late Night Surcharge</Text>
      <Text style={styles.bodyText}>
        Orders placed after 12:00 AM incur a{" "}
        <Text style={styles.bold}>$1.50 surcharge per delivery</Text>.
      </Text>

      <Text style={styles.subSectionTitle}>
        3.3 Weekly Invoicing & Automatic Debit
      </Text>
      <Text style={styles.bodyText}>
        Company shall issue weekly electronic invoices detailing all completed
        deliveries and applicable charges. Automatic debit will be made from the
        credit card or bank account authorized by Merchant pursuant to Exhibit
        A. Payment is due within three (3) business days of invoice issuance.
        Late payments accrue interest at 1.5% per month or maximum permitted by
        law. Merchant waives any right of offset or withholding. Company may
        suspend services for nonpayment without liability.
      </Text>

      {/* ── SECTION 4 ── */}
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxTitle}>
          4. Service Targets (Non-Guaranteed)
        </Text>
        <Text style={styles.bodyText}>
          The following are operational targets only and do not constitute
          guaranteed delivery times:
        </Text>
        <BulletItem text="Under 2 miles: 30-minute target" />
        <BulletItem text="Between 2–3 miles: 40-minute target" />
        <Text style={[styles.bodyText, { marginTop: 4 }]}>
          Delays may occur due to traffic, weather, restaurant preparation
          delays, government mandates, or force majeure events. Failure to meet
          target times shall not constitute breach.
        </Text>
      </View>

      {/* ── SECTION 5 ── */}
      <Text style={styles.sectionTitle}>5. TERM & TERMINATION</Text>
      <Text style={styles.bodyText}>
        <Text style={styles.bold}>Initial Term:</Text> One (1) year from the
        Effective Date.
      </Text>
      <Text style={styles.bodyText}>
        Either Party may terminate this Agreement without cause upon fourteen
        (14) days' written notice.
      </Text>
      <Text style={styles.bodyText}>
        Either Party may terminate immediately for material breach if such
        breach is not cured within seven (7) days of written notice.
      </Text>
      <Text style={styles.bodyText}>
        Termination does not relieve Merchant of payment obligations for
        services rendered prior to termination date.
      </Text>

      {/* ── SECTION 6 ── */}
      <Text style={styles.sectionTitle}>6. MERCHANT RESPONSIBILITIES</Text>
      <Text style={styles.bodyText}>
        Merchant retains exclusive responsibility for:
      </Text>
      {[
        "Food preparation",
        "Packaging integrity",
        "Allergen compliance",
        "Labeling accuracy",
        "Alcohol law compliance",
        "Regulatory licensing",
      ].map((item) => (
        <BulletItem key={item} text={item} />
      ))}
      <Text style={[styles.bodyText, { marginTop: 4 }]}>
        Merchant shall prepare orders within twenty (20) minutes of receipt. If
        Merchant error requires redelivery, such redelivery shall be billed as a
        new delivery.
      </Text>

      {/* ── SECTION 7 ── */}
      <Text style={styles.sectionTitle}>
        7. LIABILITY, DRIVER ERROR & CREDIT POLICY
      </Text>

      <Text style={styles.subSectionTitle}>7.1 Transit Damage</Text>
      <Text style={styles.bodyText}>
        If physical damage occurs during transit solely due to driver handling,
        Company shall provide a credit equal to the lesser of: the replacement
        cost of the affected order, or Seventy-Five Dollars ($75) per incident.
        In addition, the delivery fee for such affected order shall be credited
        to Merchant.
      </Text>

      <Text style={styles.subSectionTitle}>
        7.2 Non-Completion Due to Driver Error
      </Text>
      <Text style={styles.bodyText}>
        If an order is not completed due solely to verified driver error
        (including misdelivery, failure to complete delivery after pickup, order
        abandonment, or failure to deliver resulting in order cancellation),
        Company shall provide a credit equal to the lesser of: the replacement
        cost of the affected order, or $75 per incident. The delivery fee for
        such affected order shall also be credited. Company shall not charge the
        delivery fee for any order verified as not properly completed due to
        driver fault.
      </Text>

      <Text style={styles.subSectionTitle}>7.3 Exclusions</Text>
      <Text style={styles.bodyText}>
        Company shall not be responsible for credits arising from:
      </Text>
      {[
        "Incorrect address provided",
        "Customer unavailability",
        "Customer refusal",
        "Merchant preparation delays",
        "Merchant packaging failures",
        "Third-party platform cancellations",
        "Force majeure events",
      ].map((item) => (
        <BulletItem key={item} text={item} />
      ))}

      <Text style={styles.subSectionTitle}>7.4 Reporting Procedure</Text>
      <Text style={[styles.bodyText, styles.warningNote]}>
        Merchant must submit written notice of any claim within forty-eight (48)
        hours of the delivery event.
      </Text>
      <Text style={styles.bodyText}>
        Claims must include the order number, description of issue, and
        supporting documentation. Failure to report within forty-eight (48)
        hours constitutes waiver of claim. Company reserves the right to
        investigate using GPS logs, driver statements, and platform records.
      </Text>

      <Text style={styles.subSectionTitle}>7.5 Credit Application</Text>
      <Text style={styles.bodyText}>
        Approved credits shall be applied as a credit to the next weekly
        invoice, or as a refund via original payment method at Company's
        discretion. Credits shall not be paid in cash unless otherwise agreed.
      </Text>

      <Text style={styles.subSectionTitle}>7.6 Aggregate Limitation</Text>
      <Text style={styles.bodyText}>
        Company's total aggregate liability under this Agreement shall not
        exceed total fees paid by Merchant in the preceding thirty (30) days.
      </Text>

      {/* ── SECTION 8 ── */}
      <Text style={styles.sectionTitle}>8. INDEMNIFICATION</Text>
      <Text style={styles.bodyText}>
        Merchant shall indemnify, defend, and hold harmless Company and its
        officers, directors, shareholders, investors, employees, and affiliates
        from claims arising out of:
      </Text>
      {[
        "Foodborne illness",
        "Product defects",
        "Labeling violations",
        "Alcohol compliance violations",
        "Merchant regulatory violations",
        "Government investigations",
      ].map((item) => (
        <BulletItem key={item} text={item} />
      ))}
      <Text style={[styles.bodyText, { marginTop: 4 }]}>
        This indemnification survives termination.
      </Text>

      {/* ── SECTION 9 ── */}
      <Text style={styles.sectionTitle}>9. DRIVER STATUS</Text>
      <Text style={styles.bodyText}>
        Drivers are engaged by Company under Company-controlled operational
        structures. Drivers are not employees of Merchant. Merchant shall not
        direct or control drivers.
      </Text>

      {/* ── SECTION 10 ── */}
      <Text style={styles.sectionTitle}>10. FORCE MAJEURE</Text>
      <Text style={styles.bodyText}>
        Company shall not be liable for delay or suspension of services due to:
      </Text>
      {[
        "Acts of God",
        "Severe weather",
        "Government mandates",
        "Civil unrest",
        "Infrastructure failures",
      ].map((item) => (
        <BulletItem key={item} text={item} />
      ))}
      <Text style={[styles.bodyText, { marginTop: 4 }]}>
        Company may suspend services without liability during such events.
      </Text>

      {/* ── SECTION 11 ── */}
      <Text style={styles.sectionTitle}>11. REGULATORY ADJUSTMENT</Text>
      <Text style={styles.bodyText}>
        If changes in law materially increase Company's operating costs, Company
        may implement pricing adjustments upon written notice.
      </Text>

      {/* ── SECTION 12 ── */}
      <Text style={styles.sectionTitle}>12. DISPUTE RESOLUTION</Text>
      <Text style={styles.bodyText}>
        All disputes shall be resolved by binding arbitration under AAA
        Commercial Rules in New York County, NY. Each Party waives jury trial
        and class action participation.
      </Text>

      {/* ── SECTION 13 ── */}
      <Text style={styles.sectionTitle}>13. CONFIDENTIALITY</Text>
      <Text style={styles.bodyText}>
        Merchant shall not disclose pricing terms or operational systems.
        Company retains all intellectual property rights.
      </Text>

      {/* ── SECTION 14 ── */}
      <Text style={styles.sectionTitle}>14. ASSIGNMENT</Text>
      <Text style={styles.bodyText}>
        Company may assign this Agreement in connection with financing,
        investment, merger, or acquisition. Merchant may not assign without
        written consent.
      </Text>

      {/* ── SECTION 15 ── */}
      <Text style={styles.sectionTitle}>15. ENTIRE AGREEMENT</Text>
      <Text style={styles.bodyText}>
        This Agreement, including Exhibit A, constitutes the entire agreement
        between the Parties. Amendments must be executed via DocuSign.
      </Text>

      {/* ── EXHIBIT A ── */}
      <Text style={styles.exhibitTitle}>EXHIBIT A — PAYMENT TERMS</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxTitle}>Payment Authorization</Text>
        <Text style={styles.bodyText}>
          Weekly invoices will be sent to Merchant with a report of all
          delivered orders. Automatic debit will be made from the credit card or
          bank account authorized by Merchant. Company reserves the right to
          update banking instructions upon written notice.
        </Text>
      </View>

      {/* ── CREDIT CARD AUTHORIZATION ── */}
      <View style={styles.creditBox}>
        <Text style={styles.creditTitle}>
          CREDIT CARD AUTHORIZATION for Weekly Debit
        </Text>
        <View style={{ marginTop: 6 }}>
          <Text>
            Cardholder Name: {data.card_holder_name || "____________________"}
          </Text>
          <Text style={{ marginTop: 4 }}>
            Card Number: {data.card_number || "____________________"}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 4 }}>
            <Text style={{ width: "50%" }}>
              Expiry (MM/YY): {data.card_expiry || "__________"}
            </Text>
            <Text style={{ width: "50%" }}>CVV: {data.card_cvv || "____"}</Text>
          </View>
          <Text style={{ marginTop: 4 }}>
            ZIP Code: {data.card_zip || "__________"}
          </Text>
          <Text style={{ marginTop: 4 }}>
            Contact Email: {data.card_contact_email || "____________________"}
          </Text>
        </View>
      </View>

      {/* ── SIGNATURES ── */}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.bold}>Patio Delivery Inc. d/b/a Motoclick</Text>
          <Text style={{ marginTop: 6 }}>By: ____________________</Text>
          <Text>Name:</Text>
          <Text>Title:</Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.bold}>
            {data.merchant_name || "[Merchant Legal Name]"}
          </Text>
          {data.signature_data ? (
            <Image
              source={{ uri: data.signature_data }}
              style={{ width: 120, height: 50, marginTop: 5 }}
            />
          ) : (
            <Text style={{ marginTop: 6 }}>By: ____________________</Text>
          )}
          <Text>Name:</Text>
          <Text>Title:</Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* ── FOOTER ── */}
      <Text style={styles.footer}>
        Motoclick Confidential & Proprietary — {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);

export const ContractPDF = ContractCommercialPDF;
