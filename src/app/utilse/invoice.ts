import PDFDocument from "pdfkit";

export interface IInvoiceData {
  transectionId: string;
  bookingDate: Date;
  userName: string;
  tourTitle: string;
  geustCount: number;
  totalAmount: number;
}

export const genaretePdf = async (
  invoiceData: IInvoiceData
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks: Uint8Array[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      doc.text(`Invoice for ${invoiceData.userName}`);
      doc.text(`Tour: ${invoiceData.tourTitle}`);
      doc.text(`Transaction ID: ${invoiceData.transectionId}`);
      doc.text(`Total Amount: ${invoiceData.totalAmount}`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
