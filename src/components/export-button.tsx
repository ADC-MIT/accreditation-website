import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from '@react-pdf/renderer';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';

const styles = StyleSheet.create({
  page: {
    padding: 15,
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  logo: {
    width: 169,
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'extrabold',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    marginBottom: 12,
    color: '#4b5563',
  },
  contentWrapper: {
    flex: 1,
    padding: 10,
  },
});

const tableStyles = StyleSheet.create({
  table: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    minHeight: 35,
  },
  tableHeaderCell: {
    backgroundColor: '#f3f4f6',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    padding: 8,
    fontSize: 9,
    fontWeight: 'extrabold',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
  },
  tableCell: {
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    padding: 8,
    fontSize: 9,
    color: '#4b5563',
    display: 'flex',
    alignItems: 'center',
  },
});

const formatHeader = (header: string) => {
  return header.toLowerCase().includes('id')
    ? header
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .replace(/Id/gi, 'ID')
    : header.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatEnumValue = (value: string) => {
  if (typeof value !== 'string') return value;

  // Check if the value is in UPPER_SNAKE_CASE
  if (value === value.toUpperCase() && value.includes('_')) {
    return value
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return value;
};

const formatCellValue = (value: any, key: string) => {
  // Handle ID fields
  if (key.toLowerCase().includes('id') || key === 'sdg_goals') {
    // Check if value is a UUID
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (typeof value === 'string' && uuidRegex.test(value)) {
      // Take first 8 characters of UUID
      return `#ID`;
    }
    return `#ID`;
  }

  // Handle booleans
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  // Handle enums (assumed to be in UPPER_SNAKE_CASE)
  if (typeof value === 'string') {
    return formatEnumValue(value);
  }

  // Handle null/undefined
  if (value === null || value === undefined) {
    return '-';
  }

  return String(value);
};

const getColumnWidth = (header: string, data: any[]) => {
  // Base minimum width for each column
  const minWidth = 100; // Increased minimum width

  // Get the maximum content length in this column
  const maxContentLength = Math.max(
    header.length,
    ...data.map((row) => {
      const value = formatCellValue(row[header], header);
      return value ? value.length : 0;
    })
  );

  // Calculate width based on content (8 points per character plus padding)
  const calculatedWidth = maxContentLength * 8 + 24; // Increased padding

  // Return the larger of minimum width or calculated width
  return Math.max(minWidth, calculatedWidth);
};

const PdfDocument = ({
  title,
  description,
  tableData,
}: {
  title: string;
  description: string;
  tableData: Record<string, any>[];
}) => {
  const headers = tableData.length ? Object.keys(tableData[0]) : [];

  // Calculate column widths based on content
  const columnWidths = headers.map((header) =>
    getColumnWidth(header, tableData)
  );
  const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);
  const widthScale = totalWidth > 750 ? 750 / totalWidth : 1;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.contentWrapper}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src="/logo.png" />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={tableStyles.table}>
            {headers.length > 0 && (
              <View
                style={[tableStyles.tableRow, { backgroundColor: '#f3f4f6' }]}
              >
                {headers.map((header, index) => (
                  <View
                    key={header}
                    style={[
                      tableStyles.tableHeaderCell,
                      { width: columnWidths[index] * widthScale },
                    ]}
                  >
                    <Text>{formatHeader(header)}</Text>
                  </View>
                ))}
              </View>
            )}

            {tableData.map((row, rowIndex) => (
              <View key={rowIndex} style={tableStyles.tableRow}>
                {headers.map((key, index) => (
                  <View
                    key={key}
                    style={[
                      tableStyles.tableCell,
                      { width: columnWidths[index] * widthScale },
                    ]}
                  >
                    <Text>{formatCellValue(row[key], key)}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

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
    <Button onClick={handleExport} variant="secondary">
      <Download className="mr-2 h-4 w-4" />
      Export Data
    </Button>
  );
};

export default ExportButton;
