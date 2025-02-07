const Element = ({ attributes, children, element }) => {
  const baseStyle = { textAlign: element.align };
  const styles = {
    "block-quote": {
      ...baseStyle,
      marginLeft: "20px",
      paddingLeft: "10px",
      borderLeft: "3px solid #ccc",
      fontStyle: "italic",
    },
    "bulleted-list": {
      ...baseStyle,
      listStyleType: "disc",
      paddingLeft: "20px",
    },
    "heading-one": {
      ...baseStyle,
      fontSize: "32px",
      fontWeight: "bold",
    },
    "heading-two": {
      ...baseStyle,
      fontSize: "24px",
      fontWeight: "bold",
    },
    "list-item": {
      ...baseStyle,
      display: "list-item",
    },
    "numbered-list": {
      ...baseStyle,
      listStyleType: "decimal",
      paddingLeft: "20px",
    },
    default: {
      ...baseStyle,
      fontSize: "16px",
    },
  };
  const elementStyle = styles[element.type] || styles.default;
  return (
    <div style={elementStyle} {...attributes}>
      {children}
    </div>
  );
};
export default Element;