import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";

type GifishProps = {
  height?: string;
  link?: boolean;
  maxHeight?: string;
  maxWidth?: string;
  text?: boolean;
  width?: string;
};

const Gifish = (props: GifishProps) => {
  const location = useLocation();
  const { t } = useTranslation();

  const { width, height, maxWidth, maxHeight, link, text = false } = props;
  const src = `${process.env.PUBLIC_URL}/images/${text ? "gifish-logo" : "gifish"}.svg`;
  const dimensions = { width, height, maxHeight, maxWidth };
  const style = Object.keys(dimensions).reduce((acc, key: string) => {
    const value = Reflect.get(dimensions, key);
    if (value !== undefined) {
      acc += `${key}: ${value}`;
    }
    return acc;
  }, "");

  const image = (
    <ReactSVG
      src={src}
      beforeInjection={(svg) => {
        svg.setAttribute("style", style);
      }}
    />
  );

  if (link || (typeof link === "undefined" && location.pathname !== "/")) {
    return (
      <>
        <Link to="/" area-label={t("go_home", { name: process.env.REACT_APP_WEBSITE_NAME })}>
          {image}
        </Link>
      </>
    );
  }

  return image;
};

export default Gifish;
