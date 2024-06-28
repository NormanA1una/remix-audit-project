import "./style.css";

type LeftContentNavbarProps = {
  currentPath: string;
};

export default function LeftContentNavbar({
  currentPath,
}: LeftContentNavbarProps) {
  return (
    <div className="logo-style">
      <img
        loading="eager"
        alt={
          currentPath === "/"
            ? "Inmigrations Docs LLC white logo"
            : "Inmigrations Docs LLC dark logo"
        }
        src={
          currentPath === "/"
            ? "/images/logoDocLLC.svg"
            : "/images/logoDocLLCBlack.svg"
        }
        height={currentPath === "/" ? 42 : 42}
        width={currentPath === "/" ? 130 : 130}
      />
    </div>
  );
}
