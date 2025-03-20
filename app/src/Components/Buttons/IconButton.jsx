import classNames from "classnames";
import { Button } from "react-bootstrap";

const IconButton = ({
  Icon,
  variant = "light",
  size = 18,
  color,
  onClick,
  title,
  transparent,
  as,
  to,
  replace,
  active,
  overlay,
  titleProps,
  buttonProps = {
    className: "justify-content-center",
  },
  iconProps,
}) => {
  const buttonClassNames = classNames(
    "btn-icon py-1 d-flex align-items-center px-2",
    {
      active,
    },
    buttonProps?.className
  );

  const titleClassName = classNames(
    {
      "ms-1": Icon,
      "m-0": !Icon,
    },
    titleProps?.className
  );

  return (
    <Button
      {...buttonProps}
      as={as}
      to={to}
      replace={replace}
      variant={variant}
      className={buttonClassNames}
      onClick={onClick}
      style={{
        background: transparent ? "transparent" : "",
        ...buttonProps?.style,
      }}
    >
      {Icon && <Icon {...iconProps} size={size} color={color} />}
      {title && (
        <span
          {...titleProps}
          title={overlay}
          className={titleClassName}
          style={{ color }}
        >
          {title}
        </span>
      )}
    </Button>
  );
};

export default IconButton;
