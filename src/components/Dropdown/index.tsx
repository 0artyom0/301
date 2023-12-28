import { useState, useEffect, useRef } from "react";
import ARROW from "../../assets/info/dropdown-arrow.svg";
import Button from "../Button";
import "./index.css";
import cookies from "js-cookie";

interface Props {
  items: any;
  onClickItem: any;
  type: string;
  text: string;
  style?: Object;
  itemsStyle?: Object;
  className?: string;
  objKey: string;
}

const DropDown: React.FC<Props> = ({
  items,
  onClickItem,
  text,
  type,
  style,
  itemsStyle,
  className,
  objKey,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const lang = cookies.get("i18next");
  return (
    <div className={`${className} dropdown`} style={style} ref={dropdownRef}>
      <Button
        onClick={() => setOpenDropdown(!openDropdown)}
        text={text}
        link={false}
        to={""}
        icon={ARROW}
        style={{
          background: "#DD264E",
          color: "#fff",
          gap: "20px",
          padding: "20px 30px",
        }}
        className={
          className?.includes("homePageHeader") ? "homePage_btn" : undefined
        }
      />
      {openDropdown && (
        <div className='dropdownItems' style={itemsStyle}>
          {items.map((item: any, i: number) => (
            <button
              key={i}
              onClick={() => {
                if (type === "hypotheses") {
                  onClickItem((prev: any) => ({
                    ...prev,
                    data: item,
                    id: i + 1,
                  }));
                } else if (
                  type === "projectCategory" ||
                  type === "projectStatus"
                ) {
                  onClickItem(item.id, "");
                }
                setOpenDropdown(false);
              }}>
              {item[`${objKey}_${lang}`]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
