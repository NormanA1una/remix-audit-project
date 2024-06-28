import "./style.css";

const MosaicoAbout = ({
  dataStrapiMosaico,
  urlLoad,
}: {
  dataStrapiMosaico: MosaicoImage[];
  urlLoad: string;
}) => {
  return (
    <div className="container-img-mosaico">
      {dataStrapiMosaico ? (
        dataStrapiMosaico.map((photo) => {
          return (
            <div key={photo.id}>
              <img
                src={`${urlLoad}${photo.Images.data.attributes.url}`}
                alt={photo.Alt}
                className={
                  photo.Alt === "Imagen 2 en about home mosaico"
                    ? undefined
                    : photo.Alt === "Image 2 in about home mosaico"
                    ? undefined
                    : "img-translation-mosaico"
                }
                width={photo.Images.data.attributes.width}
                height={photo.Images.data.attributes.height}
              />
            </div>
          );
        })
      ) : (
        <>
          <div>
            <img
              src="/images/aboutImageHome1.webp"
              alt="Image 1 in about home mosaico"
              className="img-translation-mosaico"
            />
          </div>

          <div>
            <img
              src="/images/aboutImageHome2.webp"
              alt="Image 2 in about home mosaico"
            />
          </div>

          <div>
            <img
              src="/images/aboutImageHome3.webp"
              alt="Image 3 in about home mosaico"
              className="img-translation-mosaico"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MosaicoAbout;
