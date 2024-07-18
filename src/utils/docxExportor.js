// src/utils/docxExporter.js
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

const exportToDocx = (userData, fileName = "document.docx") => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: userData.title,
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Email: ${userData.email}`,
                bold: true,
              }),
              new TextRun({
                text: `Mobile: ${userData.mobile}`,
                break: 1,
              }),
              new TextRun({
                text: `Nationality: ${userData.nationality}`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            text: "Executive Summary",
            heading: HeadingLevel.HEADING_1,
          }),
          ...userData.executiveSummary.map((item) => new Paragraph(item)),
          new Paragraph({
            text: "Working Experience",
            heading: HeadingLevel.HEADING_1,
          }),
          ...userData.workingExperience.map((job) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `${job.company} (${job.position}, ${job.period})`,
                  bold: true,
                }),
                ...job.details.map(
                  (detail) =>
                    new Paragraph({
                      text: detail,
                      bullet: { level: 0 },
                    })
                ),
              ],
            })
          ),
          new Paragraph({
            text: "Projects",
            heading: HeadingLevel.HEADING_1,
          }),
          ...userData.projects.map((project) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: project.name,
                  bold: true,
                }),
                new TextRun({
                  text: ` - ${project.description}`,
                }),
              ],
            })
          ),
          new Paragraph({
            text: "Education & Qualifications",
            heading: HeadingLevel.HEADING_1,
          }),
          ...userData.education.map((edu) =>
            new Paragraph({
              text: edu,
              bullet: { level: 0 },
            })
          ),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, fileName);
  });
};

export default exportToDocx;
