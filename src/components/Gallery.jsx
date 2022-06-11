import { useEffect, useState } from "react";

import "./Gallery.scss";

export default function Gallery({ productData }) {
  const [imageIndex, setImageIndex] = useState(0);

  if (productData && productData.images) {
    const imageQuantity = productData.images.length - 1;

    return (
      <div className="gallery">
        <Preview
          productData={productData}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
          imageQuantity={imageQuantity}
        />
        <List
          productData={productData}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
          imageQuantity={imageQuantity}
        />
      </div>
    );
  }
}

function Preview({ productData, imageIndex, setImageIndex, imageQuantity }) {
  const [style, setStyle] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(undefined);
  const [finishPos, setFinishPos] = useState(undefined);
  const therehold = 48;

  function touchStart(e) {
    setIsDragging(true);
    setStartPos(e.clientX);
  }

  function touchMove(e) {
    if (isDragging) {
      setStyle({
        left: `calc(${e.clientX - startPos}px + -100% * ${imageIndex})`,
        transition: "none"
      });
      setFinishPos(e.clientX);
    }
  }

  function touchEnd() {
    if (
      isDragging &&
      finishPos < startPos - therehold &&
      imageIndex < imageQuantity
    ) {
      setImageIndex(imageIndex + 1);
      setStyle({ left: `calc(-100% * ${imageIndex + 1})` });
    } else if (
      isDragging &&
      finishPos > startPos + therehold &&
      imageIndex > 0
    ) {
      setImageIndex(imageIndex - 1);
      setStyle({ left: `calc(-100% * ${imageIndex - 1})` });
    } else {
      setStyle({ left: `calc(-100% * ${imageIndex})` });
    }
    setStartPos(undefined);
    setFinishPos(undefined);
    setIsDragging(false);
  }

  useEffect(() => {
    setStyle({ left: `calc(-100% * ${imageIndex})` });
  }, [imageIndex]);

  return (
    <div className="gallery__preview">
      <div
        className="gallery__preview__content"
        style={style}
        onPointerDown={touchStart}
        onPointerMove={touchMove}
        onPointerUp={touchEnd}
        onPointerLeave={touchEnd}
      >
        {productData.images.map((image, index) => (
          <PreviewImage src={image} key={index} />
        ))}
      </div>
    </div>
  );
}

function PreviewImage({ src }) {
  return (
    <img
      className="gallery__preview__image"
      src={src}
      alt=""
      draggable="false"
    />
  );
}

function List({ productData, imageIndex, setImageIndex, imageQuantity }) {
  const [style, setStyle] = useState({});

  return (
    <div className="gallery__list">
      <div
        style={
          imageIndex > 2 ? { left: `calc(-72px * ${imageIndex - 2})` } : {}
        }
        className="gallery__list__content"
      >
        {productData.images.map((image, index) => {
          if (index === imageIndex) {
            return (
              <ListImage
                src={image}
                selected
                setImageIndex={setImageIndex}
                key={index}
                index={index}
              />
            );
          } else {
            return (
              <ListImage
                src={image}
                setImageIndex={setImageIndex}
                key={index}
                index={index}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

function ListImage({ src, selected, setImageIndex, index }) {
  return (
    <img
      className={`gallery__list__image ${
        selected ? "gallery__list__image_selected" : ""
      }`}
      src={src}
      alt=""
      draggable="false"
      onClick={() => setImageIndex(index)}
    />
  );
}
