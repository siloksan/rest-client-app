export function parseJson(input: string) {
  try {
    const json = JSON.parse(input);
    const output = JSON.stringify(json, null, 2);
    return [output, ''];
  } catch (error) {
    if (error instanceof Error) {
      return [input, error?.message];
    } else {
      throw error;
    }
  }
}

export function parseXml(input: string) {
  const xmlDoc = new DOMParser().parseFromString(input, 'application/xml');
  const error = xmlDoc.querySelector('parsererror > div')?.textContent;

  if (error) {
    return [input, error];
  }

  const xsltDoc = new DOMParser().parseFromString(
    [
      '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
      '  <xsl:strip-space elements="*"/>',
      '  <xsl:template match="para[content-style][not(text())]">',
      '    <xsl:value-of select="normalize-space(.)"/>',
      '  </xsl:template>',
      '  <xsl:template match="node()|@*">',
      '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
      '  </xsl:template>',
      '  <xsl:output indent="yes"/>',
      '</xsl:stylesheet>',
    ].join('\n'),
    'application/xml'
  );

  const xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltDoc);
  const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
  const outputXml = new XMLSerializer().serializeToString(resultDoc);
  return [outputXml, ''];
}
