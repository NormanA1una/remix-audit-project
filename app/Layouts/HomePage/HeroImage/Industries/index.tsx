import "./style.css";

const Industries = ({
  industries,
  urlLoad,
}: {
  industries: IndustryImg[] | undefined;
  urlLoad: string;
}) => {
  return (
    <ul className="industries-list">
      {industries
        ? industries.map((industry) => {
            return (
              <li key={industry.id}>
                <img
                  loading="lazy"
                  src={`${urlLoad}${industry.Images.data.attributes.url}`}
                  alt={industry.Alt}
                  width={industry.Images.data.attributes.width}
                  height={industry.Images.data.attributes.height}
                />
              </li>
            );
          })
        : undefined}
    </ul>
  );
};

export default Industries;
