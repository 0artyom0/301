import { NavLink, To } from "react-router-dom";
import "./index.css";
import { ReactElement } from "react";
interface ButtonProps {
  text: string | any;
  style?: Object;
  active?: boolean;
  link: boolean;
  to: To;
  icon?: string;
  svg?: ReactElement;
  onClick?: (arg: any) => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  text,
  style,
  active,
  link,
  to,
  icon,
  svg,
  onClick,
  disabled,
  className,
  type,
}) => {
  return (
    <>
      {link ? (
        <NavLink
          onClick={onClick}
          to={to}
          className={`${active && "activeBtn"} ${className} btn`}
          style={style}>
          {text}
        </NavLink>
      ) : (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`${active && "activeBtn"} ${className} btn`}
          style={style}
          type={type}>
          {text}
          {icon && (
            <img
              className='btn_icon'
              src={icon}
              alt='Icon'
              decoding='async'
              loading='lazy'
            />
          )}
          {svg && svg}
        </button>
      )}
    </>
  );
};

export default Button;
