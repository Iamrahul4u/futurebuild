import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeProfileSectionDummyData } from "@/_constants/constants";

// Uncomment and set up fonts if needed
// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "path/to/roboto-regular.ttf" },
//     { src: "path/to/roboto-bold.ttf", fontWeight: "bold" },
//   ],
// });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#f0f4f8",
    color: "#333",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    color: "#003366",
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
  },
  role: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  about: {
    fontSize: 12,
    marginTop: 10,
    color: "#444",
    lineHeight: 1.5,
  },
  contact: {
    fontSize: 12,
    color: "#666",
    lineHeight: 1.5,
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#003366",
    borderBottomWidth: 2,
    borderBottomColor: "#003366",
    paddingBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  sectionItem: {
    fontSize: 11,
    marginBottom: 5,
    color: "#555",
  },
  bulletPoints: {
    fontSize: 11,
    marginLeft: 15,
    color: "#555",
  },
  bullet: {
    marginBottom: 5,
    lineHeight: 1.5,
  },
  divider: {
    height: 1,
    backgroundColor: "#003366",
    marginVertical: 10,
  },
  gridList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    lineHeight: 1.5,
    fontSize: 11,
    alignItems: "center",
    justifyContent: "space-around",
  },
});

const NormalTemplate = ({
  formData,
}: {
  formData: typeof ResumeProfileSectionDummyData;
}) => {
  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{formData.name}</Text>
        </View>

        {/* About */}
        <Text style={styles.about}>
          {formData.quickSummary1}
          {"\n"}
          {formData.quickSummary2}
        </Text>

        {/* Contact Info */}
        <Text style={styles.contact}>
          {formData.address} | {formData.phoneNumber} | {formData.email} |{" "}
          {formData.linkedIn}
        </Text>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Professional Experience</Text>
          <View style={styles.grid}>
            {formData.experience.map((experience, index) => (
              <View key={index}>
                <Text style={styles.sectionItem}>
                  {experience.company} - {experience.jobTitle}
                </Text>
                <Text style={styles.sectionItem}>
                  {experience.startDate} - {experience.endDate}
                </Text>
                <Text style={styles.sectionItem}>{experience.location}</Text>
                <Text style={styles.bulletPoints}>
                  {experience.description.split("\n").map((desc, i) => (
                    <Text key={i} style={styles.bullet}>
                      • {desc}
                    </Text>
                  ))}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Projects</Text>
          {formData.projects.map((project, index) => (
            <View key={index}>
              <Text style={styles.sectionItem}>
                {project.name} ({project.year})
              </Text>
              <Text style={styles.sectionItem}>{project.role}</Text>
              <Text style={styles.bulletPoints}>
                {project.description.split("\n").map((desc, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {desc}
                  </Text>
                ))}
              </Text>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Education</Text>
          {formData.education.map((education, index) => (
            <View key={index}>
              <Text style={styles.sectionItem}>
                {education.degree} - {education.institution}
              </Text>
              <Text style={styles.sectionItem}>
                {education.location} • {education.year}
              </Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Skills</Text>
          <Text style={styles.gridList}>
            {formData.skills.map((skill, index) => (
              <Text key={index} style={styles.bullet}>
                • {skill}
              </Text>
            ))}
          </Text>
        </View>

        {/* Certifications */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Certifications</Text>
          {formData.certifications.map((certification, index) => (
            <View key={index}>
              <Text style={styles.sectionItem}>
                {certification.name} - {certification.issuer} (
                {certification.year})
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default NormalTemplate;
