import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Image,
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    padding: 30,
    borderWidth: 1,
    borderColor: "#000",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textDecoration: "underline",
  },
  description: {
    fontSize: 12,
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  fieldContainer: {
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
  },
  value: {
    fontSize: 12,
  },
});


const PdfDocument = ({ title, description, tableData }: any) => (
  <Document>
    <Page style={styles.page}>
      {/* Header with Logo */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.logo} src="https://via.placeholder.com/50" />
      </View>

      
      <Text style={styles.description}>{description}</Text>

      
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
    </Page>
  </Document>
);


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
    const blob = await pdf(<PdfDocument title={title} description={description} tableData={tableData} />).toBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "report.pdf";
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
