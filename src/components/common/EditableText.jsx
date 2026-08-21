import React, { useRef, useEffect } from 'react';

export const EditableText = ({
  value,
  onChange,
  className = '',
  tagName = 'span',
  style = {},
  placeholder = '',
}) => {
  const Tag = tagName;
  const ref = useRef(null);

  // Sync internal text if external value changed while not focused
  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      ref.current.innerText = value || '';
    }
  }, [value]);

  const handleBlur = (e) => {
    const newValue = e.currentTarget.innerText.trim();
    if (onChange && newValue !== value) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tagName !== 'div' && tagName !== 'p') {
      // For short inline texts, press enter to blur and confirm
      if (!e.shiftKey) {
        e.preventDefault();
        ref.current?.blur();
      }
    }
  };

  return (
    <Tag
      ref={ref}
      contentEditable="true"
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={className}
      style={style}
      data-placeholder={placeholder}
    >
      {value}
    </Tag>
  );
};

export default EditableText;
