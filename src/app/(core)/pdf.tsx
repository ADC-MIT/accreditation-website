import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from '@react-pdf/renderer';
import logoImage from 'accreditation-website/public/logo.png';
import { FileText } from 'lucide-react';

import React from 'react';

import { Button } from '@/components/ui/button';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    borderWidth: 1,
    borderColor: '#000',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  logo: {
    width: 150,
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecoration: 'underline',
  },
  description: {
    fontSize: 12,
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  fieldContainer: {
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
  },
});

const PdfDocument = ({ title, description, tableData }: any) => (
  <Document>
    <Page style={styles.page}>
      {/* Full Page Border */}
      <View style={{ borderWidth: 1, borderColor: '#000', padding: 20 }}>
        {/* Logo at Top Right */}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src="/logo.png" />
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Table Data */}
        {tableData.map((section: any, index: number) => (
          <View key={index} style={styles.section}>
            <Text style={styles.title}>{section.sectionTitle}</Text>
            {section.data.map((row: any, rowIndex: number) => (
              <View key={rowIndex}>
                {Object.entries(row).map(([key, value], i) => (
                  <View key={i} style={styles.fieldContainer}>
                    <Text style={styles.label}>
                      {key}: <Text style={styles.value}>{String(value)}</Text>
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// --- EXAMPLE USAGE ---
//
// <ExportButton
//           title="Institution Name"
//           description="This is a sample description from the backend."
//           tableData={[
//             {
//               sectionTitle: '5.1.1 Student Support',
//               data: [
//                 {
//                   Year: '2023',
//                   'Name of Scheme': 'National Scholarship',
//                   'Students (Govt)': 150,
//                   'Amount (Govt)': '750000 INR',
//                   'Students (Institutional)': 50,
//                   'Amount (Institutional)': '250000 INR',
//                 },
//               ],
//             },
//             {
//               sectionTitle: '6.2.3 E-Governance',
//               data: [
//                 {
//                   Area: 'Administration',
//                   Year: '2023',
//                   Link: 'https://example.com/administration',
//                 },
//               ],
//             },
//           ]}
//         />
//

const ExportButton = ({
  title,
  description,
  tableData,
}: {
  title: string;
  description: string;
  tableData: any[];
}) => {
  const handleExport = async () => {
    const blob = await pdf(
      <PdfDocument
        title={title}
        description={description}
        tableData={tableData}
      />
    ).toBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} className="flex items-center gap-2">
      <FileText size={16} />
      Export
    </Button>
  );
};

export default ExportButton;
