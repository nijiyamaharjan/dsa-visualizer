import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { CSS_CLASSES } from './constants';

function buildClassNames(rootClass, ClassMappings, userClassName) {
  //dynamic className for when we generate button
  let classNames = `${rootClass}`;
  //generates array of object of ClassMapping with key as ClassName and append the classNames to form a collective sub classes of button and also has feature to add a user classname to the end of it to make it more specific
  Object.keys(ClassMappings).forEach((className) => {
    if (ClassMappings[className]) {
      classNames += ` ${className}`;
    }
  });
  classNames += ` ${userClassName}`;
  return classNames;
}
//to build button with icon and initialize with concatenation of our defind icon clasName and the given prop
function renderIcon(icon, iconClass) {
  const ICON = icon;
  return <ICON className={`${CSS_CLASSES.ICON} ${iconClass}`} />;
}
//main export
const Button = ({
  className,
  raised,
  unelevated,
  outlined,
  dense,
  notCased,
  disabled,
  icon,
  iconClass,
  href,
  onClick,
  children
}) => {
  //all the basic funcionality of button combined and plus added new name i.e(className) given when this component is called from other components
  const classNames = buildClassNames(
    //setting default for buttons when called
    CSS_CLASSES.ROOT,
    {
      [CSS_CLASSES.DENSE]: dense,
      [CSS_CLASSES.RAISED]: raised,
      [CSS_CLASSES.OUTLINED]: outlined,
      [CSS_CLASSES.UNELEVATED]: unelevated,
      [CSS_CLASSES.UPPERCASE]: !notCased
    },
    className
  );
  //if button has linking
  if (href) {
    return (
      <a href={href} className={classNames} disabled={disabled}>
        {icon ? renderIcon(icon, iconClass) : null}
        <span className="Button__Label">{children}</span>
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classNames}
      disabled={disabled}
    >
      {/* displays icon or the text feed to it from calling component */}
      {icon ? renderIcon(icon, iconClass) : null}
      <span className="Button__Label">{children}</span>
    </button>
  );
};

//ensures that the data entered/fed is of the specified type like ClassName should be string

Button.propTypes = {
  className: PropTypes.string,
  raised: PropTypes.bool,
  unelevated: PropTypes.bool,
  outlined: PropTypes.bool,
  dense: PropTypes.bool,
  notCased: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

export default Button;
