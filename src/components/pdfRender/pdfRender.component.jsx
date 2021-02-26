import React from 'react';
import { Document, Page, Text, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

const MyDocument = ({ name, surname }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ voltSpot ~
      </Text>
      <Text style={styles.title}>
        {name}
        {surname}
      </Text>
      <Text style={styles.author}>oferta indywidualna</Text>
      {/* <Image
        style={styles.image}
        src="/images/quijote1.jpg"
      /> */}
      <Text style={styles.subtitle}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit optio
        quia praesentium, tempore corporis dignissimos culpa sequi natus quod
        quaerat saepe quisquam non labore nostrum modi quo nihil eligendi quas!
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint et harum
        quae, repellat obcaecati eum quod quisquam nisi ullam, doloremque
        architecto, repellendus nam dolore esse impedit fuga placeat at
        exercitationem.
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint et harum
        quae, repellat obcaecati eum quod quisquam nisi ullam, doloremque
        architecto, repellendus nam dolore esse impedit fuga placeat at
        exercitationem.
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam culpa
        odit, exercitationem vitae libero neque fugit dignissimos id facere
        eveniet nemo obcaecati voluptate! Doloremque, recusandae magni
        laudantium beatae vel animi.
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam culpa
        odit, exercitationem vitae libero neque fugit dignissimos id facere
        eveniet nemo obcaecati voluptate! Doloremque, recusandae magni
        laudantium beatae vel animi.
      </Text>
      <Text style={styles.subtitle} break>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam culpa
        odit, exercitationem vitae libero neque fugit dignissimos id facere
        eveniet nemo obcaecati voluptate! Doloremque, recusandae magni
        laudantium beatae vel animi.
      </Text>
      {/* <Image style={styles.image} src="/images/quijote2.png" /> */}
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam culpa
        odit, exercitationem vitae libero neque fugit dignissimos id facere
        eveniet nemo obcaecati voluptate! Doloremque, recusandae magni
        laudantium beatae vel animi.
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam culpa
        odit, exercitationem vitae libero neque fugit dignissimos id facere
        eveniet nemo obcaecati voluptate! Doloremque, recusandae magni
        laudantium beatae vel animi.
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam culpa
        odit, exercitationem vitae libero neque fugit dignissimos id facere
        eveniet nemo obcaecati voluptate! Doloremque, recusandae magni
        laudantium beatae vel animi.
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam culpa
        odit, exercitationem vitae libero neque fugit dignissimos id facere
        eveniet nemo obcaecati voluptate! Doloremque, recusandae magni
        laudantium beatae vel animi.
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam culpa
        odit, exercitationem vitae libero neque fugit dignissimos id facere
        eveniet nemo obcaecati voluptate! Doloremque, recusandae magni
        laudantium beatae vel animi.
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);
export default MyDocument;
