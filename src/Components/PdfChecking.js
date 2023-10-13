import React from 'react';
import { PDFViewer, Text,Document, Page, PDFDownloadLink } from '@react-pdf/renderer';
import {useNavigate} from 'react-router-dom';

const Download = () => {
  console.log("Downloading");
};

const PdfChecking = () => {
  const navigate = useNavigate();
  return (
    <>
      <PDFDownloadLink document={<JustForCheck />} fileName='prescription'>
        {({ loading }) => (loading ? <button>Loading</button> : <button>Download</button>)}
      </PDFDownloadLink>
      <JustForCheck/>
    </>
  );
};

const JustForCheck = () => {
  return (
    <Document>
      <Page>
        <Text>
          Pdf checking
        </Text>
      </Page>
    </Document>
  );
};

export default PdfChecking;
