import AppError from "../errorHalper/AppError";
import PDFDocument from "pdfkit";

export interface IInvoice {
  transectionId: string;
  bookingDate: Date;
  userName: string;
  tourTitle: string;
  geustCount: number;
  totalAmount: number;
}

export const genaretePdf = async (invoiceData: IInvoice) => {
  try {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });

      const buffer: Uint8Array[] = [];

      doc.on("data", (chunk) => buffer.push(chunk));
      doc.on("end", () => resolve(buffer.concat(buffer)));
      doc.on("erroe", (error) => reject(error));

      doc.fontSize(20).text("invoice", { align: "center" });
      doc.moveDown();
      doc.fontSize(20).text(`transectionId:${invoiceData.transectionId}`);
      doc.fontSize(20).text(`bookingDate:${invoiceData.bookingDate}`);
      doc.fontSize(20).text(`userName:${invoiceData.userName}`);
      doc.moveDown();

      doc.text(`tour:${invoiceData.tourTitle}`);
      doc.text(`gouest:${invoiceData.geustCount}`);
      doc.text(`total amount:${invoiceData.totalAmount}`);
    });
  } catch (error) {
    throw new AppError(401, `createtion error ${error}`);
  }
};
