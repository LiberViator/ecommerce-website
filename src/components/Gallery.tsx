import { useEffect, useState } from "react";

import "./Gallery.scss";

export default function Gallery({ product }) {
  const [imageIndex, setImageIndex] = useState(0);

  if (product && product.images) {
    const imageQuantity = product.images.length - 1;

    return (
      <section className="gallery">
        <Preview
          product={product}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
          imageQuantity={imageQuantity}
        />
        <List
          product={product}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
          imageQuantity={imageQuantity}
        />
      </section>
    );
  }
}

function Preview({ product, imageIndex, setImageIndex, imageQuantity }) {
  const [style, setStyle] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(undefined);
  const [finishPos, setFinishPos] = useState(undefined);
  const therehold = 48;

  const handleTouchStart = (e) => {
    e.preventDefault();
    window.requestAnimationFrame(handleTouchMove);
    setIsDragging(true);
    setStartPos(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      setStyle({
        left: `calc(${e.clientX - startPos}px + -100% * ${imageIndex})`,
        transition: "none",
      });
      setFinishPos(e.clientX);
    }
  };

  const handleTouchEnd = (e) => {
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
    window.cancelAnimationFrame(handleTouchMove);
    setStartPos(undefined);
    setFinishPos(undefined);
    setIsDragging(false);
  };

  useEffect(() => {
    setStyle({ left: `calc(-100% * ${imageIndex})` });
  }, [imageIndex]);

  return (
    <div className="gallery__preview">
      <div
        className="gallery__preview__content"
        style={style}
        onPointerDown={(e) => handleTouchStart(e)}
        onPointerMove={(e) => handleTouchMove(e)}
        onPointerUp={(e) => handleTouchEnd(e)}
        onPointerLeave={(e) => handleTouchEnd(e)}
      >
        {product.images.map((image, index) => (
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

function List({ product, imageIndex, setImageIndex, imageQuantity }) {
  return (
    <div className="gallery__list">
      <div
        style={
          imageIndex > 2 ? { left: `calc(-72px * ${imageIndex - 2})` } : {}
        }
        className="gallery__list__content"
      >
        {product.images.map((image, index) => {
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
