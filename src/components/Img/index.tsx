import ARROW from "../../assets/arrow-dropdown.svg";

interface ImgProps {
  rotate: number;
  size: "small" | "middle" | "large";
}

const Img: React.FC<ImgProps> = ({ rotate, size }) => {
  return (
    <img
      src={ARROW}
      alt='Arrow'
      style={{
        transform: `rotate(${rotate}deg)`,
        transition: "0.3s ease",
        width: size === "large" ? "1.4322916666666667vw" : "",
      }}
      decoding='async'
      loading='lazy'
    />
  );
};

export default Img;
