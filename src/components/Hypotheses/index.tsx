import { useState } from "react";
import Button from "../Button";
import "./index.css";
import { useWindowSize } from "../../hooks/useWindowSize";
import DropDown from "../Dropdown";
import { DataHypotheses } from "../../utils/api.types";

const btnStyle = {
  dropShadow: "-6px 6px 16px rgba(49, 58, 75, 0.11)",
  background: "#fff",
  border: "none",
  textTransform: "uppercase",
  width: "350px",
  padding: "20px 30px",
};

interface HypothesesProps {
  dataHypotheses: DataHypotheses[];
  lang: string;
}

const Hypotheses: React.FC<HypothesesProps> = ({ dataHypotheses, lang }) => {
  const [activeItem, setActiveItem] = useState({
    data: dataHypotheses[0],
    id: 1,
  });
  const windowSize = useWindowSize();

  return (
    <div className='aboutContainer'>
      <div className='aboutInner'>
        <div className='btns' style={{ flexDirection: "column" }}>
          {dataHypotheses.map((data, i: number) => (
            <div
              key={i}
              onClick={() =>
                setActiveItem(prev => ({
                  ...prev,
                  data,
                  id: i + 1,
                }))
              }>
              <Button
                active={i + 1 === activeItem.id}
                text={data[`name_${lang}` as keyof DataHypotheses]}
                style={btnStyle}
                link={false}
                to=''
                onClick={e => e.preventDefault()}
              />
            </div>
          ))}
        </div>
        {windowSize.width < 1100 && (
          <DropDown
            items={dataHypotheses?.filter(item => item !== activeItem.data)}
            onClickItem={setActiveItem}
            type='hypotheses'
            text={activeItem.data[`name_${lang}` as keyof DataHypotheses]}
            itemsStyle={{ top: "50%", zIndex: 1, paddingTop: "50px" }}
            className='homePageHeader'
            objKey='name'
          />
        )}
        <div
          className='aboutContent'
          dangerouslySetInnerHTML={{
            __html:
              activeItem.data[`description_${lang}` as keyof DataHypotheses],
          }}></div>
      </div>
    </div>
  );
};

export default Hypotheses;
