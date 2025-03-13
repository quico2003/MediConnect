import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import JsBarcode from "jsbarcode";

const A4_Sizes = {
  width: 595,
  height: 842,
};

const BarcodeLayoutToPrint = ({ codes, rows = 10, cols = 3, offset = 0 }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    createImage();
  }, [rows, cols, offset]);

  const createNewArray = (length) => [...Array(length).keys()];

  const createImage = () => {
    const newCodes =
      codes?.map((uniqid) => {
        const base64 = getImgBase64String(uniqid);
        return base64;
      }) || [];

    const perPage = rows * cols;
    const newOffset = offset % perPage;
    let emptyItems = createNewArray(newOffset);
    const arrayWithOffset = emptyItems.concat(newCodes);

    const finalArray = createChunk(arrayWithOffset, perPage);
    const items = finalArray.map((pageContent) => {
      return createChunk(pageContent, cols);
    });
    setImages(items);
  };

  const createChunk = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  };

  const getImgBase64String = (value) => {
    const barcodeNode = document.createElement("img");
    JsBarcode(barcodeNode, value);
    return barcodeNode.src;
  };

  return (
    <Document>
      {images.map((page, index) => (
        <Page key={index} size="A4" dpi={72}>
          <View
            style={{
              flexDirection: "column",
              height: "100%",
            }}
          >
            {page.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {row.map((image, imageIndex) =>
                  typeof image === "string" ? (
                    <Image
                      key={imageIndex}
                      src={image}
                      style={{
                        width: A4_Sizes.width / cols,
                        height: A4_Sizes.height / rows,
                      }}
                    />
                  ) : (
                    <Text
                      key={imageIndex}
                      style={{
                        width: A4_Sizes.width / cols,
                        height: A4_Sizes.height / rows,
                      }}
                    ></Text>
                  )
                )}
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default BarcodeLayoutToPrint;
