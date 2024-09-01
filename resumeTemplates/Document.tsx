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

// You can uncomment and set up fonts if required
// Font.register({
//   family: "Times-Italic",
//   fonts: [
//     { src: source1 }, // font-style: normal, font-weight: normal
//     { src: source2, fontStyle: "italic" },
//     { src: source3, fontStyle: "italic", fontWeight: 700 },
//   ],
// });

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Times-Italic",
  },
  name: {
    fontSize: 28,
    marginBottom: 10,
  },
  about: {
    fontSize: 12,
    marginBottom: 15,
  },
  contact: {
    fontSize: 12,
    marginBottom: 20,
  },
  bulletPoints: {
    fontSize: 11,
    marginBottom: 20,
    paddingLeft: 10,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    height: 1,
    backgroundColor: "#000",
    flexGrow: 1,
    marginLeft: 10,
  },
  sectionItem: {
    fontSize: 11,
    marginBottom: 10,
  },
  description: {
    fontSize: 11,
    marginBottom: 15,
    lineHeight: 1.5,
  },
  bullet: {
    fontSize: 11,
    marginBottom: 5,
    lineHeight: 1.5,
  },
});

const MyDocument = ({
  formData,
}: {
  formData: typeof ResumeProfileSectionDummyData;
}) => {
  console.log(formData);
  return (
    <Document>
      <Page style={styles.page}>
        {/* Name */}
        <Text style={styles.name}>{formData.name}</Text>

        {/* Summary */}
        <Text style={styles.about}>
          {formData.quickSummary1}
          {"\n"}
          {formData.quickSummary2}
        </Text>

        {/* Contact Info */}
        <Text style={styles.contact}>
          {formData.address} • {formData.phoneNumber} • {formData.email} •{" "}
          {formData.linkedIn}
        </Text>

        {/* Professional Experience */}
        <View style={styles.sectionHeading}>
          <Text>PROFESSIONAL EXPERIENCE</Text>
          <View style={styles.divider} />
        </View>

        {formData.experience.map((experience, index) => (
          <View key={index}>
            <Text style={styles.sectionItem}>
              {experience.company} • {experience.location} •{" "}
              {experience.jobTitle}
              {"\n"}
              {experience.startDate} - {experience.endDate}
            </Text>
            <Text style={styles.description}>{experience.description}</Text>
          </View>
        ))}

        {/* Skills */}

        {/* Projects */}
        <View style={styles.sectionHeading}>
          <Text>PROJECTS</Text>
          <View style={styles.divider} />
        </View>
        {formData.projects.map((project, index) => (
          <View key={index}>
            <Text style={styles.sectionItem}>
              {project.name} • {project.role} • {project.year}
            </Text>
            <Text style={styles.description}>{project.description}</Text>
          </View>
        ))}

        <View style={styles.sectionHeading}>
          <Text>EDUCATION</Text>
          <View style={styles.divider} />
        </View>
        {formData.education.map((education, index) => (
          <View key={index} style={styles.sectionItem}>
            <Text>
              {education.degree} • {education.institution}, {education.location}
            </Text>
            <Text>{education.year}</Text>
          </View>
        ))}
        <View style={styles.sectionHeading}>
          <Text>SKILLS</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.bulletPoints}>
          {formData.skills.map((skill, index) => (
            <Text key={index} style={styles.bullet}>
              • {skill}
            </Text>
          ))}
        </View>

        {/* Certifications */}
        <View style={styles.sectionHeading}>
          <Text>CERTIFICATIONS</Text>
          <View style={styles.divider} />
        </View>
        {formData.certifications.map((certification, index) => (
          <View key={index} style={styles.sectionItem}>
            <Text>
              {certification.name} • By: {certification.issuer} •{" "}
              {certification.year}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default MyDocument;
