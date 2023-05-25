const ExcelJS = require('exceljs');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const FileEXCEL = async (req, res, next) => {
    const content = req.body.content;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.addRow([content, content]);
    worksheet.addRow([content, content]);

    workbook.xlsx.writeFile("bao_cao.xlsx")
        .then(() => {
            res.status(200).json({ message: "File Excel đã được tạo." })
        })
        .catch((error) => {
            res.status(500).json({ message: 'Lỗi khi tạo file Excel.' })
        });
}
const FileCSV = async (req, res, next) => {
    const content = req.body.content;

    const data = [
        [content, content],
        [content, content]
    ];
    const csvData = data.map(row => row.join(',')).join('\n');
    fs.writeFile('bao_cao.csv', csvData, (error) => {
        if (error) {
            res.status(500).json({ message: 'Lỗi khi tạo file CSV.' })
        } else {
            res.status(200).json({ message: "File CSV đã được tạo." })
        }
    });
}
const FilePDF = async (req, res, next) => {
    try {
        const content = req.body.content;

        const doc = new PDFDocument();
        doc.text(content);
        doc.pipe(fs.createWriteStream('bao_cao.pdf'));
        doc.end();
        res.status(200).json({ message: "File PDF đã được tạo." })
    } catch (e) {
        res.status(500).json({ message: 'Lỗi khi tạo file PDF.' })

    }
}
module.exports = {
    FileEXCEL,
    FileCSV,
    FilePDF
}

